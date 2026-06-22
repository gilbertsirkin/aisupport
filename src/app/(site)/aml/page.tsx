import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AML Policy',
  description: 'Wertchain anti-money laundering and identity verification policy.',
}

export default function AmlPage() {
  return (
    <main className="py-32">
      <div className="container px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">AML Policy</h1>
        <div className="space-y-6 text-white/60 leading-relaxed">
          <p>Last updated: June 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Identity Verification (KYC)</h2>
            <p>All users must complete identity verification before withdrawal access is granted. Unverified accounts are restricted to read-only access and basic account functions. Verification typically requires a government-issued ID and proof of address.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Transaction Monitoring</h2>
            <p>Wertchain monitors deposits and withdrawals for patterns consistent with money laundering, fraud, or other illicit activity. This includes automated checks on transaction size, frequency, and origin.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Source of Funds</h2>
            <p>We reserve the right to request information about the source of funds for any deposit, particularly for large transactions or unusual account activity. Failure to provide satisfactory documentation may result in delayed processing or account suspension.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Reporting Obligations</h2>
            <p>Where required by applicable law, Wertchain may be obligated to report suspicious activity to relevant regulatory authorities. We cooperate fully with law enforcement and regulatory investigations.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Account Restrictions</h2>
            <p>Wertchain reserves the right to suspend or restrict any account pending review of suspected money laundering, fraud, or sanctions violations, without prior notice where legally permitted.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">Contact</h2>
            <p>Compliance questions can be sent to <a href="mailto:compliance@wertchain.live" className="text-primary hover:underline">compliance@wertchain.live</a>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
