import { NextResponse } from "next/server";

type AvailabilityRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  year: string;
  make: string;
  model: string;
  vin: string;
  part: string;
};

function isAvailabilityRequest(value: unknown): value is AvailabilityRequest {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const request = value as Record<string, unknown>;
  const fields: (keyof AvailabilityRequest)[] = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "year",
    "make",
    "model",
    "vin",
    "part",
  ];

  return fields.every((field) => typeof request[field] === "string");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Please submit a valid request." }, { status: 400 });
  }

  if (!isAvailabilityRequest(payload)) {
    return NextResponse.json(
      { error: "Please complete the required request fields." },
      { status: 400 }
    );
  }

  const data: AvailabilityRequest = {
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    year: payload.year.trim(),
    make: payload.make.trim(),
    model: payload.model.trim(),
    vin: payload.vin.trim().toUpperCase(),
    part: payload.part.trim(),
  };

  const fieldLimits: [keyof AvailabilityRequest, number][] = [
    ["firstName", 80],
    ["lastName", 80],
    ["email", 254],
    ["phone", 30],
    ["year", 4],
    ["make", 80],
    ["model", 100],
    ["vin", 17],
    ["part", 1000],
  ];
  const validPhone = /^[+()\d.\-\s]+$/.test(data.phone) &&
    data.phone.replace(/\D/g, "").length >= 7;

  if (
    fieldLimits.some(([field, limit]) => data[field].length > limit) ||
    !data.firstName ||
    !data.lastName ||
    !data.make ||
    !data.model ||
    !/^\d{4}$/.test(data.year) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    !validPhone ||
    data.part.length < 3 ||
    (data.vin !== "" && !/^[A-HJ-NPR-Z0-9]{17}$/.test(data.vin))
  ) {
    return NextResponse.json(
      { error: "Please check the required fields and try again." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Availability request email is unavailable: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Requests are temporarily unavailable. Please call 1-844-408-3004." },
      { status: 503 }
    );
  }

  const text = [
    "Part availability request",
    "",
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Vehicle: ${data.year} ${data.make} ${data.model}`,
    `VIN: ${data.vin || "Not provided"}`,
    `Requested part: ${data.part}`,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RockAutoTec Availability <orders@rockautotec.com>",
        to: ["support@rockautotec.com"],
        reply_to: data.email,
        subject: "Part availability request",
        text,
      }),
    });
  } catch {
    console.error("Availability request email delivery failed.");
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again or call 1-844-408-3004." },
      { status: 502 }
    );
  }

  if (!response.ok) {
    console.error("Availability request email provider returned HTTP", response.status);
    return NextResponse.json(
      { error: "We couldn't send your request. Please try again or call 1-844-408-3004." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
