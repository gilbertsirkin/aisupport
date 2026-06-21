import { upgradeData } from "@/app/api/data"
import Image from "next/image"
import { Icon } from "@iconify/react"

const Upgrade = () => {
  return (
    <section className="py-20" id="upgrade">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-white font-medium">
              Wertchain <span className="text-primary">infrastructure</span>
            </p>
            <h2 className="text-white sm:text-5xl text-3xl font-medium mb-5">
              Everything built for financial precision
            </h2>
            <p className="text-muted/60 text-lg mb-7">
              Every design decision — from NUMERIC(20,8) arithmetic to deferrable double-entry
              constraint triggers — exists to guarantee that no cent is ever untracked.
            </p>
            <div className="grid sm:grid-cols-2 text-nowrap gap-5">
              {upgradeData.map((item, index) => (
                <div key={index} className="flex gap-5">
                  <div>
                    <Icon icon="la:check-circle-solid" width="24" height="24" className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg text-muted/60">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="ml-0 lg:ml-7 justify-self-center">
              <Image src="/images/upgrade/img-upgrade.png" alt="Wertchain infrastructure" width={625} height={580} className="-mr-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
