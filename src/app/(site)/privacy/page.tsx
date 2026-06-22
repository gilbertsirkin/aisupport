import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Wertchain collects, uses, and protects your data.',
}

export default function PrivacyPage() {
  return (
    <main className="py-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>Last updated: June 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Information We Collect</h2>
            <p>Wertchain collects only the information necessary to operate your account: your name, email address, and the identity verification documents required to meet KYC/AML obligations. We do not collect more than what is needed to provide the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">How We Use Your Information</h2>
            <p>Your information is used to create and secure your account, process deposits and withdrawals, verify your identity in line with regulatory requirements, and communicate important updates about your investments.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data Security</h2>
            <p>Financial data access is isolated at the database engine layer using Row-Level Security (RLS). You can only ever query your own records. Administrative access operates on separate, audited channels that bypass standard user-level access.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Data Sharing</h2>
            <p>We do not sell your personal information. Data is shared only where required by law, such as with regulators or law enforcement in response to a valid legal request, or with service providers who help us operate the platform (e.g. identity verification providers) under strict confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Your Rights</h2>
            <p>You may request a copy of the personal data we hold about you, request corrections, or request account deletion (subject to regulatory record-keeping requirements) by contacting us.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
            <p>Questions about this policy can be sent to <a href="mailto:privacy@wertchain.com" className="text-primary hover:underline">privacy@wertchain.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
