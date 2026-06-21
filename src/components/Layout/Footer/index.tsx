import React, { FC } from "react"
import Link from "next/link"
import { headerData } from "../Header/Navigation/menuData"
import { footerlabels } from "@/app/api/data"
import Image from "next/image"
import { Icon } from "@iconify/react"
import Logo from "../Header/Logo"
import { Separator } from "@/components/ui/separator"

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 sm:grid-cols-11 lg:gap-20 md:gap-6 sm:gap-12 gap-6 pb-16">
          <div className="lg:col-span-4 md:col-span-6 col-span-6 flex flex-col gap-6">
            <Logo />
            <p className="text-white/60">
              Wertchain is a production-grade fixed-yield investment platform built on an immutable
              Master Ledger with double-entry accounting. Every balance is fully auditable.
            </p>
            <div className="flex gap-6 items-center relative z-1">
              <Link href="https://www.facebook.com/" className="group">
                <Icon icon="fa6-brands:facebook-f" width="24" height="24" className="text-white group-hover:text-primary" />
              </Link>
              <Link href="https://www.instagram.com/" className="group">
                <Icon icon="fa6-brands:instagram" width="24" height="24" className="text-white group-hover:text-primary" />
              </Link>
              <Link href="https://www.twitter.com/" className="group">
                <Icon icon="fa6-brands:x-twitter" width="24" height="24" className="text-white group-hover:text-primary" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Platform</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link href={item.href} className="text-white/60 hover:text-primary text-17">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 md:col-span-3 col-span-6">
            <h4 className="text-white mb-4 font-medium text-24">Legal</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link href={item.herf} className="text-white/60 hover:text-primary text-17">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-6">
            <h3 className="text-white text-24 font-medium mb-4">Download App</h3>
            <div className="flex flex-col gap-4">
              <Link href="#">
                <Image src="/images/footer/app-store-bedge.svg" alt="App Store" width={126} height={23} />
              </Link>
              <Link href="#">
                <Image src="/images/footer/app-store.svg" alt="Google Play" width={126} height={23} />
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-white/40 text-xs leading-relaxed">
                Capital allocation involves risk. Fixed yield rates are locked at contract creation.
                Please invest responsibly.
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Wertchain. All rights reserved.
          </p>
          <p className="text-white/30 text-xs text-center">
            NUMERIC(20,8) · SHA-256 · Double-Entry Accounting · PostgreSQL 15
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
