'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

interface Plan {
  id: string
  tier: string
  label: string
  min_amount: number
  max_amount: number | null
  duration_days: number
  profit_rate: number
  auto_reinvest_default: boolean
  capital_release_delay_days: number
  is_active: boolean
}

interface Wallet {
  available_balance: number
}

const TIER_STYLES: Record<string, { border: string; glow: string; badge: string }> = {
  WERTCHAIN_START:        { border: 'border-blue-500/40',    glow: 'hover:border-blue-400/60',    badge: 'bg-blue-500/20 text-blue-300' },
  WERTCHAIN_GROWTH:       { border: 'border-emerald-500/40', glow: 'hover:border-emerald-400/60', badge: 'bg-emerald-500/20 text-emerald-300' },
  WERTCHAIN_PROFESSIONAL: { border: 'border-purple-500/40',  glow: 'hover:border-purple-400/60',  badge: 'bg-purple-500/20 text-purple-300' },
  WERTCHAIN_ELITE:        { border: 'border-amber-500/40',   glow: 'hover:border-amber-400/60',   badge: 'bg-amber-500/20 text-amber-300' },
}

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n)

export default function InvestPage() {
  const supabase = createClient()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Plan | null>(null)
  const [amount, setAmount] = useState('')
  const [autoReinvest, setAutoReinvest] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const [plansRes, walletRes] = await Promise.all([
      supabase.from('wc_investment_plans').select('*').eq('is_active', true).order('min_amount'),
      user
        ? supabase.from('wc_wallet_balances').select('available_balance').eq('user_id', user.id).single()
        : Promise.resolve({ data: null }),
    ])
    setPlans((plansRes.data as Plan[]) ?? [])
    setWallet(walletRes.data as Wallet | null)
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  function selectPlan(plan: Plan) {
    setSelected(plan)
    setAmount(String(plan.min_amount))
    setAutoReinvest(plan.auto_reinvest_default)
    setError('')
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function submit() {
    if (!selected) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contracts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: selected.id, amount, auto_reinvest: autoReinvest }),
      })
      const data = await res.json()

      if (res.status === 402 && data.redirect_to_deposit) {
        // Insufficient balance — no contract was created. Send the user
        // to a plan-aware deposit page instead of showing a generic error.
        const d = data.redirect_to_deposit
        const qs = new URLSearchParams({
          plan_id: d.plan_id,
          plan_label: d.plan_label,
          amount_needed: d.amount_needed,
          current_balance: d.current_balance,
          shortfall: d.shortfall,
        })
        router.push(`/deposit?${qs.toString()}`)
        return
      }

      if (!res.ok) throw new Error(data.error)
      setResult(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <div className="text-zinc-600 text-sm">Loading plans…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">

      <nav className="border-b border-[#1E2A3B] sticky top-0 z-40 bg-[#0A0F1E]/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center">
              <span className="text-black text-xs font-black">W</span>
            </div>
            <span className="font-semibold">Wertchain</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            {wallet && <span>Available: <span className="text-amber-400 font-mono">{fmt(wallet.available_balance)}</span></span>}
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <div className="h-4 w-px bg-[#1E2A3B]" />
            <LogoutButton />
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {selected && !result && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-white font-semibold">{selected.label}</h2>
                <p className="text-xs text-zinc-500">{selected.duration_days} days · {(selected.profit_rate * 100).toFixed(0)}% profit</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white text-xs transition-colors">← Change plan</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-widest block mb-1.5">Amount (USD)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  min={selected.min_amount}
                  max={selected.max_amount ?? undefined}
                  step="0.01"
                  className="w-full bg-[#0A0F1E] border border-[#1E2A3B] rounded-lg px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-amber-500/60 transition-colors"
                  placeholder={`Min ${fmt(selected.min_amount)}`}
                />
                <p className="text-xs text-zinc-600 mt-1">
                  Min {fmt(selected.min_amount)} {selected.max_amount ? `· Max ${fmt(selected.max_amount)}` : '· No maximum'}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-[#1E2A3B] bg-[#111827]">
                <div>
                  <p className="text-sm text-white">Auto-reinvest</p>
                  <p className="text-xs text-zinc-500">Capital rolls into a new cycle at maturity</p>
                </div>
                <button
                  onClick={() => setAutoReinvest(!autoReinvest)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${autoReinvest ? 'bg-amber-500' : 'bg-zinc-700'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoReinvest ? 'translate-x-5' : ''}`} />
                </button>
              </div>

              {amount && Number(amount) >= selected.min_amount && (
                <div className="p-3 rounded-lg border border-[#1E2A3B] bg-[#111827] grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-zinc-500">Daily profit</p>
                    <p className="text-sm font-mono text-emerald-400">
                      +{fmt((Number(amount) * selected.profit_rate) / selected.duration_days)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Total profit</p>
                    <p className="text-sm font-mono text-emerald-400">
                      +{fmt(Number(amount) * selected.profit_rate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Matures in</p>
                    <p className="text-sm font-mono text-white">{selected.duration_days} days</p>
                  </div>
                </div>
              )}

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                onClick={submit}
                disabled={submitting || !amount || Number(amount) < selected.min_amount}
                className="w-full py-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-semibold transition-colors"
              >
                {submitting ? 'Creating contract…' : `Invest ${amount ? fmt(Number(amount)) : ''}`}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 text-lg">✓</span>
              <h2 className="text-white font-semibold">Investment is now active</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-[#1E2A3B] py-2">
                <span className="text-zinc-500">Plan</span>
                <span className="text-white font-mono">{result.contract?.plan_name}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E2A3B] py-2">
                <span className="text-zinc-500">Principal</span>
                <span className="text-white font-mono">${Number(result.contract?.principal_amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E2A3B] py-2">
                <span className="text-zinc-500">Daily profit</span>
                <span className="text-emerald-400 font-mono">+${Number(result.contract?.daily_profit_amount).toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-[#1E2A3B] py-2">
                <span className="text-zinc-500">Expected total profit</span>
                <span className="text-emerald-400 font-mono">+${Number(result.contract?.expected_profit).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-zinc-500">Matures in</span>
                <span className="text-white font-mono">{result.contract?.duration_days} days</span>
              </div>
            </div>
            <p className="text-xs text-zinc-500">{result.message}</p>
            <div className="flex gap-3">
              <Link href="/dashboard" className="flex-1 py-2.5 rounded-lg bg-[#111827] border border-[#1E2A3B] text-white text-sm font-medium text-center hover:border-zinc-600 transition-colors">
                Go to Dashboard
              </Link>
              <button
                onClick={() => { setResult(null); setSelected(null) }}
                className="flex-1 py-2.5 rounded-lg border border-amber-500/40 text-amber-400 text-sm font-medium hover:bg-amber-500/10 transition-colors"
              >
                Invest Again
              </button>
            </div>

          </div>
        )}

        {!result && (
          <div>
            <h1 className="text-xs text-zinc-500 uppercase tracking-widest mb-4">
              {selected ? 'Other Plans' : 'Choose an Investment Plan'}
            </h1>
            <div className="grid sm:grid-cols-2 gap-4">
              {plans.filter(p => p.id !== selected?.id).map(plan => {
                const style = TIER_STYLES[plan.tier] ?? TIER_STYLES.WERTCHAIN_START
                return (
                  <div
                    key={plan.id}
                    onClick={() => selectPlan(plan)}
                    className={`rounded-xl border ${style.border} ${style.glow} bg-[#111827] p-5 cursor-pointer transition-all hover:bg-[#131c35]`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className={`text-xs px-2 py-0.5 rounded font-mono ${style.badge}`}>{plan.tier.replace('WERTCHAIN_', '')}</span>
                        <h3 className="text-white font-semibold mt-2">{plan.label}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-white">{(plan.profit_rate * 100).toFixed(0)}%</p>
                        <p className="text-xs text-zinc-500">profit</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-zinc-500 border-t border-[#1E2A3B] pt-3">
                      <div>
                        <p className="text-zinc-600">Min</p>
                        <p className="text-white font-mono">{fmt(plan.min_amount)}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">Max</p>
                        <p className="text-white font-mono">{plan.max_amount ? fmt(plan.max_amount) : '∞'}</p>
                      </div>
                      <div>
                        <p className="text-zinc-600">Duration</p>
                        <p className="text-white font-mono">{plan.duration_days}d</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
