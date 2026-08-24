"use client";

import { CreditCard, Landmark, Wallet, Plus, MoreVertical, ArrowUpRight, ArrowDownRight } from "lucide-react";

const accountsData = [
  { id: 1, name: "Chase Checking", type: "Checking", balance: 4250.80, lastUpdated: "Just now", icon: <Landmark className="h-6 w-6" />, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
  { id: 2, name: "Ally Savings", type: "Savings", balance: 12500.00, lastUpdated: "2 hours ago", icon: <Wallet className="h-6 w-6" />, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { id: 3, name: "Amex Platinum", type: "Credit Card", balance: -845.30, limit: 15000, lastUpdated: "5 hours ago", icon: <CreditCard className="h-6 w-6" />, color: "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400" },
  { id: 4, name: "Discover Student", type: "Credit Card", balance: -120.50, limit: 2000, lastUpdated: "1 day ago", icon: <CreditCard className="h-6 w-6" />, color: "text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400" },
];

export default function Accounts() {
  const totalAssets = accountsData.filter(a => a.balance > 0).reduce((acc, curr) => acc + curr.balance, 0);
  const totalLiabilities = accountsData.filter(a => a.balance < 0).reduce((acc, curr) => acc + Math.abs(curr.balance), 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your bank accounts and credit cards.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          Connect Account
        </button>
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
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${account.color}`}>
                    {account.icon}
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
                <div className={`text-2xl font-bold ${account.balance < 0 ? 'text-destructive' : 'text-foreground'}`}>
                  {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2})}
                </div>
                {account.limit && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Limit: ${account.limit.toLocaleString()} • Available: ${(account.limit + account.balance).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-muted/30 px-6 py-3 border-t text-xs text-muted-foreground flex justify-between items-center">
              <span>Updated {account.lastUpdated}</span>
              <button className="text-primary hover:underline font-medium">Sync Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
