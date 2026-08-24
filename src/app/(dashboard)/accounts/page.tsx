import { CreditCard, Landmark, Wallet, Plus, MoreVertical, ArrowUpRight } from "lucide-react";
import { db } from "@/db";
import { users, accounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddAccountModal } from "@/components/modals/AddAccountModal";

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

  const getIconForType = (type: string) => {
    switch (type) {
      case "Checking": return <Landmark className="h-6 w-6" />;
      case "Savings": return <Wallet className="h-6 w-6" />;
      case "Credit Card": return <CreditCard className="h-6 w-6" />;
      default: return <Landmark className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your bank accounts and credit cards.
          </p>
        </div>
        <AddAccountModal />
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Net Worth</h3>
          <div className="text-3xl font-bold">${netWorth.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
          <p className="text-xs text-success mt-2 flex items-center gap-1 font-medium">
            <ArrowUpRight className="h-3 w-3" />
            +1.2% this month
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Assets</h3>
          <div className="text-3xl font-bold text-success">${totalAssets.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Liabilities</h3>
          <div className="text-3xl font-bold text-destructive">${totalLiabilities.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
        </div>
      </div>

      <h2 className="text-xl font-semibold tracking-tight mt-8 mb-4">Your Connected Accounts</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {accountsData.map((account) => (
          <div key={account.id} className="rounded-xl border bg-card p-0 shadow-sm overflow-hidden flex flex-col group">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${account.color || 'bg-muted'}`}>
                    {getIconForType(account.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{account.name}</h3>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <div className={`text-2xl font-bold ${Number(account.balance) < 0 ? 'text-destructive' : 'text-foreground'}`}>
                  {Number(account.balance) < 0 ? '-' : ''}${Math.abs(Number(account.balance)).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </div>
              </div>
            </div>
            <div className="bg-muted/30 px-6 py-3 border-t text-xs text-muted-foreground flex justify-between items-center">
              <span>Updated Just now</span>
              <button className="text-primary hover:underline font-medium">Sync Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
