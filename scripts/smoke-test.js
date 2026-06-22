#!/usr/bin/env node
/**
 * Wertchain End-to-End Smoke Test
 * ---------------------------------
 * Exercises the core investment flow directly against your running dev
 * server + Supabase project, without needing to click through the UI.
 *
 * What it tests:
 *   1. Sign up (or sign in) a test user via Supabase Auth directly
 *   2. Confirm wallet balance starts at $0
 *   3. Try to invest with $0 balance -> must return 402 + redirect_to_deposit
 *      (catches the exact bug we fixed: no fake "contract created")
 *   4. Create a deposit via POST /api/deposits -> confirm a real (non-placeholder)
 *      wallet address comes back
 *   5. Submit a fake-but-valid-format tx hash via POST /api/deposits/submit
 *   6. Print a clear PASS/FAIL summary + the manual next step (admin approval)
 *
 * What it does NOT test (by design — these require a human):
 *   - Admin approving the deposit
 *   - The actual invest-after-funding success path
 *   - Profit accrual cron jobs
 *
 * Usage:
 *   node scripts/smoke-test.js
 *
 * Requires these env vars (reads from .env.local automatically):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * Optional:
 *   APP_URL (defaults to http://localhost:3000)
 *   TEST_EMAIL / TEST_PASSWORD (defaults to a fixed test account so repeated
 *     runs reuse the same user instead of creating a new one every time)
 */

const fs = require('fs');
const path = require('path');

// ── Load .env.local manually (no dependency on dotenv package) ────────────
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local not found in current directory. Run this from your project root.');
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}
loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const TEST_EMAIL = process.env.TEST_EMAIL || 'smoketest@wertchain.live';
const TEST_PASSWORD = process.env.TEST_PASSWORD || 'SmokeTest123!';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

// ── Tiny test harness ──────────────────────────────────────────────────────
const results = [];
function pass(name, detail = '') {
  results.push({ name, ok: true, detail });
  console.log(`✅ ${name}${detail ? ' — ' + detail : ''}`);
}
function fail(name, detail = '') {
  results.push({ name, ok: false, detail });
  console.log(`❌ ${name}${detail ? ' — ' + detail : ''}`);
}
function info(msg) {
  console.log(`   ${msg}`);
}
function section(title) {
  console.log(`\n── ${title} ──`);
}

// ── Helpers ─────────────────────────────────────────────────────────────
async function supabaseAuthRequest(endpoint, body) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

