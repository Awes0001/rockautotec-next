import Link from "next/link";
import { Shield, ArrowRight, Mail } from "lucide-react";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        sub: "Information You Provide",
        body: `When you create an account, place an order, or contact our support team, we collect information you
        provide directly to us, including: your name, email address, mailing and billing address, phone number,
        payment card information (processed securely via our payment processor — we never store raw card numbers),
        vehicle information (year, make, model) used to find compatible parts, and any messages or attachments
        you send to our support team.`,
      },
      {
        sub: "Information Collected Automatically",
        body: `When you visit our website or use our mobile app, we automatically collect certain information,
        including: IP address and approximate geographic location, browser type and version, operating system,
        referring URLs, pages visited and time spent on each page, search terms used on our site, items added
        to your cart, and click-through data from our emails.`,
      },
      {
        sub: "Information from Third Parties",
        body: `We may receive information about you from third parties, including: our payment processors
        (Stripe, PayPal) for fraud prevention and payment verification; advertising partners who help us
        reach you on other platforms; and shipping carriers who provide delivery updates and address
        validation services.`,
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        sub: "Order Fulfillment",
        body: `We use your information primarily to process and fulfill your orders, communicate order status
        and shipping updates, process returns and exchanges, provide customer support, and verify your identity
        and prevent fraud.`,
      },
      {
        sub: "Site Improvement & Personalization",
        body: `We use collected data to improve our website, catalog, and product recommendations; personalize
        your shopping experience by surfacing relevant parts for your vehicles; conduct analytics to understand
        how customers use our site; and fix technical issues.`,
      },
      {
        sub: "Marketing Communications",
        body: `With your consent, we may send you promotional emails about sales, new products, and maintenance
        tips. You can unsubscribe at any time using the link at the bottom of any marketing email, or by
        contacting us at privacy@rockautotec.com. We do not sell your email address to third parties for
        their marketing purposes.`,
      },
      {
        sub: "Legal & Safety",
        body: `We may use or disclose your information to comply with applicable laws and regulations, respond
        to lawful requests from law enforcement or government agencies, protect the rights and safety of
        RockAutoTec, our customers, and the public, and enforce our Terms of Service.`,
      },
    ],
  },
  {
    id: "information-sharing",
    title: "3. How We Share Your Information",
    content: [
      {
        sub: "Service Providers",
        body: `We share your information with trusted third-party service providers who assist us in operating
        our business. These include shipping carriers (UPS, FedEx, USPS) to fulfill deliveries; payment
        processors (Stripe, PayPal) to handle transactions securely; email service providers for transactional
        and marketing emails; analytics providers (Google Analytics) to measure site performance; and fraud
        prevention services. All service providers are contractually obligated to use your data only as
        directed by us and in compliance with applicable privacy laws.`,
      },
      {
        sub: "Business Transfers",
        body: `If RockAutoTec is involved in a merger, acquisition, or sale of all or substantially all of
        its assets, your information may be transferred as part of that transaction. We will notify you via
        email or a prominent website notice before your information is transferred and becomes subject to a
        different privacy policy.`,
      },
      {
        sub: "What We Do Not Do",
        body: `We do not sell, rent, or trade your personal information to third parties for their own
        marketing purposes. We do not share your data with data brokers. We do not share your vehicle or
        purchase data with insurance companies without your explicit consent.`,
      },
    ],
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking Technologies",
    content: [
      {
        sub: "Types of Cookies We Use",
        body: `Essential Cookies: Required for the site to function (shopping cart, login sessions). These
        cannot be disabled without breaking site functionality. Analytics Cookies: Help us understand how
        visitors use our site (Google Analytics). Preference Cookies: Remember your vehicle selections and
        display preferences. Marketing Cookies: Used to show you relevant ads on other websites (Google
        Ads, Facebook Pixel). You can manage marketing cookies through your browser settings or opt-out
        tools provided by the respective platforms.`,
      },
      {
        sub: "Your Cookie Choices",
        body: `You can control cookie settings through your browser's privacy settings. Note that disabling
        certain cookies may impact site functionality. We honor browser-level "Do Not Track" signals for
        analytics purposes.`,
      },
    ],
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: [
      {
        sub: "How We Protect Your Data",
        body: `We implement industry-standard security measures to protect your personal information,
        including 256-bit SSL/TLS encryption for all data transmitted between your browser and our servers;
        PCI-DSS compliant payment processing (card numbers are never stored on our servers); access controls
        limiting employee access to personal data on a need-to-know basis; regular security audits and
        penetration testing; and two-factor authentication for administrative systems.`,
      },
      {
        sub: "Data Breach Notification",
        body: `In the event of a data breach that affects your personal information, we will notify you
        by email within 72 hours of discovery (or as required by applicable law), describe the nature of
        the breach, and provide guidance on steps you can take to protect yourself.`,
      },
    ],
  },
  {
    id: "your-rights",
    title: "6. Your Rights & Choices",
    content: [
      {
        sub: "Access & Correction",
        body: `You have the right to access the personal information we hold about you and to request
        correction of any inaccurate data. You can view and update most of your account information by
        logging into My Account → Profile. For other requests, contact us at privacy@rockautotec.com.`,
      },
      {
        sub: "Data Deletion",
        body: `You may request deletion of your personal information by contacting us at
        privacy@rockautotec.com. We will process deletion requests within 30 days, subject to legal
        retention requirements (e.g., we must retain financial records for 7 years). Deletion of
        your account will also delete your order history from our customer-facing systems.`,
      },
      {
        sub: "California Residents (CCPA)",
        body: `California residents have additional rights under the California Consumer Privacy Act (CCPA),
        including the right to know what personal information we collect, use, and share; the right to
        delete personal information; the right to opt-out of the sale of personal information
        (we do not sell your data); and the right to non-discrimination for exercising your privacy rights.
        To submit a CCPA request, contact us at privacy@rockautotec.com.`,
      },
    ],
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: [
      {
        sub: "",
        body: `We retain your personal information for as long as your account is active or as needed to
        provide you with services. Specifically: account information is retained until you request deletion;
        order history is retained for 7 years for tax and legal compliance; inactive accounts are purged
        after 5 years of inactivity; server logs are retained for 90 days; and marketing consent records
        are retained for 3 years after your last interaction.`,
      },
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: [
      {
        sub: "",
        body: `Our website is not directed to children under the age of 16. We do not knowingly collect
        personal information from children under 16. If we become aware that we have collected personal
        information from a child under 16, we will take steps to delete that information promptly. If
        you believe we have inadvertently collected information from a child, please contact us at
        privacy@rockautotec.com.`,
      },
    ],
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: [
      {
        sub: "",
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices
        or applicable law. We will notify you of material changes by email (to the address associated
        with your account) at least 30 days before the changes take effect, or by posting a prominent
        notice on our website. Your continued use of our services after the effective date constitutes
        acceptance of the updated policy.`,
      },
    ],
  },
];

const TABLE_OF_CONTENTS = SECTIONS.map(({ id, title }) => ({ id, title }));

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, #dc2626 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <Shield className="h-3.5 w-3.5" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Privacy <span className="text-red-500">Policy</span>
            </h1>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              RockAutoTec LLC (&ldquo;RockAutoTec,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy.
              This policy describes what information we collect, how we use it, and your rights regarding your data.
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              Effective date: January 15, 2026 &nbsp;·&nbsp; Last updated: January 15, 2026
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Sidebar TOC */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-1">
                {TABLE_OF_CONTENTS.map(({ id, title }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="block text-sm text-zinc-400 hover:text-red-400 py-1 transition-colors leading-snug"
                  >
                    {title}
                  </a>
                ))}
                <a
                  href="#contact-privacy"
                  className="block text-sm text-zinc-400 hover:text-red-400 py-1 transition-colors"
                >
                  10. Contact Us
                </a>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 space-y-12">

            {/* Summary callout */}
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-6">
              <h2 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Privacy at a Glance</h2>
              <ul className="space-y-2">
                {[
                  "We collect information you provide (account, orders) and usage data (analytics, cookies).",
                  "We use your data to fulfill orders, improve our site, and (with consent) send marketing emails.",
                  "We do not sell your personal information to third parties.",
                  "We use 256-bit SSL encryption and PCI-DSS compliant payment processing.",
                  "You can access, correct, or request deletion of your data at any time.",
                  "California residents have additional rights under CCPA.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <Shield className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {SECTIONS.map(({ id, title, content }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <h2 className="text-lg font-bold text-white mb-5 pb-2 border-b border-zinc-800">
                  {title}
                </h2>
                <div className="space-y-5">
                  {content.map(({ sub, body }) => (
                    <div key={sub || body.slice(0, 20)}>
                      {sub && (
                        <h3 className="text-sm font-semibold text-zinc-200 mb-2">{sub}</h3>
                      )}
                      <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            {/* Contact section */}
            <section id="contact-privacy" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white mb-5 pb-2 border-b border-zinc-800">
                10. Contact Us
              </h2>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  If you have questions, concerns, or requests regarding this Privacy Policy or how we
                  handle your personal information, please contact our Privacy Team:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="h-4 w-4 text-red-500 shrink-0" />
                    <span>privacy@rockautotec.com</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-300">
                    <ArrowRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>RockAutoTec LLC, Attn: Privacy Team<br />123 Auto Drive, Suite 400<br />Dallas, TX 75201</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 mt-4">
                  We will respond to all privacy requests within <strong className="text-zinc-300">30 days</strong>.
                  For general support questions, please visit our{" "}
                  <Link href="/contact" className="text-red-400 hover:text-red-300 underline underline-offset-2">
                    Contact page
                  </Link>.
                </p>
              </div>
            </section>

          </main>
        </div>
      </div>

    </div>
  );
}
