import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign } from "lucide-react";
import { DashboardChart } from "@/components/DashboardChart";
import { db } from "@/db";
import { users, accounts, transactions, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddTransactionModal } from "@/components/modals/AddTransactionModal";

export default async function Dashboard() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const currentUser = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];

  if (!currentUser) {
    return <div>User tidak ditemukan.</div>;
  }

  // Ambil saldo total (sum dari balance semua akun)
  const allAccounts = await db.select().from(accounts).where(eq(accounts.userId, currentUser.id));
  const totalBalance = allAccounts.reduce((acc, account) => acc + Number(account.balance), 0);

  // Ambil data untuk modal dropdown
  const allAccountsRaw = allAccounts.map(a => ({ id: a.id, name: a.name }));
  const allCategoriesRaw = await db.select({ id: categories.id, name: categories.name }).from(categories).where(eq(categories.userId, currentUser.id));

  // Ambil transaksi bulan ini
  const allTransactions = await db.select({
    id: transactions.id,
    amount: transactions.amount,
    description: transactions.description,
    date: transactions.date,
    categoryName: categories.name,
  })
  .from(transactions)
  .leftJoin(categories, eq(transactions.categoryId, categories.id))
  .where(eq(transactions.userId, currentUser.id))
  .orderBy(desc(transactions.date))
  .limit(10);

  let totalIncome = 0;
  let totalExpenses = 0;
  
  allTransactions.forEach(tx => {
    const amt = Number(tx.amount);
    if (amt > 0) totalIncome += amt;
    else totalExpenses += Math.abs(amt);
  });

  // Siapkan data chart sederhana (berdasarkan bulan, disederhanakan untuk contoh ini)
  const chartData = [
    { name: "Prev", income: 0, expenses: 0 },
    { name: "Current", income: totalIncome, expenses: totalExpenses },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang kembali, {currentUser.name}! Berikut ikhtisar keuangan Anda.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total Balance" amount={`$${totalBalance.toFixed(2)}`} icon={<DollarSign />} trend="+0.0% from last month" trendUp />
        <Card title="Total Income" amount={`$${totalIncome.toFixed(2)}`} icon={<ArrowUpIcon className="text-success" />} trend="Current Month" trendUp />
        <Card title="Total Expenses" amount={`$${totalExpenses.toFixed(2)}`} icon={<ArrowDownIcon className="text-destructive" />} trend="Current Month" trendUp={false} />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Financial Summary</h3>
            <p className="text-sm text-muted-foreground">Income vs Expenses</p>
          </div>
          <div className="h-[300px] w-full">
            <DashboardChart data={chartData} />
          </div>
        </div>

        <div className="lg:col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <p className="text-sm text-muted-foreground">Aktivitas keuangan terbaru Anda</p>
            </div>
            <AddTransactionModal accounts={allAccountsRaw} categories={allCategoriesRaw} />
          </div>
          <div className="space-y-4">
            {allTransactions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Belum ada transaksi.</p>
            ) : (
              allTransactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{tx.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{tx.categoryName || "Uncategorized"} • {tx.date.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${Number(tx.amount) > 0 ? 'text-success' : ''}`}>
                    {Number(tx.amount) > 0 ? '+' : ''}{Number(tx.amount) < 0 ? '-' : ''}${Math.abs(Number(tx.amount)).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, amount, icon, trend, trendUp }: { title: string, amount: string, icon: React.ReactNode, trend: string, trendUp: boolean }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium tracking-tight text-muted-foreground">{title}</h3>
        <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold">{amount}</div>
        <p className={`text-xs mt-1 font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}
