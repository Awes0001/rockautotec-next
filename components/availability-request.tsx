
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Phone, CheckCircle, Loader2 } from "lucide-react";

const PHONE_NUMBER = "1-844-408-3004";

export default function AvailabilityRequest() {
  const submissionInProgress = useRef(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInProgress.current) return;
    submissionInProgress.current = true;
    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/availability-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Unable to submit your request. Please call us."
        );
      }

      setSuccess(true);
      setMessage(
        "Your request has been submitted! Our team will contact you shortly."
      );
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call us."
      );
    } finally {
      submissionInProgress.current = false;
      setLoading(false);
    }
  }

  return (
    <>
      <section
        id="check-availability"
        className="bg-slate-950 px-4 py-14 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Need an auto part?
            </p>

            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Check Part Availability
            </h2>

            <p className="mt-4 max-w-xl text-slate-300">
              Tell us which part you need and your vehicle details.
              Our team will review your request and get back to you.
            </p>

            <a
              href="tel:+18444083004"
              className="mt-6 inline-flex items-center gap-3 rounded-lg bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              <Phone size={20} />
              Call {PHONE_NUMBER}
            </a>

            <p className="mt-3 text-sm text-slate-400">
              Have your VIN ready? Include it to help us verify fitment.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-5 text-slate-900 shadow-xl sm:p-7"
          >
            <h3 className="mb-5 text-xl font-bold">
              Request a Part
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">
                First Name *
                <input
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="First name"
                />
              </label>

              <label className="block text-sm font-semibold">
                Last Name *
                <input
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Last name"
                />
              </label>

              <label className="block text-sm font-semibold">
                Email Address *
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block text-sm font-semibold">
                Phone Number *
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={30}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Your phone number"
                />
              </label>

              <label className="block text-sm font-semibold">
                Vehicle Year *
                <input
                  name="year"
                  type="text"
                  required
                  maxLength={4}
                  inputMode="numeric"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="e.g. 2020"
                />
              </label>

              <label className="block text-sm font-semibold">
                Make *
                <input
                  name="make"
                  type="text"
                  required
                  maxLength={80}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="e.g. Toyota"
                />
              </label>

              <label className="block text-sm font-semibold sm:col-span-2">
                Model *
                <input
                  name="model"
                  type="text"
                  required
                  maxLength={100}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="e.g. Camry"
                />
              </label>

              <label className="block text-sm font-semibold sm:col-span-2">
                VIN (Optional)
                <input
                  name="vin"
                  type="text"
                  maxLength={17}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal uppercase outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="17-character VIN"
                />
              </label>

              <label className="block text-sm font-semibold sm:col-span-2">
                Which Part Do You Need? *
                <textarea
                  name="part"
                  required
                  minLength={3}
                  maxLength={1000}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-3 font-normal outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  placeholder="Part name, part number, or details"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Check Availability"
              )}
            </button>

            {message && (
              <p
                role={success ? "status" : "alert"}
                className={`mt-4 flex items-start gap-2 text-sm ${
                  success ? "text-green-700" : "text-red-600"
                }`}
              >
                {success && (
                  <CheckCircle size={18} className="shrink-0" />
                )}
                {message}
              </p>
            )}

            <p className="mt-3 text-center text-xs text-slate-500">
              Please verify vehicle fitment with our team before ordering.
            </p>
          </form>
        </div>
      </section>

      <a
        href="tel:+18444083004"
        aria-label={`Call RockAutoTec at ${PHONE_NUMBER}`}
        className="fixed bottom-5 right-5 z-50 inline-flex min-w-40 items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 font-bold text-white shadow-2xl transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <Phone size={21} />
        <span>Call Now</span>
      </a>
    </>
  );
}
