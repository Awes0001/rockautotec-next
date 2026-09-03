import Link from "next/link";
import { FileText, Mail, ArrowRight } from "lucide-react";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By accessing or using the RockAutoTec website (rockautotec.com), mobile application, or any related
    services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms") and our
    Privacy Policy, which is incorporated herein by reference. If you do not agree to these Terms, you may not
    use our Services. These Terms constitute a legally binding agreement between you and RockAutoTec LLC
    ("RockAutoTec," "we," "us," or "our"), a limited liability company incorporated in Texas, USA.
    RockAutoTec reserves the right to modify these Terms at any time. We will notify you of material changes
    by email or by posting a notice on our website. Your continued use of the Services after the effective
    date of changes constitutes acceptance of the updated Terms.`,
  },
  {
    id: "accounts",
    title: "2. Accounts & Registration",
    body: `To purchase from RockAutoTec, you may check out as a guest or create an account. If you create an
    account, you agree to: (a) provide accurate, current, and complete registration information; (b) maintain
    the security of your password and restrict access to your account; (c) promptly update your account
    information if it changes; and (d) accept responsibility for all activities that occur under your account.
    You must be at least 18 years old to create an account or place an order. RockAutoTec reserves the right
    to suspend or terminate accounts that contain inaccurate information, engage in fraudulent activity, or
    violate these Terms. You may not create more than one account per person or transfer your account to
    another party without our written consent.`,
  },
  {
    id: "purchases",
    title: "3. Products, Pricing & Orders",
    body: `All products listed on our website are subject to availability. We reserve the right to limit
    quantities, discontinue products, or modify product descriptions and pricing at any time without notice.
    Prices displayed are in U.S. Dollars and do not include applicable taxes, shipping charges, or other fees,
    which will be calculated and displayed at checkout. We make every effort to ensure that product descriptions
    and fitment data are accurate; however, we do not warrant that descriptions, specifications, or pricing
    are error-free. In the event of a pricing error, we reserve the right to cancel your order and provide a
    full refund. Placing an order constitutes an offer to purchase. Your order is accepted and a contract
    formed when we send you a shipping confirmation email. We reserve the right to refuse or cancel any order
    for any reason, including suspected fraud, order quantity limits, or inaccuracies in product or pricing
    information. Payment is processed at the time of order placement. We accept Visa, Mastercard, American
    Express, Discover, PayPal, and Apple Pay.`,
  },
  {
    id: "fitment",
    title: "4. Fitment & Part Compatibility",
    body: `RockAutoTec provides vehicle compatibility information as a convenience tool. While we take extensive
    measures to ensure accuracy, fitment data is provided "as is" and may vary based on vehicle trim level,
    production date, regional variants, and modifications. You are ultimately responsible for verifying that
    the part you purchase is correct for your specific vehicle before installation. RockAutoTec is not liable
    for damage caused by the installation of an incompatible part where you proceeded without confirming
    fitment through our support team. If you are unsure about compatibility, contact our fitment specialists
    at 1-800-762-5832 before placing your order. Parts that do not fit your vehicle due to our fitment data
    errors are eligible for free return and exchange under our Return Policy.`,
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    body: `All content on the RockAutoTec website and mobile application—including but not limited to text,
    graphics, logos, images, product descriptions, video content, software, and the RockAutoTec name and
    logo—is the exclusive property of RockAutoTec LLC or its content licensors and is protected by U.S.
    and international intellectual property laws. You are granted a limited, non-exclusive, non-transferable,
    revocable license to access and use our Services for personal, non-commercial purposes only. You may not:
    reproduce, distribute, or create derivative works of our content without written permission; use our
    trademarks or trade dress in connection with products or services without our prior written consent;
    scrape, data-mine, or use automated tools to extract data from our website; or frame or link to our
    website in a way that misrepresents your affiliation with RockAutoTec.`,
  },
  {
    id: "prohibited",
    title: "6. Prohibited Uses",
    body: `You agree not to use our Services to: (a) violate any applicable local, state, national, or
    international law or regulation; (b) impersonate any person or entity, or falsely state or misrepresent
    your affiliation with any person or entity; (c) engage in fraudulent activity, including submitting
    false return claims, using stolen payment methods, or manipulating reviews; (d) interfere with or
    disrupt the integrity or performance of our website or servers; (e) attempt to gain unauthorized access
    to our systems, accounts, or databases; (f) upload or transmit viruses, malware, or any other harmful
    code; (g) use our Services for commercial resale without our written authorization as a dealer or
    affiliate partner; or (h) harvest, collect, or store personal information about other users without
    their consent. Violation of these prohibited uses may result in immediate account termination and may
    be referred to law enforcement.`,
  },
  {
    id: "disclaimer",
    title: "7. Disclaimers",
    body: `THE SERVICES AND ALL PRODUCTS SOLD THROUGH ROCKAUTOTEC ARE PROVIDED "AS IS" AND "AS AVAILABLE"
    WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, EXCEPT AS EXPRESSLY SET FORTH IN OUR
    RETURN POLICY OR ANY PRODUCT-SPECIFIC WARRANTY. ROCKAUTOTEC EXPRESSLY DISCLAIMS ALL IMPLIED WARRANTIES,
    INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
    ROCKAUTOTEC DOES NOT WARRANT THAT (A) THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
    ERROR-FREE; (B) THE RESULTS OBTAINED FROM USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE; OR
    (C) THE QUALITY OF ANY PRODUCTS, SERVICES, OR INFORMATION OBTAINED THROUGH THE SERVICES WILL MEET
    YOUR EXPECTATIONS. Some jurisdictions do not allow the exclusion of implied warranties, so the above
    exclusions may not apply to you.`,
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ROCKAUTOTEC AND ITS OFFICERS, DIRECTORS,
    EMPLOYEES, AGENTS, SUPPLIERS, AND LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
    CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF
    OR IN CONNECTION WITH YOUR USE OF THE SERVICES OR ANY PRODUCTS PURCHASED THROUGH THE SERVICES, EVEN
    IF ROCKAUTOTEC HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL ROCKAUTOTEC'S
    TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR USE OF THE
    SERVICES EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO ROCKAUTOTEC IN THE TWELVE (12) MONTHS
    PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100). Some jurisdictions do not allow limitations
    on liability, so these limitations may not apply to you.`,
  },
  {
    id: "indemnification",
    title: "9. Indemnification",
    body: `You agree to defend, indemnify, and hold harmless RockAutoTec LLC and its officers, directors,
    employees, agents, and licensors from and against any claims, liabilities, damages, judgments, awards,
    losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to
    your violation of these Terms or your use of the Services, including, but not limited to, any use of
    our content, services, and products other than as expressly authorized in these Terms.`,
  },
  {
    id: "dispute",
    title: "10. Dispute Resolution & Governing Law",
    body: `These Terms and any dispute arising from them will be governed by the laws of the State of Texas,
    without regard to its conflict of law provisions. Before initiating any formal legal action, you agree
    to first contact us at legal@rockautotec.com and attempt to resolve the dispute informally for at least
    30 days. If informal resolution fails, disputes will be resolved by binding individual arbitration
    administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules.
    YOU AGREE TO WAIVE YOUR RIGHT TO A JURY TRIAL AND TO PARTICIPATE IN CLASS ACTION LAWSUITS.
    The arbitration shall take place in Dallas County, Texas. Notwithstanding the foregoing, either
    party may seek injunctive or other equitable relief in any court of competent jurisdiction.`,
  },
  {
    id: "termination",
    title: "11. Termination",
    body: `RockAutoTec reserves the right to suspend or terminate your access to the Services at any time,
    with or without notice, for conduct that we determine, in our sole discretion, violates these Terms,
    our policies, or is harmful to other users, third parties, or the business interests of RockAutoTec.
    You may terminate your account at any time by contacting us at support@rockautotec.com. Upon termination,
    your right to use the Services will immediately cease. Provisions of these Terms that by their nature
    should survive termination shall survive, including intellectual property provisions, disclaimers,
    indemnification, and limitations of liability.`,
  },
  {
    id: "miscellaneous",
    title: "12. Miscellaneous",
    body: `These Terms, together with our Privacy Policy and any additional terms applicable to specific
    services, constitute the entire agreement between you and RockAutoTec regarding the Services and
    supersede all prior agreements. If any provision of these Terms is held invalid or unenforceable,
    that provision will be modified to the minimum extent necessary to make it enforceable, and the
    remaining provisions will remain in full effect. Our failure to enforce any right or provision of
    these Terms will not be considered a waiver of those rights. You may not assign your rights or
    obligations under these Terms without our prior written consent. RockAutoTec may assign its rights
    and obligations without restriction.`,
  },
];

