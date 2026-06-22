import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of the Wertchain platform.',
}

export default function TermsPage() {
  return (
    <main className="py-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>Last updated: June 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By creating an account or using Wertchain, you agree to be bound by these Terms of Service. Wertchain operates as an automated asset allocation framework driven by cryptographic ledger models.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">2. Investment Contracts</h2>
            <p>Yield rates, duration windows, and liquidity release delays are locked at the moment a contract becomes active and are not subject to change for that contract. Contracts cannot be cancelled mid-term; capital is locked for the full duration of the chosen investment cycle.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">3. Deposits and Withdrawals</h2>
            <p>Deposits are reviewed and confirmed manually before your available balance is credited. Withdrawals require completed identity verification (KYC) and may be subject to processing fees and release delays as described on the platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">4. Risk Acknowledgment</h2>
            <p>Capital allocation involves risk. Fixed yield rates reflect contractual terms between you and the platform and are not guaranteed against platform insolvency or extraordinary circumstances. You should only invest funds you can afford to have locked for the stated contract duration.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">5. Account Suspension</h2>
            <p>Wertchain reserves the right to suspend or restrict accounts found to be in violation of these terms, engaged in fraudulent activity, or failing to meet identity verification requirements.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">6. Changes to These Terms</h2>
            <p>We may update these terms from time to time. Material changes will be communicated to active users. Continued use of the platform after changes take effect constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
            <p>Questions about these terms can be sent to <a href="mailto:support@wertchain.live" className="text-primary hover:underline">support@wertchain.live</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
