"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "@/lib/format";

type ChartData = { name: string; income: number; expenses: number }[];

export function DashboardChart({ data }: { data: ChartData }) {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-muted-foreground text-sm">Belum ada data transaksi yang cukup.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(value) => formatRupiah(value)} />
        <Tooltip
          cursor={{ fill: 'var(--muted)' }}
          contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="income" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Income" />
        <Bar dataKey="expenses" fill="var(--destructive)" radius={[4, 4, 0, 0]} name="Expenses" />
      </BarChart>
    </ResponsiveContainer>
  );
}
