"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import CardSlider from "./slider"
import BrandLogo from "../BrandLogo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const Hero = () => {
  const leftAnimation = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
  }

  const rightAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 },
  }

  return (
    <section className="relative py-24 pt-48 overflow-hidden z-1" id="main-banner">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — copy */}
          <motion.div {...leftAnimation} className="flex flex-col items-center lg:items-start gap-10">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <div className="flex gap-6 items-center lg:justify-start justify-center">
                <Badge
                  variant="outline"
                  className="text-base py-1.5 px-4 bg-primary/10 rounded-full border border-white/10 text-primary font-medium h-9"
                >
                  NUMERIC(20,8) · SHA-256 · Double-Entry
                </Badge>
              </div>
              <h1 className="font-medium xl:text-[72px] md:text-6xl sm:text-5xl text-4xl text-white">
                Invest with mathematical certainty.
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Wertchain delivers predictable fixed-yield returns through an immutable Master Ledger.
                Your capital and profits are cryptographically tracked, structurally separated,
                and fully auditable — every single movement, every single day.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                { value: '5–40%',   label: 'Fixed yield per cycle' },
                { value: 'SHA-256', label: 'Hash chain per investor' },
                { value: '100%',    label: 'Ledger reconstructable' },
              ].map(stat => (
                <div key={stat.label} className="border border-white/10 rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center md:justify-start justify-center gap-4 flex-wrap">
              <Button
                render={<Link href="/signup" />}
                className="text-base bg-primary hover:bg-primary/80 flex items-center gap-2 border border-primary rounded-lg font-semibold text-background py-6 px-7 cursor-pointer h-12"
              >
                Open Account
                <Image src="/images/icons/icon-arrow.svg" alt="arrow" width={20} height={20} />
              </Button>
              <Button
                render={<Link href="/#work" />}
                className="text-base bg-transparent hover:bg-white/5 flex items-center gap-2 border border-white/20 rounded-lg font-semibold text-white py-6 px-7 cursor-pointer h-12"
              >
                View Plans
              </Button>
            </div>

            {/* App badges */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-white/40">Available on:</span>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image src="/images/hero/applestore.png" alt="App Store" width={120} height={36} className="h-9 w-auto" />
              </a>
              <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                <Image src="/images/hero/playstore.png" alt="Google Play" width={120} height={36} className="h-9 w-auto" />
              </a>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div {...rightAnimation} className="justify-self-center relative">
            <Image
              src="/images/hero/hero-banner-img.png"
              alt="Wertchain mobile investment dashboard"
              width={584}
              height={582}
              className="w-full h-full"
              priority
            />
            {/* Floating cards */}
            <div className="absolute -left-4 top-1/3 rounded-2xl border border-white/10 bg-background/80 backdrop-blur px-4 py-3 shadow-xl">
              <p className="text-[10px] text-white/50 uppercase tracking-widest">Daily Yield</p>
              <p className="text-xl font-bold text-primary">+$342.50</p>
              <p className="text-[10px] text-white/40">Accruing · 3 contracts</p>
            </div>
            <div className="absolute -right-2 top-1/4 flex items-center gap-2 rounded-2xl border border-white/10 bg-background/80 backdrop-blur px-3 py-2.5 shadow-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <span className="text-sm font-bold text-primary">↑</span>
              </div>
              <div>
                <p className="text-[10px] text-white/50">Profit Credited</p>
                <p className="text-sm font-bold text-white">+$1,800.00</p>
              </div>
            </div>
          </motion.div>
        </div>

        <BrandLogo />
        <CardSlider />
      </div>
    </section>
  )
}

export default Hero
