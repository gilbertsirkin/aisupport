import { NextResponse } from "next/server";
import { adminClient } from "@/lib/ledger";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  // Auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: adminRow } = await adminClient
    .from("wc_admins").select("id, is_active").eq("user_id", user.id).single();
  if (!adminRow?.is_active) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const [
    { data: wallets },
    { count: pendingDeposits },
    { count: pendingWithdrawals },
    { count: pendingMigrations },
    { count: activeContracts },
    { count: totalUsers },
    { data: deposits },
    { data: withdrawals },
    { data: migrations },
    { data: users },
  ] = await Promise.all([
    adminClient.from("wc_wallet_balances").select("locked_capital, available_balance"),
    adminClient.from("wc_deposits").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    adminClient.from("wc_withdrawals").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    adminClient.from("wc_migrations").select("*", { count: "exact", head: true }).eq("status", "PENDING"),
    adminClient.from("wc_contracts").select("*", { count: "exact", head: true }).eq("state", "ACTIVE"),
    adminClient.from("wc_users").select("*", { count: "exact", head: true }),
    // Fixed: include wc_users join so full_name/email render correctly
    adminClient.from("wc_deposits")
      .select("*, wc_users(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(100),
    adminClient.from("wc_withdrawals")
      .select("*, wc_users(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(100),
    adminClient.from("wc_migrations")
      .select("*, wc_users(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(100),
    adminClient.from("wc_users")
      .select("*, wc_wallet_balances(available_balance, locked_capital)")
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  const totalLockedCapital    = (wallets ?? []).reduce((s, w) => s + (w.locked_capital    as number), 0);
  const totalAvailableBalance = (wallets ?? []).reduce((s, w) => s + (w.available_balance as number), 0);

  return NextResponse.json({
    stats: {
      totalLockedCapital,
      totalAvailableBalance,
      pendingDeposits:    pendingDeposits    ?? 0,
      pendingWithdrawals: pendingWithdrawals ?? 0,
      pendingMigrations:  pendingMigrations  ?? 0,
      activeContracts:    activeContracts    ?? 0,
      totalUsers:         totalUsers         ?? 0,
    },
    deposits:    deposits    ?? [],
    withdrawals: withdrawals ?? [],
    migrations:  migrations  ?? [],
    users:       users       ?? [],
  });
}
