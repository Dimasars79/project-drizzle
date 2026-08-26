import React, { forwardRef } from 'react';
import { formatRupiah } from '@/lib/format';

export type Transaction = {
  id: string | number;
  date: Date;
  description: string;
  categoryName?: string | null;
  accountName?: string | null;
  amount: string | number;
};

type TransactionStatementProps = {
  userName: string;
  userEmail: string;
  transactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  startDate?: Date;
  endDate?: Date;
};

export const TransactionStatement = forwardRef<HTMLDivElement, TransactionStatementProps>(
  ({ userName, userEmail, transactions, totalIncome, totalExpenses, netBalance, startDate, endDate }, ref) => {
    
    const today = new Date();
    const periodStart = startDate ? startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Awal';
    const periodEnd = endDate ? endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const printDate = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
      <div 
        ref={ref}
        className="bg-[#ffffff] text-[#0f172a] w-[794px] min-h-[1123px] relative mx-auto pdf-container flex flex-col" 
        style={{ fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .pdf-container * {
            box-sizing: border-box;
            border-color: #e2e8f0;
            outline-color: transparent;
            box-shadow: none;
            --tw-border-opacity: 1;
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-ring-color: transparent;
          }
        `}} />

        {/* Premium Dark Header */}
        <div className="bg-[#0f172a] text-[#ffffff] px-10 py-12 rounded-b-[2rem] mb-8 mx-2 mt-2" style={{ boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                <h1 className="text-3xl font-black tracking-tighter">MONEY<span className="text-[#6366f1]">APP</span></h1>
              </div>
              <p className="text-[#94a3b8] text-sm font-medium tracking-wide">SMART FINANCIAL MANAGEMENT</p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-[#f8fafc] uppercase tracking-widest">Statement</h2>
              <p className="text-sm text-[#94a3b8] mt-1 font-mono">REF: STM-{Math.floor(Math.random() * 1000000)}</p>
            </div>
          </div>
        </div>

        <div className="px-10 flex-1">
          {/* Account & Period Info */}
          <div className="flex justify-between items-center mb-8 border-b-2 border-[#f1f5f9] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] font-bold text-xl">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Account Holder</p>
                <p className="font-bold text-[#0f172a] text-lg leading-tight">{userName}</p>
                <p className="text-[#64748b] text-sm">{userEmail}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest mb-1">Statement Period</p>
              <p className="font-bold text-[#0f172a] text-md">{periodStart} - {periodEnd}</p>
              <p className="text-[#64748b] text-xs mt-1">Generated: {printDate}</p>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {/* Income Card */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e2e8f0]" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-[#dcfce7] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
                </div>
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Income</span>
              </div>
              <p className="text-2xl font-black text-[#16a34a] pb-1 leading-normal break-all">{formatRupiah(totalIncome)}</p>
            </div>

            {/* Expenses Card */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#e2e8f0]" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-[#fee2e2] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </div>
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Expenses</span>
              </div>
              <p className="text-2xl font-black text-[#dc2626] pb-1 leading-normal break-all">{formatRupiah(totalExpenses)}</p>
            </div>

            {/* Net Balance Card */}
            <div className="bg-[#0f172a] rounded-2xl p-5" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/></svg>
                </div>
                <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">Net Balance</span>
              </div>
              <p className={`text-2xl font-black pb-1 leading-normal break-all ${netBalance >= 0 ? 'text-[#ffffff]' : 'text-[#f87171]'}`}>
                {formatRupiah(netBalance)}
              </p>
            </div>
          </div>

          {/* Transactions Grouped */}
          <div className="mb-10">
            <h3 className="text-sm font-bold text-[#0f172a] mb-6 uppercase tracking-widest flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Transaction by Account
            </h3>
            
            {transactions.length > 0 ? (
              Object.entries(
                transactions.reduce((acc, tx) => {
                  const account = tx.accountName || 'Tidak Diketahui';
                  if (!acc[account]) acc[account] = [];
                  acc[account].push(tx);
                  return acc;
                }, {} as Record<string, typeof transactions>)
              ).map(([account, accTransactions]) => {
                const accTotal = accTransactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
                const isAccIncome = accTotal > 0;
                
                return (
                  <div key={account} className="mb-8 overflow-hidden rounded-xl border border-[#e2e8f0]">
                    <div className="flex justify-between items-center bg-[#f8fafc] px-5 py-4 border-b border-[#e2e8f0]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#e0e7ff] flex items-center justify-center">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        </div>
                        <h4 className="font-bold text-[#0f172a] text-sm tracking-wider">{account}</h4>
                      </div>
                      <span className={`inline-flex items-center justify-center h-8 px-4 rounded-full font-black text-sm ${isAccIncome ? 'bg-[#dcfce7] text-[#16a34a]' : 'bg-[#f1f5f9] text-[#0f172a]'}`}>
                        <span className="mt-[2px]">{isAccIncome ? '+' : ''}{formatRupiah(Math.abs(accTotal))}</span>
                      </span>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#f1f5f9] text-[#64748b]">
                        <tr>
                          <th className="py-2 px-5 font-semibold text-xs tracking-wider">Tanggal</th>
                          <th className="py-2 px-2 font-semibold text-xs tracking-wider">Kategori</th>
                          <th className="py-2 px-2 font-semibold text-xs tracking-wider">Deskripsi</th>
                          <th className="py-2 px-5 font-semibold text-xs text-right tracking-wider">Nominal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accTransactions.map((tx, idx) => {
                          const amt = Number(tx.amount);
                          const isIncome = amt > 0;
                          return (
                            <tr key={tx.id || idx} className="border-b border-[#f1f5f9] last:border-0">
                              <td className="py-3 px-5 text-[#64748b] font-mono text-xs w-[120px]">
                                {tx.date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="py-3 px-2">
                                <span className="inline-block bg-[#e2e8f0] text-[#475569] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                  {tx.categoryName || 'Lainnya'}
                                </span>
                              </td>
                              <td className="py-3 px-2 font-medium text-[#0f172a]">{tx.description}</td>
                              <td className={`py-3 px-5 font-bold text-right ${isIncome ? 'text-[#16a34a]' : 'text-[#0f172a]'}`}>
                                {isIncome ? '+' : ''}{formatRupiah(Math.abs(amt))}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center bg-[#f8fafc] rounded-2xl border border-dashed border-[#cbd5e1]">
                <svg className="mx-auto h-12 w-12 text-[#94a3b8] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-[#64748b] font-medium text-sm">No transactions found for this period.</p>
              </div>
            )}
          </div>
        </div>

        {/* Premium Footer */}
        <div className="px-10 py-6 bg-[#f8fafc] border-t border-[#e2e8f0] flex justify-between items-center text-[10px] text-[#94a3b8] font-medium uppercase tracking-widest rounded-b-lg">
          <p>MoneyApp Financial Services &copy; {today.getFullYear()}</p>
          <p>Page 1 of 1</p>
        </div>
      </div>
    );
  }
);

TransactionStatement.displayName = 'TransactionStatement';

