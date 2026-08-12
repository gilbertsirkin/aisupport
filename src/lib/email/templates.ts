// ─────────────────────────────────────────────────────────────────────────────
// Wertchain Email Templates
//
// Design language:
//   Background:  #0A0F1E  (deep navy — matches app shell)
//   Card:        #111827  (surface)
//   Border:      #1E2A3B  (subtle)
//   Gold accent: #E8B84B  (brand primary)
//   Text/1:      #FFFFFF
//   Text/2:      #9CA3AF  (zinc-400)
//   Text/3:      #4B5563  (zinc-600)
//   Green:       #10B981
//   Red:         #EF4444
//   Font stack:  -apple-system, 'Segoe UI', sans-serif  (safe + clean)
//
// Each template is a standalone function returning an HTML string.
// All emails are ~600px wide, dark-mode first, with a plain-text fallback
// ensured by keeping copy readable even without images.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wertchain.com'
const LOGO_URL = `${SITE_URL}/images/logo/logo.svg`

// ── shared utilities ──────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(n)
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

// ── base layout ───────────────────────────────────────────────────────────

function base(content: string, previewText: string = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="dark" />
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
  <title>Wertchain</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background-color: #080D1A; font-family: -apple-system,'Segoe UI',Helvetica,Arial,sans-serif; color: #E5E7EB; }
    a { color: #E8B84B; text-decoration: none; }
    @media (prefers-color-scheme: light) {
      body { background-color: #F3F4F6; }
      .card { background-color: #FFFFFF !important; border-color: #E5E7EB !important; }
      .card-inner { background-color: #F9FAFB !important; border-color: #E5E7EB !important; }
      .txt-primary { color: #111827 !important; }
      .txt-muted { color: #374151 !important; }
      .txt-dim { color: #6B7280 !important; }
      .footer-bg { background-color: #F3F4F6 !important; }
      .footer-txt { color: #6B7280 !important; }
    }
  </style>
</head>
<body>
  ${previewText ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${previewText}&nbsp;‌&zwnj;​‌&zwnj;​‌&zwnj;​‌&zwnj;​</div>` : ''}

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#080D1A;min-height:100vh;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- wrapper -->
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;">

          <!-- header -->
          <tr>
            <td style="padding-bottom:32px;" align="center">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#E8B84B;width:32px;height:32px;border-radius:6px;text-align:center;vertical-align:middle;">
                    <span style="font-size:16px;font-weight:900;color:#0A0F1E;line-height:32px;">W</span>
                  </td>
                  <td style="padding-left:10px;">
                    <span style="font-size:18px;font-weight:700;color:#FFFFFF;letter-spacing:-0.3px;">Wertchain</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- card -->
          <tr>
            <td class="card" style="background-color:#111827;border:1px solid #1E2A3B;border-radius:16px;overflow:hidden;">
              ${content}
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td class="footer-bg" style="padding:32px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="padding:0 12px;">
                          <a href="${SITE_URL}/dashboard" class="footer-txt" style="font-size:12px;color:#4B5563;">Dashboard</a>
                        </td>
                        <td style="padding:0 12px;">
                          <a href="${SITE_URL}/privacy" class="footer-txt" style="font-size:12px;color:#4B5563;">Privacy</a>
                        </td>
                        <td style="padding:0 12px;">
                          <a href="${SITE_URL}/terms" class="footer-txt" style="font-size:12px;color:#4B5563;">Terms</a>
                        </td>
                        <td style="padding:0 12px;">
                          <a href="${SITE_URL}/contact" class="footer-txt" style="font-size:12px;color:#4B5563;">Support</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p class="footer-txt" style="font-size:11px;color:#374151;line-height:1.6;max-width:400px;margin:0 auto;">
                      Wertchain Ltd · You're receiving this because you hold an account with us.<br />
                      This is an automated notification — please do not reply to this email.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ── shared card components ────────────────────────────────────────────────

function cardHeader(title: string, subtitle?: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="padding:36px 40px 28px;border-bottom:1px solid #1E2A3B;">
          <p class="txt-dim" style="font-size:11px;font-weight:600;letter-spacing:1.5px;color:#4B5563;text-transform:uppercase;margin-bottom:8px;">Wertchain Notification</p>
          <h1 class="txt-primary" style="font-size:22px;font-weight:700;color:#FFFFFF;line-height:1.3;letter-spacing:-0.4px;">${title}</h1>
          ${subtitle ? `<p class="txt-muted" style="font-size:14px;color:#9CA3AF;margin-top:6px;line-height:1.5;">${subtitle}</p>` : ''}
        </td>
      </tr>
    </table>`
}

function cardBody(html: string) {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:28px 40px;">${html}</td></tr></table>`
}

function greeting(name: string) {
  return `<p class="txt-primary" style="font-size:15px;color:#E5E7EB;margin-bottom:20px;">Hello <strong>${name}</strong>,</p>`
}

function para(text: string) {
  return `<p class="txt-muted" style="font-size:14px;color:#9CA3AF;line-height:1.7;margin-bottom:16px;">${text}</p>`
}

function dataRow(label: string, value: string, highlight = false) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #1A2234;">
        <p class="txt-dim" style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#4B5563;margin-bottom:2px;">${label}</p>
        <p class="${highlight ? '' : 'txt-muted'}" style="font-size:14px;font-weight:${highlight ? '700' : '500'};color:${highlight ? '#E8B84B' : '#D1D5DB'};font-family:'Courier New',monospace;">${value}</p>
      </td>
    </tr>`
}

function dataTable(rows: [string, string, boolean?][]) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#0D1626;border:1px solid #1A2234;border-radius:10px;margin:20px 0;">
      <tr><td style="padding:4px 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${rows.map(([l, v, h]) => dataRow(l, v, h)).join('')}
        </table>
      </td></tr>
    </table>`
}

function cta(label: string, href: string) {
  return `
    <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
      <tr>
        <td style="background-color:#E8B84B;border-radius:8px;">
          <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:700;color:#0A0F1E;letter-spacing:0.2px;text-decoration:none;">${label}</a>
        </td>
      </tr>
    </table>`
}

function statusBadge(label: string, color: 'green' | 'red' | 'amber' | 'blue') {
  const colors = {
    green: { bg: '#052E16', border: '#166534', text: '#4ADE80' },
    red:   { bg: '#2D0A0A', border: '#7F1D1D', text: '#F87171' },
    amber: { bg: '#2D1F00', border: '#78350F', text: '#FCD34D' },
    blue:  { bg: '#0A1628', border: '#1E3A5F', text: '#60A5FA' },
  }
  const c = colors[color]
  return `<span style="display:inline-block;background-color:${c.bg};border:1px solid ${c.border};color:${c.text};font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:4px 10px;border-radius:4px;">${label}</span>`
}

function divider() {
  return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr><td style="padding:8px 0;"><div style="height:1px;background-color:#1E2A3B;"></div></td></tr></table>`
}

function amountHero(amount: number, label?: string) {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:20px 0;">
      <tr>
        <td class="card-inner" align="center" style="background-color:#0D1626;border:1px solid #1A2234;border-radius:10px;padding:24px;">
          ${label ? `<p class="txt-dim" style="font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#4B5563;margin-bottom:6px;">${label}</p>` : ''}
          <p style="font-size:36px;font-weight:800;color:#E8B84B;letter-spacing:-1px;font-family:'Courier New',monospace;">${fmt(amount)}</p>
        </td>
      </tr>
    </table>`
}

function notice(text: string, type: 'info' | 'warning' | 'success' = 'info') {
  const styles = {
    info:    { bg: '#0A1628', border: '#1E3A5F', text: '#93C5FD', icon: 'ℹ' },
    warning: { bg: '#1C1400', border: '#78350F', text: '#FCD34D', icon: '⚠' },
    success: { bg: '#022C22', border: '#065F46', text: '#6EE7B7', icon: '✓' },
  }
  const s = styles[type]
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:16px 0;">
      <tr>
        <td style="background-color:${s.bg};border:1px solid ${s.border};border-radius:8px;padding:14px 16px;">
          <p style="font-size:13px;color:${s.text};line-height:1.6;">${s.icon}&nbsp;&nbsp;${text}</p>
        </td>
      </tr>
    </table>`
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// ── 1. Welcome ────────────────────────────────────────────────────────────

export function welcomeTemplate(user: { full_name: string }) {
  return base(`
    ${cardHeader('Welcome to Wertchain', 'Your account is active.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Your account has been created and is ready. Wertchain gives you access to structured investment plans backed by transparent on-chain mechanics — no opaque fees, no hidden lock-in beyond what you select.')}

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
        ${[
          ['Step 1', 'Deposit funds to your wallet', '→ /deposit'],
          ['Step 2', 'Select an investment plan', '→ /invest'],
          ['Step 3', 'Track returns on your dashboard', '→ /dashboard'],
        ].map(([step, desc, path]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #1A2234;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background-color:#E8B84B;border-radius:4px;width:56px;text-align:center;padding:3px 0;">
                    <span style="font-size:10px;font-weight:800;color:#0A0F1E;letter-spacing:0.5px;">${step}</span>
                  </td>
                  <td style="padding-left:14px;">
                    <p class="txt-primary" style="font-size:13px;font-weight:500;color:#E5E7EB;">${desc}</p>
                    <p class="txt-dim" style="font-size:11px;color:#4B5563;font-family:'Courier New',monospace;">${path}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`).join('')}
      </table>

      ${cta('Go to Dashboard', `${SITE_URL}/dashboard`)}
      ${divider()}
      ${para('If you did not create this account, contact support immediately at <a href="mailto:support@wertchain.com">support@wertchain.com</a>.')}
    `)}
  `, `Welcome, ${user.full_name} — your account is active.`)
}

// ── 2. Deposit Submitted ──────────────────────────────────────────────────

export function depositSubmittedTemplate(
  user: { full_name: string },
  deposit: { amount: number; currency: string; payment_reference: string; created_at: string }
) {
  return base(`
    ${cardHeader('Deposit under review', 'We\'ve received your transfer and are verifying it on-chain.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Your deposit has been recorded and is now in the review queue. Our finance team verifies every transaction on-chain before crediting your account — this typically takes 1–6 hours.')}
      ${amountHero(deposit.amount, 'Deposit amount')}
      ${dataTable([
        ['Currency', deposit.currency],
        ['Transaction reference', deposit.payment_reference, true],
        ['Submitted', fmtDate(deposit.created_at)],
        ['Status', 'Pending review'],
      ])}
      ${notice('Your funds are safe. This review step confirms the transaction reached our wallet before crediting your balance.', 'info')}
      ${cta('View deposit status', `${SITE_URL}/dashboard`)}
    `)}
  `, `Deposit of ${fmt(deposit.amount)} is under review.`)
}

// ── 3. Deposit Approved ───────────────────────────────────────────────────

export function depositApprovedTemplate(
  user: { full_name: string },
  deposit: { amount: number; currency: string; payment_reference: string }
) {
  return base(`
    ${cardHeader('Deposit confirmed', `${fmt(deposit.amount)} has been credited to your account.`)}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Your deposit has been verified and your balance has been updated. You can now invest or keep funds in your wallet.')}
      ${amountHero(deposit.amount, 'Amount credited')}
      ${dataTable([
        ['Currency', deposit.currency],
        ['Transaction reference', deposit.payment_reference, true],
        ['Status', '✓ Approved'],
      ])}
      ${notice('Funds are now in your available balance and ready to invest.', 'success')}
      ${cta('Invest now', `${SITE_URL}/invest`)}
    `)}
  `, `${fmt(deposit.amount)} credited to your Wertchain account.`)
}

// ── 4. Deposit Rejected ───────────────────────────────────────────────────

export function depositRejectedTemplate(
  user: { full_name: string },
  deposit: { amount: number; currency: string; rejection_reason: string }
) {
  return base(`
    ${cardHeader('Deposit could not be verified', 'We were unable to confirm this transaction.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Unfortunately, we could not verify your deposit. No funds have been credited to your account. Details are below.')}
      ${dataTable([
        ['Attempted amount', `${fmt(deposit.amount)} ${deposit.currency}`],
        ['Status', '✗ Rejected'],
      ])}
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#1C0A0A;border:1px solid #7F1D1D;border-radius:10px;margin:16px 0;">
        <tr><td style="padding:16px 20px;">
          <p style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#7F1D1D;margin-bottom:6px;">Reason</p>
          <p style="font-size:14px;color:#F87171;line-height:1.6;">${deposit.rejection_reason}</p>
        </td></tr>
      </table>
      ${notice('If you believe this is an error, contact support with your transaction hash and we\'ll investigate.', 'warning')}
      ${cta('Contact support', `${SITE_URL}/contact`)}
    `)}
  `, `Action required — your deposit of ${fmt(deposit.amount)} was not verified.`)
}

// ── 5. Withdrawal Requested ───────────────────────────────────────────────

export function withdrawalRequestedTemplate(
  user: { full_name: string },
  withdrawal: { amount: number; withdrawal_type: string; created_at: string }
) {
  return base(`
    ${cardHeader('Withdrawal request received', 'Your request is queued for processing.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('We\'ve received your withdrawal request. Our team processes withdrawals within 24 hours on business days. You\'ll receive a confirmation once it\'s sent.')}
      ${amountHero(withdrawal.amount, 'Withdrawal amount')}
      ${dataTable([
        ['Type', withdrawal.withdrawal_type.replace(/_/g, ' ')],
        ['Requested', fmtDate(withdrawal.created_at)],
        ['Processing time', 'Up to 24 hours'],
        ['Status', 'Pending'],
      ])}
      ${notice('To cancel this request, contact support immediately. Once processed, withdrawals cannot be reversed.', 'warning')}
    `)}
  `, `Withdrawal of ${fmt(withdrawal.amount)} is being processed.`)
}

// ── 6. Withdrawal Approved ────────────────────────────────────────────────

export function withdrawalApprovedTemplate(
  user: { full_name: string },
  withdrawal: { amount: number; withdrawal_type: string; tx_hash?: string }
) {
  return base(`
    ${cardHeader('Withdrawal sent', `${fmt(withdrawal.amount)} is on its way.`)}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Your withdrawal has been approved and the transfer has been initiated. Please allow network confirmation time before funds appear in your external wallet.')}
      ${amountHero(withdrawal.amount, 'Amount sent')}
      ${dataTable([
        ['Type', withdrawal.withdrawal_type.replace(/_/g, ' ')],
        ['Status', '✓ Sent'],
        ...(withdrawal.tx_hash ? [['On-chain tx', withdrawal.tx_hash] as [string, string]] : []),
      ])}
      ${notice('If funds do not arrive within 2 hours, contact support with the transaction reference above.', 'info')}
      ${cta('View wallet', `${SITE_URL}/wallet`)}
    `)}
  `, `${fmt(withdrawal.amount)} withdrawal has been sent.`)
}

// ── 7. Withdrawal Rejected ────────────────────────────────────────────────

export function withdrawalRejectedTemplate(
  user: { full_name: string },
  withdrawal: { amount: number; rejection_reason: string }
) {
  return base(`
    ${cardHeader('Withdrawal declined', 'Your funds have been returned to your account.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('Your withdrawal request could not be processed. The full amount has been returned to your available balance — no funds have left your account.')}
      ${dataTable([
        ['Amount returned', fmt(withdrawal.amount), true],
        ['Status', '✗ Declined'],
      ])}
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#1C0A0A;border:1px solid #7F1D1D;border-radius:10px;margin:16px 0;">
        <tr><td style="padding:16px 20px;">
          <p style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#7F1D1D;margin-bottom:6px;">Reason</p>
          <p style="font-size:14px;color:#F87171;line-height:1.6;">${withdrawal.rejection_reason}</p>
        </td></tr>
      </table>
      ${cta('View available balance', `${SITE_URL}/wallet`)}
    `)}
  `, `Your withdrawal of ${fmt(withdrawal.amount)} was declined — funds returned.`)
}

// ── 8. Contract Created ───────────────────────────────────────────────────

export function contractCreatedTemplate(
  user: { full_name: string },
  contract: { plan_tier: string; principal: number; apy: number; term_days: number; matures_at: string }
) {
  const projectedReturn = contract.principal * (1 + (contract.apy / 100) * (contract.term_days / 365))
  return base(`
    ${cardHeader(`${contract.plan_tier} plan activated`, 'Your capital is now earning.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para(`Your investment is live. Capital has been locked into the <strong style="color:#E8B84B;">${contract.plan_tier}</strong> plan and is accruing returns on schedule.`)}
      ${amountHero(contract.principal, 'Capital invested')}
      ${dataTable([
        ['Plan', contract.plan_tier],
        ['APY', `${contract.apy}%`, true],
        ['Term', `${contract.term_days} days`],
        ['Matures', fmtDate(contract.matures_at)],
        ['Projected return', fmt(projectedReturn), true],
      ])}
      ${notice('Returns accrue daily and are credited to your wallet at maturity. Early withdrawal forfeits accrued profit.', 'info')}
      ${cta('Track your investment', `${SITE_URL}/investment-overview`)}
    `)}
  `, `${contract.plan_tier} investment of ${fmt(contract.principal)} is now active.`)
}

// ── 9. Contract Matured ───────────────────────────────────────────────────

export function contractMaturedTemplate(
  user: { full_name: string },
  contract: { plan_tier: string; principal: number; total_return: number; matures_at: string }
) {
  const profit = contract.total_return - contract.principal
  return base(`
    ${cardHeader('Investment matured', 'Your capital and returns are available.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para(`Your <strong style="color:#E8B84B;">${contract.plan_tier}</strong> plan has reached maturity. Your principal and all accrued returns have been released to your available balance.`)}

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#0D1626;border:1px solid #1A2234;border-radius:10px;margin:20px 0;">
        <tr>
          <td style="padding:20px;border-right:1px solid #1A2234;" width="50%" align="center">
            <p class="txt-dim" style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#4B5563;margin-bottom:4px;">Principal</p>
            <p style="font-size:22px;font-weight:700;color:#FFFFFF;font-family:'Courier New',monospace;">${fmt(contract.principal)}</p>
          </td>
          <td style="padding:20px;" width="50%" align="center">
            <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#065F46;margin-bottom:4px;">Profit Earned</p>
            <p style="font-size:22px;font-weight:700;color:#10B981;font-family:'Courier New',monospace;">+${fmt(profit)}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="center" style="padding:16px;border-top:1px solid #1A2234;background-color:#081C14;border-radius:0 0 10px 10px;">
            <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#065F46;margin-bottom:4px;">Total Credited</p>
            <p style="font-size:32px;font-weight:800;color:#4ADE80;font-family:'Courier New',monospace;">${fmt(contract.total_return)}</p>
          </td>
        </tr>
      </table>

      ${notice('All funds are now in your available balance. You can reinvest, withdraw, or leave them earning in a new plan.', 'success')}
      ${cta('Reinvest or withdraw', `${SITE_URL}/dashboard`)}
    `)}
  `, `Your investment matured — ${fmt(contract.total_return)} is in your account.`)
}

// ── 10. Profit Credited ───────────────────────────────────────────────────

export function profitCreditedTemplate(
  user: { full_name: string },
  credit: { amount: number; source_plan: string; period_label: string }
) {
  return base(`
    ${cardHeader('Profit credited', `Returns from your ${credit.source_plan} plan.`)}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para(`Your <strong style="color:#E8B84B;">${credit.source_plan}</strong> plan has credited returns for <strong>${credit.period_label}</strong>.`)}

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:20px 0;">
        <tr>
          <td class="card-inner" align="center" style="background-color:#022C22;border:1px solid #065F46;border-radius:10px;padding:24px;">
            <p style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#065F46;margin-bottom:6px;">Profit credited</p>
            <p style="font-size:36px;font-weight:800;color:#10B981;letter-spacing:-1px;font-family:'Courier New',monospace;">+${fmt(credit.amount)}</p>
            <p style="font-size:12px;color:#6EE7B7;margin-top:4px;">${credit.period_label}</p>
          </td>
        </tr>
      </table>

      ${cta('View portfolio', `${SITE_URL}/investment-overview`)}
    `)}
  `, `+${fmt(credit.amount)} profit credited from your ${credit.source_plan} plan.`)
}

// ── 11. Migration Approved ────────────────────────────────────────────────

export function migrationApprovedTemplate(
  user: { full_name: string },
  migration: { from_tier: string; to_tier: string; capital_amount: number; new_apy: number }
) {
  return base(`
    ${cardHeader(`Plan upgraded to ${migration.to_tier}`, 'Your capital has been migrated.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para(`Your investment plan has been successfully upgraded from <strong>${migration.from_tier}</strong> to <strong style="color:#E8B84B;">${migration.to_tier}</strong>. Your capital is now earning at the new rate.`)}

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#0D1626;border:1px solid #1A2234;border-radius:10px;margin:20px 0;">
        <tr>
          <td style="padding:16px 20px;border-right:1px solid #1A2234;" width="50%" align="center">
            <p class="txt-dim" style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#4B5563;margin-bottom:4px;">Previous plan</p>
            <p style="font-size:16px;font-weight:600;color:#9CA3AF;">${migration.from_tier}</p>
          </td>
          <td style="padding:16px 20px;" width="50%" align="center">
            <p style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#78350F;margin-bottom:4px;">New plan</p>
            <p style="font-size:16px;font-weight:700;color:#E8B84B;">${migration.to_tier}</p>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding:16px 20px;border-top:1px solid #1A2234;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td>
                  <p class="txt-dim" style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#4B5563;margin-bottom:2px;">Capital migrated</p>
                  <p style="font-size:18px;font-weight:700;color:#FFFFFF;font-family:'Courier New',monospace;">${fmt(migration.capital_amount)}</p>
                </td>
                <td align="right">
                  <p class="txt-dim" style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#4B5563;margin-bottom:2px;">New APY</p>
                  <p style="font-size:18px;font-weight:700;color:#E8B84B;font-family:'Courier New',monospace;">${migration.new_apy}%</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      ${notice('Your new plan term starts from today. Returns accrue at the upgraded rate immediately.', 'success')}
      ${cta('View updated portfolio', `${SITE_URL}/investment-overview`)}
    `)}
  `, `Plan upgraded to ${migration.to_tier} — now earning at ${migration.new_apy}% APY.`)
}

// ── 12. Security Alert ────────────────────────────────────────────────────

export function securityAlertTemplate(
  user: { full_name: string },
  alert: { event: string; ip?: string; location?: string; timestamp: string }
) {
  return base(`
    ${cardHeader('Security notice', 'A new sign-in was detected on your account.')}
    ${cardBody(`
      ${greeting(user.full_name)}
      ${para('We detected a new sign-in to your Wertchain account. If this was you, no action is required.')}

      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" class="card-inner" style="background-color:#1C1400;border:1px solid #78350F;border-radius:10px;margin:20px 0;">
        <tr><td style="padding:16px 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${alert.event ? dataRow('Event', alert.event) : ''}
            ${alert.ip    ? dataRow('IP address', alert.ip) : ''}
            ${alert.location ? dataRow('Location', alert.location) : ''}
            ${dataRow('Time', fmtDate(alert.timestamp))}
          </table>
        </td></tr>
      </table>

      ${notice('If you did not sign in, secure your account immediately by changing your password and contacting support.', 'warning')}

      <table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:20px;">
        <tr>
          <td style="background-color:#7F1D1D;border-radius:8px;">
            <a href="${SITE_URL}/contact" style="display:inline-block;padding:12px 24px;font-size:14px;font-weight:700;color:#FECACA;text-decoration:none;">Secure my account</a>
          </td>
        </tr>
      </table>
    `)}
  `, 'Security alert — new sign-in detected on your Wertchain account.')
}
