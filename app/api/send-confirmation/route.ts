import { NextResponse } from "next/server";

interface CartItem {
  part: string;
  year: string;
  make: string;
  model: string;
  price: number;
}

interface OrderPayload {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

function generateOrderId() {
  const year = new Date().getFullYear();
  const num = Math.floor(10000 + Math.random() * 90000);
  return `RAT-${year}-${num}`;
}

function buildEmailHtml(p: OrderPayload, orderId: string): string {
  const itemRows = p.items
    .map(
      (item) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #27272a;color:#e4e4e7;font-size:13px;">
        🔧 ${item.part}${item.year ? ` <span style="color:#71717a;font-size:11px;">(${item.year} ${item.make} ${item.model})</span>` : ""}
      </td>
      <td style="padding:10px 16px;border-bottom:1px solid #27272a;color:#ffffff;font-size:13px;text-align:right;font-weight:600;">
        $${item.price.toFixed(2)}
      </td>
    </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:#18181b;border:1px solid #27272a;border-radius:12px 12px 0 0;padding:24px 32px;text-align:center;">
    <p style="margin:0;color:#ef4444;font-size:24px;font-weight:800;letter-spacing:-0.5px;">🔧 RockAutoTec</p>
    <p style="margin:6px 0 0;color:#71717a;font-size:13px;">Order Confirmation</p>
  </td></tr>

  <!-- Success banner -->
  <tr><td style="background:#052e16;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:24px 32px;text-align:center;">
    <p style="margin:0;font-size:36px;">✅</p>
    <p style="margin:8px 0 4px;color:#4ade80;font-size:20px;font-weight:700;">Order Placed!</p>
    <p style="margin:0;color:#86efac;font-size:13px;">Thank you, ${p.firstName}. We've received your order and are getting it ready.</p>
  </td></tr>

  <!-- Order ID -->
  <tr><td style="background:#18181b;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:16px 32px;border-top:1px solid #27272a;">
    <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Order Number</p>
    <p style="margin:4px 0 0;color:#ffffff;font-size:17px;font-weight:700;font-family:monospace;">${orderId}</p>
  </td></tr>

  <!-- Items -->
  <tr><td style="background:#18181b;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:0;border-top:1px solid #27272a;">
    <p style="margin:0;padding:14px 16px 8px;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Items Ordered</p>
    <table width="100%" cellpadding="0" cellspacing="0">${itemRows}</table>
  </td></tr>

  <!-- Totals -->
  <tr><td style="background:#09090b;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:18px 32px;border-top:1px solid #27272a;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="color:#a1a1aa;font-size:13px;padding:3px 0;">Subtotal</td>
        <td style="color:#e4e4e7;font-size:13px;text-align:right;padding:3px 0;">$${p.subtotal.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="color:#a1a1aa;font-size:13px;padding:3px 0;">Shipping</td>
        <td style="color:${p.shipping === 0 ? "#4ade80" : "#e4e4e7"};font-size:13px;text-align:right;padding:3px 0;">${p.shipping === 0 ? "FREE" : `$${p.shipping.toFixed(2)}`}</td>
      </tr>
      <tr>
        <td style="color:#a1a1aa;font-size:13px;padding:3px 0;">Tax</td>
        <td style="color:#e4e4e7;font-size:13px;text-align:right;padding:3px 0;">$${p.tax.toFixed(2)}</td>
      </tr>
      <tr>
        <td colspan="2" style="border-top:1px solid #27272a;padding:0;height:8px;"></td>
      </tr>
      <tr>
        <td style="color:#ffffff;font-size:15px;font-weight:700;padding:4px 0;">Total</td>
        <td style="color:#ffffff;font-size:15px;font-weight:700;text-align:right;padding:4px 0;">$${p.orderTotal.toFixed(2)}</td>
      </tr>
    </table>
  </td></tr>

  <!-- Shipping to -->
  <tr><td style="background:#18181b;border-left:1px solid #27272a;border-right:1px solid #27272a;padding:16px 32px;border-top:1px solid #27272a;">
    <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Shipping To</p>
    <p style="margin:4px 0 0;color:#e4e4e7;font-size:13px;font-weight:600;">${p.firstName} ${p.lastName}</p>
    <p style="margin:3px 0 0;color:#a1a1aa;font-size:13px;">${p.address}<br>${p.city}, ${p.state} ${p.zip}</p>
  </td></tr>

  <!-- Estimated delivery -->
  <tr><td style="background:#18181b;border-left:1px solid #27272a;border-right:1px solid #27272a;border-bottom:1px solid #27272a;border-radius:0 0 12px 12px;padding:16px 32px;border-top:1px solid #27272a;">
    <p style="margin:0;color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Estimated Delivery</p>
    <p style="margin:4px 0 0;color:#e4e4e7;font-size:13px;font-weight:600;">2–5 Business Days</p>
    <p style="margin:6px 0 0;color:#52525b;font-size:11px;">Tracking information will be emailed once your order ships.</p>
  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 0;text-align:center;">
    <p style="margin:0;color:#52525b;font-size:12px;">
      Questions? Call <a href="tel:+18007625832" style="color:#ef4444;text-decoration:none;">1-800-762-5832</a>
      or <a href="mailto:support@rockautotec.com" style="color:#ef4444;text-decoration:none;">support@rockautotec.com</a>
    </p>
    <p style="margin:10px 0 0;color:#3f3f46;font-size:11px;">© 2026 RockAutoTec LLC · All rights reserved</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const payload: OrderPayload = await request.json();
    const orderId = generateOrderId();

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // No key configured — checkout still works, email silently skipped
      return NextResponse.json({ success: true, orderId, emailSent: false });
    }

    const html = buildEmailHtml(payload, orderId);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RockAutoTec Orders <orders@rockautotec.com>",
        to: [payload.email],
        subject: `Order Confirmed — ${orderId} | RockAutoTec`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      // Return success so checkout is not blocked by email failure
      return NextResponse.json({ success: true, orderId, emailSent: false });
    }

    return NextResponse.json({ success: true, orderId, emailSent: true });
  } catch (err) {
    console.error("Email route error:", err);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
