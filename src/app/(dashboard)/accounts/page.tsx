import { CreditCard, Landmark, Wallet, Plus, MoreVertical, MoreHorizontal, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";
import { db } from "@/db";
import { users, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddAccountModal } from "@/components/modals/AddAccountModal";
import { formatRupiah } from "@/lib/format";

export default async function Accounts() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const currentUser = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];

  if (!currentUser) {
    return <div>User tidak ditemukan.</div>;
  }

  const accountsData = await db.select().from(accounts).where(eq(accounts.userId, currentUser.id));

  const totalAssets = accountsData.filter(a => Number(a.balance) > 0).reduce((acc, curr) => acc + Number(curr.balance), 0);
  const totalLiabilities = accountsData.filter(a => Number(a.balance) < 0).reduce((acc, curr) => acc + Math.abs(Number(curr.balance)), 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your bank accounts, credit cards, and cash wallets.
          </p>
        </div>
        <AddAccountModal />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Net Worth</h3>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-3xl font-bold">{formatRupiah(netWorth)}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Assets</h3>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </div>
          <div className="text-3xl font-bold text-success">{formatRupiah(totalAssets)}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Liabilities</h3>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
          <div className="text-3xl font-bold text-destructive">{formatRupiah(totalLiabilities)}</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accountsData.length === 0 ? (
          <div className="col-span-full rounded-xl border bg-card shadow-sm p-12 text-center text-muted-foreground">
            <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Belum ada akun</p>
            <p className="text-sm">Tambahkan akun bank atau dompet pertama Anda.</p>
          </div>
        ) : (
          accountsData.map((account) => {
            const isNegative = Number(account.balance) < 0;
            return (
              <div key={account.id} className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${account.color || 'bg-muted'}`}>
                    {account.type === 'Credit Card' ? <CreditCard className="h-6 w-6 text-white" /> :
                     account.type === 'Savings' ? <PiggyBank className="h-6 w-6 text-white" /> :
                     <Landmark className="h-6 w-6 text-white" />}
                  </div>
                  <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-semibold text-lg">{account.name}</h3>
                  <p className="text-sm text-muted-foreground">{account.type}</p>
                </div>
                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Balance</span>
                  <div className={`text-2xl font-bold ${isNegative ? 'text-destructive' : 'text-foreground'}`}>
                    {isNegative ? '-' : ''}{formatRupiah(Math.abs(Number(account.balance)))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
