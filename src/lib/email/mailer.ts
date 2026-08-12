import { Resend } from 'resend'
import {
  welcomeTemplate,
  depositSubmittedTemplate,
  depositApprovedTemplate,
  depositRejectedTemplate,
  withdrawalRequestedTemplate,
  withdrawalApprovedTemplate,
  withdrawalRejectedTemplate,
  contractCreatedTemplate,
  contractMaturedTemplate,
  profitCreditedTemplate,
  migrationApprovedTemplate,
  securityAlertTemplate,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'Wertchain <noreply@wertchain.com>'

async function send(to: string, subject: string, html: string) {
  try {
    const { data, error } = await resend.emails.send({ from: FROM, to, subject, html })
    if (error) console.error('[mailer] resend error:', error)
    return { ok: !error, id: data?.id }
  } catch (err) {
    console.error('[mailer] send failed:', err)
    return { ok: false }
  }
}

// ── email dispatch functions ──────────────────────────────────────────────

export async function sendWelcomeEmail(user: { email: string; full_name: string }) {
  return send(user.email, 'Welcome to Wertchain', welcomeTemplate(user))
}

export async function sendDepositSubmittedEmail(user: { email: string; full_name: string }, deposit: {
  amount: number; currency: string; payment_reference: string; created_at: string
}) {
  return send(user.email, 'Deposit received — under review', depositSubmittedTemplate(user, deposit))
}

export async function sendDepositApprovedEmail(user: { email: string; full_name: string }, deposit: {
  amount: number; currency: string; payment_reference: string
}) {
  return send(user.email, `$${deposit.amount.toFixed(2)} credited to your account`, depositApprovedTemplate(user, deposit))
}

export async function sendDepositRejectedEmail(user: { email: string; full_name: string }, deposit: {
  amount: number; currency: string; rejection_reason: string
}) {
  return send(user.email, 'Deposit could not be verified', depositRejectedTemplate(user, deposit))
}

export async function sendWithdrawalRequestedEmail(user: { email: string; full_name: string }, withdrawal: {
  amount: number; withdrawal_type: string; created_at: string
}) {
  return send(user.email, 'Withdrawal request received', withdrawalRequestedTemplate(user, withdrawal))
}

export async function sendWithdrawalApprovedEmail(user: { email: string; full_name: string }, withdrawal: {
  amount: number; withdrawal_type: string; tx_hash?: string
}) {
  return send(user.email, `$${withdrawal.amount.toFixed(2)} withdrawal approved`, withdrawalApprovedTemplate(user, withdrawal))
}

export async function sendWithdrawalRejectedEmail(user: { email: string; full_name: string }, withdrawal: {
  amount: number; rejection_reason: string
}) {
  return send(user.email, 'Withdrawal request declined', withdrawalRejectedTemplate(user, withdrawal))
}

export async function sendContractCreatedEmail(user: { email: string; full_name: string }, contract: {
  plan_tier: string; principal: number; apy: number; term_days: number; matures_at: string
}) {
  return send(user.email, `${contract.plan_tier} investment activated`, contractCreatedTemplate(user, contract))
}

export async function sendContractMaturedEmail(user: { email: string; full_name: string }, contract: {
  plan_tier: string; principal: number; total_return: number; matures_at: string
}) {
  return send(user.email, 'Your investment has matured', contractMaturedTemplate(user, contract))
}

export async function sendProfitCreditedEmail(user: { email: string; full_name: string }, credit: {
  amount: number; source_plan: string; period_label: string
}) {
  return send(user.email, `Profit credited — ${credit.source_plan}`, profitCreditedTemplate(user, credit))
}

export async function sendMigrationApprovedEmail(user: { email: string; full_name: string }, migration: {
  from_tier: string; to_tier: string; capital_amount: number; new_apy: number
}) {
  return send(user.email, `Plan upgraded to ${migration.to_tier}`, migrationApprovedTemplate(user, migration))
}

export async function sendSecurityAlertEmail(user: { email: string; full_name: string }, alert: {
  event: string; ip?: string; location?: string; timestamp: string
}) {
  return send(user.email, '⚠ New sign-in to your Wertchain account', securityAlertTemplate(user, alert))
}
