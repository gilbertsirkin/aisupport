export const footerlabels: { label: string; herf: string }[] = [
  { label: 'Risk Disclosure', herf: '/#legal' },
  { label: 'Terms of Service', herf: '/#legal' },
  { label: 'Privacy Policy', herf: '/#legal' },
  { label: 'AML Policy', herf: '/#legal' },
]

export const pricedata: {
  title: string
  short: string
  icon: string
  background: string
  price: string
  mark: string
  width: number
  height: number
  padding: string
}[] = [
  { title: 'Start Plan',        short: '14 Days · 5%',   icon: '/images/icons/icon-bitcoin.svg',        background: 'bg-chart-5/20',   price: '$1K – $4.9K',  mark: '5% fixed yield',   width: 18, height: 23, padding: 'px-4 py-3' },
  { title: 'Growth Plan',       short: '30 Days · 8%',   icon: '/images/icons/icon-ethereum.svg',       background: 'bg-secondary/15', price: '$5K – $14.9K', mark: '8% fixed yield',   width: 18, height: 23, padding: 'px-4 py-2' },
  { title: 'Professional Plan', short: '60 Days · 18%',  icon: '/images/icons/icon-bitcoin-circle.svg', background: 'bg-chart-5/20',   price: '$15K – $49.9K', mark: '18% fixed yield', width: 46, height: 46, padding: 'px-0 py-0' },
  { title: 'Elite Plan',        short: '120 Days · 40%', icon: '/images/icons/icon-litecoin.svg',       background: 'bg-secondary/15', price: '$50K+',         mark: '40% fixed yield', width: 18, height: 23, padding: 'px-4 py-3' },
]

export const portfolioData: { image: string; title: string }[] = [
  { image: '/images/portfolio/portfolio-icon-1.svg', title: 'Capital & profit completely separated' },
  { image: '/images/portfolio/portfolio-icon-2.svg', title: 'SHA-256 hash chain per investor' },
  { image: '/images/portfolio/portfolio-icon-3.svg', title: 'Balances reconstructable from ledger' },
]

export const upgradeData: { title: string }[] = [
  { title: 'Immutable Master Ledger' },
  { title: 'NUMERIC(20,8) exact arithmetic' },
  { title: 'Double-entry accounting' },
  { title: 'SHA-256 cryptographic chain' },
  { title: 'Daily profit accrual' },
  { title: 'Automated reinvestment engine' },
  { title: 'Seamless plan migration' },
  { title: '4-eyes admin authorization' },
]

export const perksData: { icon: string; title: string; text: string; space: string }[] = [
  { icon: '/images/perks/peak-icon-1.svg', title: '24/7 Support',     text: 'Our team is available around the clock to resolve any questions about your investment contracts.',   space: 'lg:mt-8'  },
  { icon: '/images/perks/peak-icon-2.svg', title: 'KYC Verified',    text: 'All accounts are identity-verified before withdrawal access is granted, ensuring regulatory compliance.', space: 'lg:mt-14' },
  { icon: '/images/perks/peak-icon-3.svg', title: 'Ledger Auditable', text: 'Every balance is fully reconstructable from the immutable ledger history at any point in time.',          space: 'lg:mt-4'  },
]

export const timelineData: { icon: string; title: string; text: string; position: string }[] = [
  { icon: '/images/timeline/icon-planning.svg',    title: 'Deposit',    text: 'Send crypto to the platform wallet and submit your transaction hash for admin confirmation.',          position: 'md:top-0 md:left-0'    },
  { icon: '/images/timeline/icon-refinement.svg',  title: 'Activate',   text: 'Admin confirms your deposit and your fixed-term contract activates immediately.',                      position: 'md:top-0 md:right-0'   },
  { icon: '/images/timeline/icon-prototype.svg',   title: 'Earn Daily', text: 'Profit accrues daily from day one. Track it live in your dashboard.',                                 position: 'md:bottom-0 md:left-0' },
  { icon: '/images/timeline/icon-support.svg',     title: 'Withdraw',   text: 'At maturity, profit hits your wallet instantly. Capital auto-reinvests or enters the release queue.',  position: 'md:bottom-0 md:right-0' },
]

export const CryptoData: { name: string; price: number }[] = [
  { name: 'Start Plan 14D/5%',        price: 1000  },
  { name: 'Growth Plan 30D/8%',       price: 5000  },
  { name: 'Professional Plan 60D/18%', price: 15000 },
  { name: 'Elite Plan 120D/40%',      price: 50000 },
]
