"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatRupiah } from "@/lib/format";

type ChartData = { name: string; income: number; expenses: number }[];

const formatCompactNumber = (number: number) => {
  if (number >= 1000000000) {
    return `Rp ${(number / 1000000000).toFixed(1)} M`;
  }
  if (number >= 1000000) {
    return `Rp ${(number / 1000000).toFixed(1)} Jt`;
  }
  if (number >= 1000) {
    return `Rp ${(number / 1000).toFixed(0)} Rb`;
  }
  return `Rp ${number}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 shadow-2xl rounded-xl p-4 min-w-[220px]">
        <p className="text-sm font-bold mb-3 pb-2 border-b border-border/50 text-foreground">{label}</p>
        <div className="space-y-3">
          {payload.map((entry: any, index: number) => {
            // Tentukan warna solid berdasarkan id gradient
            const solidColor = entry.name === 'Pemasukan' ? '#10b981' : '#ef4444';
            return (
              <div key={index} className="flex justify-between items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: solidColor }} />
                  <span className="text-muted-foreground font-medium">{entry.name}</span>
                </div>
                <span className="font-black tracking-tight" style={{ color: solidColor }}>
                  {formatRupiah(entry.value)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export function DashboardChart({ data }: { data: ChartData }) {
  if (!data || data.length === 0) {
    return <div className="flex h-full items-center justify-center text-muted-foreground text-sm">Belum ada data transaksi yang cukup.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 15, right: 15, left: 25, bottom: 5 }}>
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0.9} />
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
            <stop offset="100%" stopColor="#dc2626" stopOpacity={0.9} />
          </linearGradient>
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.4} />
        
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 500 }} 
          dy={15} 
        />
        
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12, fontWeight: 500 }} 
          tickFormatter={formatCompactNumber}
          width={80}
        />
        
        <Tooltip
          cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
          content={<CustomTooltip />}
        />
        
        <Legend 
          iconType="circle" 
          wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: 500 }} 
        />
        
        <Bar 
          dataKey="income" 
          fill="url(#incomeGrad)" 
          radius={[6, 6, 0, 0]} 
          name="Pemasukan" 
          maxBarSize={45} 
          animationDuration={1500}
        />
        <Bar 
          dataKey="expenses" 
          fill="url(#expenseGrad)" 
          radius={[6, 6, 0, 0]} 
          name="Pengeluaran" 
          maxBarSize={45} 
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
