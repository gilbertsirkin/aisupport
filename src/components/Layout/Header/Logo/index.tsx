import Link from "next/link"

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-sm font-black text-white">W</span>
      </div>
      <div className="leading-tight">
        <p className="text-base font-bold text-white tracking-tight">Wertchain</p>
        <p className="text-[9px] text-white/40 tracking-widest uppercase leading-none">Investment Platform</p>
      </div>
    </Link>
  )
}

export default Logo
