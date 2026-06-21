"use client"
import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusIcon } from "lucide-react"

const faqData = [
  {
    question: "What is Wertchain?",
    answer: "Wertchain is a production-grade fixed-yield investment platform built on an immutable Master Ledger with double-entry accounting. Every deposit, yield accrual, migration, and withdrawal is permanently recorded as an atomic debit/credit pair — fully auditable at any point in time.",
  },
  {
    question: "How are my account balances verified?",
    answer: "Every balance is directly linked to unalterable ledger history. Each night, an automated reconciliation recalculates every debit and credit from first principles and cross-checks against cached tables. Any variance greater than $0.00000001 triggers an immediate security alert.",
  },
  {
    question: "What are the investment plans and yields?",
    answer: "Wertchain offers four tiers: Start ($1K–$4.9K, 14 days, 5%), Growth ($5K–$14.9K, 30 days, 8%), Professional ($15K–$49.9K, 60 days, 18%), and Elite ($50K+, 120 days, 40%). All terms are mathematically locked at contract creation.",
  },
  {
    question: "Why is there a release delay on capital withdrawals?",
    answer: "When you invest, your capital is deployed into structured yield-generating environments for the full cycle duration. The release delay protects all platform participants by preventing sudden large capital movements from disrupting active generation cycles. Profit is always available immediately at maturity.",
  },
  {
    question: "Are my daily yields subject to the same lock-up as my capital?",
    answer: "No. Daily yields are credited to your available balance (USER_WALLET) at maturity and are immediately withdrawable — provided your KYC verification is complete. Only the invested principal is subject to the release delay if you cancel auto-reinvest.",
  },
  {
    question: "What is auto-reinvestment and how does it work?",
    answer: "By default, all contracts launch with auto-reinvest enabled. At maturity, your profit is credited to your wallet and your capital automatically rolls into a new contract at the same terms — no action required. You can disable this at any point during the active cycle from your dashboard.",
  },
  {
    question: "Can I migrate capital between plans without withdrawal delays?",
    answer: "Yes. At maturity, you can migrate capital directly into another tier without incurring release delays. The system posts an atomic MIGRATION_DEBIT and MIGRATION_CREDIT through a transit reserve — your capital is never untracked during the move. You can top up from your available balance when upgrading.",
  },
  {
    question: "What KYC is required to withdraw?",
    answer: "Your account must reach VERIFIED status before any withdrawal can be processed. Unverified accounts have read-only access. Capital remains safely accounted for in the master ledger while verification is pending.",
  },
]

const Faq = () => {
  return (
    <section id="faq" className="py-16 text-white">
      <div className="container">
        <div className="mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-primary uppercase text-sm font-medium tracking-widest">
              Investor FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2">
              Common questions about Wertchain
            </h2>
            <p className="text-white/50 mt-2">
              Everything you need to know before investing
            </p>
          </div>
          <Accordion className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/5 rounded-lg border-none px-4"
              >
                <AccordionTrigger className="text-lg font-medium hover:no-underline py-4 **:data-[slot=accordion-trigger-icon]:hidden">
                  {item.question}
                  <PlusIcon className="w-6 h-6 shrink-0 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-45" />
                </AccordionTrigger>
                <AccordionContent className="text-white/50 text-base pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default Faq
