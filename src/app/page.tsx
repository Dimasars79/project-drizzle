"use client";

import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
];

const recentTransactions = [
  { id: 1, name: "Grocery Store", amount: -120.5, date: "2023-10-24", category: "Food" },
  { id: 2, name: "Salary", amount: 4500.0, date: "2023-10-23", category: "Income" },
  { id: 3, name: "Electric Bill", amount: -85.2, date: "2023-10-21", category: "Utilities" },
  { id: 4, name: "Coffee Shop", amount: -12.0, date: "2023-10-20", category: "Food" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your finances.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card title="Total Balance" amount="$12,450.80" icon={<DollarSign />} trend="+2.5% from last month" trendUp />
        <Card title="Total Income" amount="$8,450.00" icon={<ArrowUpIcon className="text-success" />} trend="+12% from last month" trendUp />
        <Card title="Total Expenses" amount="$3,240.50" icon={<ArrowDownIcon className="text-destructive" />} trend="-4% from last month" trendUp={false} />
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Financial Summary</h3>
            <p className="text-sm text-muted-foreground">Income vs Expenses over time</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  cursor={{ fill: 'var(--muted)' }}
                  contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="var(--destructive)" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <p className="text-sm text-muted-foreground">Your latest financial activities</p>
            </div>
          </div>
          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">{tx.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tx.category} • {tx.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${tx.amount > 0 ? 'text-success' : ''}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
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
