const LEGAL_SECTIONS = [
  {
    title: 'Risk Disclosure',
    body: 'By initializing an investment contract within the Wertchain ecosystem, the allocator acknowledges that they have reviewed and agreed to the structural rules detailed on this portal. Yield rates, duration windows, and liquidity release delays are locked at the moment a contract becomes active. Changes to plan parameters apply only to future contracts -- active deployments are insulated from retroactive updates.',
  },
  {
    title: 'Terms of Service',
    body: 'Wertchain operates as an automated asset allocation framework driven by cryptographic ledger models. Use of the platform requires acceptance of these terms. Contracts cannot be cancelled mid-term; capital is locked inside a strict database state machine for the full duration of the chosen investment cycle.',
  },
  {
    title: 'Privacy Policy',
    body: 'Wertchain collects only the information necessary to operate your account, process deposits and withdrawals, and meet identity verification requirements. Financial data access is isolated at the database engine layer via Row-Level Security -- you can only ever query your own records.',
  },
  {
    title: 'AML Policy',
    body: 'All users must complete identity verification (KYC) before withdrawal access is granted. Wertchain monitors deposits and withdrawals for patterns consistent with money laundering or fraud and reserves the right to request additional verification or suspend accounts pending review.',
  },
]

export default function Legal() {
  return (
    <section id="legal" className="py-16 border-t border-border">
      <div className="container px-4">
        <div className="text-center mb-10">
          <p className="text-primary uppercase text-sm font-medium tracking-widest">
            Legal
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-white">
            Disclosures & Policies
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {LEGAL_SECTIONS.map((section) => (
            <div key={section.title} className="rounded-xl border border-border bg-white/5 p-5">
              <h3 className="text-white font-semibold mb-2">{section.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
