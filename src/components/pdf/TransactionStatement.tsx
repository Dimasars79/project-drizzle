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
        className="bg-white text-black p-10 w-[794px] min-h-[1123px] relative mx-auto" 
        style={{ fontFamily: 'sans-serif' }}
      >
        {/* Header Kop Surat */}
        <div className="flex justify-between items-end border-b-2 border-primary/20 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-black text-primary tracking-tighter">MONEY<span className="text-black">APP</span></h1>
            <p className="text-gray-500 text-sm mt-1">Smart Financial Management</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-gray-800">Bank Statement</h2>
            <p className="text-sm text-gray-500 mt-1">Ref: STM-{Math.floor(Math.random() * 1000000)}</p>
          </div>
        </div>

        {/* Informasi Pelanggan dan Periode */}
        <div className="flex justify-between mb-10 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Informasi Akun</h3>
            <p className="font-bold text-gray-800 text-lg">{userName}</p>
            <p className="text-gray-500 text-sm">{userEmail}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Periode Laporan</h3>
            <p className="font-medium text-gray-800">{periodStart} - {periodEnd}</p>
            <p className="text-gray-400 text-xs mt-1">Dicetak pada: {printDate}</p>
          </div>
        </div>

        {/* Ringkasan Finansial */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white border-l-4 border-success p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pemasukan</p>
            <p className="text-xl font-bold text-success">{formatRupiah(totalIncome)}</p>
          </div>
          <div className="bg-white border-l-4 border-destructive p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Pengeluaran</p>
            <p className="text-xl font-bold text-destructive">{formatRupiah(totalExpenses)}</p>
          </div>
          <div className="bg-white border-l-4 border-blue-500 p-4 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Saldo Bersih</p>
            <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-gray-800' : 'text-destructive'}`}>
              {formatRupiah(netBalance)}
            </p>
          </div>
        </div>

        {/* Tabel Transaksi */}
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Rincian Transaksi</h3>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-3 px-4 font-semibold rounded-tl-lg">Tanggal</th>
                <th className="py-3 px-4 font-semibold">Deskripsi</th>
                <th className="py-3 px-4 font-semibold">Kategori</th>
                <th className="py-3 px-4 font-semibold text-right rounded-tr-lg">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx, idx) => {
                  const amt = Number(tx.amount);
                  const isIncome = amt > 0;
                  return (
                    <tr key={tx.id || idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {tx.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{tx.description}</td>
                      <td className="py-3 px-4 text-gray-500">{tx.categoryName || '-'}</td>
                      <td className={`py-3 px-4 font-bold text-right ${isIncome ? 'text-success' : 'text-gray-800'}`}>
                        {isIncome ? '+' : ''}{formatRupiah(Math.abs(amt))}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400 font-medium">
                    Tidak ada transaksi pada periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 left-10 right-10 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <p>Laporan ini dicetak secara otomatis oleh sistem MoneyApp.</p>
            <p>Halaman 1 dari 1</p>
          </div>
        </div>
      </div>
    );
  }
);

TransactionStatement.displayName = 'TransactionStatement';