const TABLE_OF_CONTENTS = SECTIONS.map(({ id, title }) => ({ id, title }));

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-900 border-b border-zinc-800">
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 50%, #dc2626 0%, transparent 65%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/10 px-4 py-1.5 text-sm text-red-400">
              <FileText className="h-3.5 w-3.5" />
              Legal Agreement
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Terms of <span className="text-red-500">Service</span>
            </h1>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              Please read these Terms carefully before using RockAutoTec. By using our website or placing
              an order, you agree to be bound by these Terms.
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
                Contents
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
                  href="#contact-legal"
                  className="block text-sm text-zinc-400 hover:text-red-400 py-1 transition-colors"
                >
                  13. Contact
                </a>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3 space-y-10">

            {/* Summary */}
            <div className="rounded-xl border border-zinc-700 bg-zinc-800/60 p-6">
              <h2 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Summary (Plain English)</h2>
              <ul className="space-y-2 text-sm text-zinc-300">
                {[
                  "You must be 18+ to purchase from us.",
                  "Provide accurate account and payment information.",
                  "Verify part fitment for your specific vehicle before installation.",
                  "Don't misuse our platform, scrape our data, or commit fraud.",
                  "Disputes are resolved by binding arbitration in Dallas, TX under Texas law.",
                  "Our liability is limited to the amount you paid us in the past 12 months.",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <ArrowRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {SECTIONS.map(({ id, title, body }) => (
              <section key={id} id={id} className="scroll-mt-24">
                <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800">
                  {title}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">{body}</p>
              </section>
            ))}

            {/* Contact */}
            <section id="contact-legal" className="scroll-mt-24">
              <h2 className="text-lg font-bold text-white mb-4 pb-2 border-b border-zinc-800">
                13. Contact & Legal Notices
              </h2>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                  For legal inquiries, notices, or questions about these Terms, please contact our Legal
                  Department:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="h-4 w-4 text-red-500 shrink-0" />
                    <span>legal@rockautotec.com</span>
                  </div>
                  <div className="flex items-start gap-2 text-zinc-300">
                    <ArrowRight className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      RockAutoTec LLC, Attn: Legal Department<br />
                      123 Auto Drive, Suite 400<br />
                      Dallas, TX 75201
                    </span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-zinc-800 flex flex-wrap gap-4">
                  <Link href="/privacy" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Privacy Policy →
                  </Link>
                  <Link href="/returns" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Return Policy →
                  </Link>
                  <Link href="/shipping" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Shipping Policy →
                  </Link>
                  <Link href="/contact" className="text-sm text-red-400 hover:text-red-300 transition-colors">
                    Contact Support →
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

    </div>
  );
}
