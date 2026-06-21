import { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Work from '@/components/Home/work'
import TimeLine from '@/components/Home/timeline'
import Platform from '@/components/Home/platform'
import Portfolio from '@/components/Home/portfolio'
import Upgrade from '@/components/Home/upgrade'
import Perks from '@/components/Home/perks'
import GlobalReach from '@/components/Home/GlobalReach'
import Faq from '@/components/Home/Faq'

export const metadata: Metadata = {
  title: 'Wertchain | Institutional Fixed-Yield Investment Platform',
  description:
    'Wertchain delivers predictable fixed-yield returns through an immutable Master Ledger with double-entry accounting. Capital and profits are cryptographically tracked, structurally separated, and fully auditable.',
  keywords: ['Wertchain', 'fixed yield investment', 'master ledger', 'double entry accounting', 'institutional investment', 'crypto investment'],
  openGraph: {
    title: 'Wertchain | Institutional Fixed-Yield Investment Platform',
    description: 'Predictable returns. Complete transparency. Immutable Master Ledger.',
    type: 'website',
  },
}

export default function Home() {
  return (
    <main>
      <Hero />
      <GlobalReach />
      <Work />
      <TimeLine />
      <Portfolio />
      <Platform />
      <Upgrade />
      <Perks />
      <Faq />
    </main>
  )
}
