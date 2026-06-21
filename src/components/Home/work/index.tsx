'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const Work = () => {
  const ref = useRef(null)
  const inView = useInView(ref)

  const bottomAnimation = {
    initial: { y: '100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }
  const TopAnimation = {
    initial: { y: '-100%', opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 },
    transition: { duration: 0.6, delay: 0.4 },
  }

  const features = [
    { icon: '/images/chooseus/chooseus-icon-1.svg', text: 'Immutable Master Ledger — every entry is permanent' },
    { icon: '/images/chooseus/chooseus-icon-2.svg', text: 'Capital & profit structurally separated at all times' },
    { icon: '/images/chooseus/chooseus-icon-3.svg', text: 'Daily yield accrual with remainder-formula precision' },
    { icon: '/images/chooseus/chooseus-icon-1.svg', text: 'Automated reinvestment engine at maturity' },
  ]

  return (
    <section className='' id='work'>
      <div className='container px-4 mx-auto lg:max-w-(--breakpoint-xl)'>
        <div ref={ref} className='grid grid-cols-12 items-center'>
          <motion.div {...bottomAnimation} className='lg:col-span-7 col-span-12'>
            <div className='flex flex-col gap-3'>
              <p className="text-white font-medium">
                Why choose <span className='text-primary'>Wertchain</span>
              </p>
              <h2 className='sm:text-5xl text-3xl text-white lg:w-full md:w-70% font-medium'>
                Fixed-yield investment infrastructure built for precision
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-7 mt-11'>
              {features.map((feature, index) => (
                <div key={index} className='flex items-center gap-5'>
                  <div className='p-3 bg-primary/15 rounded-full shrink-0'>
                    <Image src={feature.icon} alt={feature.text} width={25} height={25} />
                  </div>
                  <p className='text-white font-medium'>{feature.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...TopAnimation} className='lg:col-span-5 col-span-12'>
            <div className='2xl:-mr-40 mt-9 flex justify-center'>
              <Image src='/images/work/img-work-with-us.png' alt='Wertchain platform' width={600} height={425} className='lg:w-full' />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Work
