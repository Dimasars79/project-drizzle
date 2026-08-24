import React, { forwardRef } from 'react';
import { formatRupiah } from '@/lib/format';

export type Transaction = {
  id: string | number;
  date: Date;
  description: string;
  categoryName: string;
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
    
    // Default dates if not provided
    const today = new Date();
    const periodStart = startDate ? startDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Awal';
    const periodEnd = endDate ? endDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const printDate = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
      <div 
        ref={ref}
        className="bg-[#ffffff] text-[#000000] p-10 w-[794px] min-h-[1123px] relative mx-auto pdf-container" 
        style={{ fontFamily: 'sans-serif' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          .pdf-container * {
            border-color: #e5e7eb;
            outline-color: transparent;
            box-shadow: none;
            --tw-border-opacity: 1;
            --tw-bg-opacity: 1;
            --tw-text-opacity: 1;
            --tw-shadow: 0 0 #0000;
            --tw-shadow-colored: 0 0 #0000;
            --tw-ring-color: transparent;
            --tw-border-spacing-x: 0;
            --tw-border-spacing-y: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 0;
            --tw-rotate: 0;
            --tw-skew-x: 0;
            --tw-skew-y: 0;
            --tw-scale-x: 1;
            --tw-scale-y: 1;
          }
        `}} />
        {/* Header Kop Surat */}
        <div className="flex justify-between items-end border-b-2 border-[#e0e7ff] pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-[#4f46e5] tracking-tighter">MONEY<span className="text-[#000000]">APP</span></h1>
            <p className="text-[#6b7280] text-sm mt-1">Smart Financial Management</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-[#1f2937]">Bank Statement</h2>
            <p className="text-sm text-[#6b7280] mt-1">Ref: STM-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>

        {/* Informasi Pelanggan dan Periode */}
        <div className="flex justify-between mb-10 bg-[#f9fafb] p-6 rounded-lg border border-[#f3f4f6]">
          <div>
            <h3 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Informasi Akun</h3>
            <p className="font-bold text-[#1f2937] text-lg">{userName}</p>
            <p className="text-[#6b7280] text-sm">{userEmail}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Periode Laporan</h3>
            <p className="font-medium text-[#1f2937]">{periodStart} - {periodEnd}</p>
            <p className="text-[#9ca3af] text-xs mt-1">Dicetak pada: {printDate}</p>
          </div>
        </div>

        {/* Ringkasan Finansial */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-[#ffffff] border-l-4 border-[#10b981] p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Total Pemasukan</p>
            <p className="text-xl font-bold text-[#10b981]">{formatRupiah(totalIncome)}</p>
          </div>
          <div className="bg-[#ffffff] border-l-4 border-[#ef4444] p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Total Pengeluaran</p>
            <p className="text-xl font-bold text-[#ef4444]">{formatRupiah(totalExpenses)}</p>
          </div>
          <div className="bg-[#ffffff] border-l-4 border-[#3b82f6] p-4" style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-1">Saldo Bersih</p>
            <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-[#1f2937]' : 'text-[#ef4444]'}`}>
              {formatRupiah(netBalance)}
            </p>
          </div>
        </div>

        {/* Tabel Transaksi */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-[#1f2937] mb-4 border-b pb-2">Rincian Transaksi per Kategori</h3>
          
          {transactions.length > 0 ? (
            Object.entries(
              transactions.reduce((acc, tx) => {
                const category = tx.categoryName || 'Lainnya';
                if (!acc[category]) acc[category] = [];
                acc[category].push(tx);
                return acc;
              }, {} as Record<string, typeof transactions>)
            ).map(([category, catTransactions]) => {
              // Hitung subtotal untuk kategori ini
              const catTotal = catTransactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
              const isCatIncome = catTotal > 0;
              
              return (
                <div key={category} className="mb-6">
                  <div className="flex justify-between items-center bg-[#f9fafb] p-3 rounded-t-lg border-b-2 border-[#e5e7eb]">
                    <h4 className="font-bold text-[#1f2937] text-sm uppercase tracking-wide">{category}</h4>
                    <span className={`font-bold text-sm ${isCatIncome ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                      Subtotal: {isCatIncome ? '+' : ''}{formatRupiah(Math.abs(catTotal))}
                    </span>
                  </div>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-[#f3f4f6] text-[#4b5563]">
                        <th className="py-2 px-4 font-semibold w-1/4">Tanggal</th>
                        <th className="py-2 px-4 font-semibold w-1/2">Deskripsi</th>
                        <th className="py-2 px-4 font-semibold text-right w-1/4">Nominal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catTransactions.map((tx, idx) => {
                        const amt = Number(tx.amount);
                        const isIncome = amt > 0;
                        return (
                          <tr key={tx.id || idx} className="border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                            <td className="py-2 px-4 text-[#6b7280] whitespace-nowrap">
                              {tx.date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="py-2 px-4 font-medium text-[#1f2937]">{tx.description}</td>
                            <td className={`py-2 px-4 font-semibold text-right ${isIncome ? 'text-[#10b981]' : 'text-[#1f2937]'}`}>
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
            <div className="py-12 text-center bg-[#f9fafb] rounded-lg border border-[#f3f4f6]">
              <p className="text-[#9ca3af] font-medium">Tidak ada transaksi pada periode ini.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 left-10 right-10 pt-6 border-t border-[#e5e7eb]">
          <div className="flex justify-between items-center text-xs text-[#9ca3af]">
            <p>Laporan ini dicetak secara otomatis oleh sistem MoneyApp.</p>
            <p>Halaman 1 dari 1</p>
          </div>
        </div>
      </div>
    );
  }
);

TransactionStatement.displayName = 'TransactionStatement';