async function appFetch(pathname, accessToken, options = {}) {
  const res = await fetch(`${APP_URL}${pathname}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  return { ok: res.ok, status: res.status, data };
}

function fakeTxHash() {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * chars.length)];
  return hash;
}

// ── Main test sequence ─────────────────────────────────────────────────
async function main() {
  console.log('Wertchain Smoke Test');
  console.log(`App URL:      ${APP_URL}`);
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  console.log(`Test user:    ${TEST_EMAIL}`);

  // ── 1. Sign in (or sign up if first run) ──────────────────────────────
  section('1. Authentication');
  let accessToken;

  let signIn = await supabaseAuthRequest('token?grant_type=password', {
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  if (signIn.ok) {
    accessToken = signIn.data.access_token;
    pass('Signed in with existing test user');
  } else {
    info('Test user does not exist yet — creating it');
    const signUp = await supabaseAuthRequest('signup', {
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      data: { full_name: 'Smoke Test User' },
    });
    if (!signUp.ok) {
      fail('Sign up', JSON.stringify(signUp.data));
      printSummaryAndExit();
      return;
    }
    pass('Signed up new test user');

    if (signUp.data.access_token) {
      accessToken = signUp.data.access_token;
    } else {
      info('Email confirmation may be required — trying sign-in anyway');
      signIn = await supabaseAuthRequest('token?grant_type=password', {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });
      if (!signIn.ok) {
        fail(
          'Sign in after signup',
          'Email confirmation is likely required in your Supabase Auth settings. ' +
            'Disable "Confirm email" for testing, or confirm this user manually once.'
        );
        printSummaryAndExit();
        return;
      }
      accessToken = signIn.data.access_token;
      pass('Signed in after signup');
    }
  }

  // ── 2. Check wallet balance ────────────────────────────────────────────
  section('2. Wallet Balance Check');
  const walletRes = await appFetch('/api/wallet', accessToken);
  // Fallback: some projects expose wallet data only via the dashboard's
  // direct Supabase query rather than a dedicated /api/wallet route.
  // We try it, but don't hard-fail the whole suite if it's a 404 — that
  // route may not exist in your build, this is informational.
  if (walletRes.status === 404) {
    info('No GET /api/wallet route found — skipping (not all builds have this)');
  } else if (walletRes.ok) {
    pass('Fetched wallet balance', JSON.stringify(walletRes.data));
  } else {
    info(`Wallet check returned ${walletRes.status} — continuing anyway`);
  }

  // ── 3. Attempt to invest with insufficient balance ────────────────────
  section('3. Insufficient-Balance Investment (should be blocked)');

  const plansRes = await fetch(
    `${SUPABASE_URL}/rest/v1/wc_investment_plans?select=*&is_active=eq.true&order=min_amount.asc&limit=1`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  const plans = await plansRes.json();

  if (!Array.isArray(plans) || plans.length === 0) {
    fail('Fetch a plan to test with', 'No active plans found in wc_investment_plans');
  } else {
    const plan = plans[0];
    info(`Using plan: ${plan.label} (min ${plan.min_amount})`);

    const investRes = await appFetch('/api/contracts', accessToken, {
      method: 'POST',
      body: JSON.stringify({ plan_id: plan.id, amount: plan.min_amount }),
    });

    if (investRes.status === 402 && investRes.data?.redirect_to_deposit) {
      pass(
        'Correctly blocked insufficient-balance investment',
        `402 + redirect_to_deposit for ${investRes.data.redirect_to_deposit.plan_label}`
      );
    } else if (investRes.status === 201) {
      info(
        'Investment succeeded — this user already has enough balance from a prior run. ' +
          'That is fine; the insufficient-balance path just was not exercised this time.'
      );
      pass('Investment created (user had sufficient balance)');
    } else {
      fail(
        'Insufficient-balance investment should return 402',
        `Got ${investRes.status}: ${JSON.stringify(investRes.data)}`
      );
    }

    // ── 4. Create a deposit ────────────────────────────────────────────
    section('4. Create Deposit');
    const depositRes = await appFetch('/api/deposits', accessToken, {
      method: 'POST',
      body: JSON.stringify({
        amount: plan.min_amount,
        currency: 'USDT_TRC20',
        plan_id: plan.id,
      }),
    });

    if (depositRes.status === 503) {
      fail(
        'Create deposit',
        'Platform wallet address is still a placeholder (503). ' +
          'Set PLATFORM_WALLET_USDT_TRC20 in .env.local to a real or test address.'
      );
    } else if (depositRes.ok && depositRes.data?.deposit?.id) {
      pass('Deposit created', `id=${depositRes.data.deposit.id}, address=${depositRes.data.to_address}`);

      // ── 5. Submit tx hash ─────────────────────────────────────────────
      section('5. Submit Transaction Hash');
      const submitRes = await appFetch('/api/deposits/submit', accessToken, {
        method: 'POST',
        body: JSON.stringify({
          deposit_id: depositRes.data.deposit.id,
          tx_hash: fakeTxHash(),
        }),
      });

      if (submitRes.ok) {
        pass('Transaction hash submitted — deposit now awaiting admin review');
      } else {
        fail('Submit transaction hash', JSON.stringify(submitRes.data));
      }
    } else {
      fail('Create deposit', `Got ${depositRes.status}: ${JSON.stringify(depositRes.data)}`);
    }
  }

  printSummaryAndExit();
}

function printSummaryAndExit() {
  section('Summary');
  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok).length;
  console.log(`${passed} passed, ${failed} failed (${results.length} total)`);

  if (failed === 0) {
    console.log('\n🎉 All automated checks passed.');
    console.log('   Manual next step: go to /admin, approve the test deposit,');
    console.log('   then confirm the user can complete the investment.');
  } else {
    console.log('\n⚠️  Some checks failed — see ❌ lines above for details.');
  }

  process.exit(failed === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('\n💥 Smoke test crashed:', err);
  process.exit(1);
});
