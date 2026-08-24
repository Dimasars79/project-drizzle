"use client";

import { useState, useRef } from "react";
import { Download, Loader2, FileText } from "lucide-react";
import { getExportData } from "@/actions/export";
import { exportElementToPdf } from "@/lib/exportPdf";
import { TransactionStatement } from "@/components/pdf/TransactionStatement";
import { Transaction } from "@/components/pdf/TransactionStatement";

export function DataExportSettings() {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportData, setExportData] = useState<any>(null);
  
  const handleExportPdf = async () => {
    try {
      setIsExportingPdf(true);
      
      // Ambil data terbaru dari server
      const data = await getExportData();
      
      // Format data untuk dicocokkan dengan interface TransactionStatement
      const formattedData = {
        ...data,
        transactions: data.transactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date)
        }))
      };
      
      setExportData(formattedData);
      
      // Beri waktu sejenak agar React selesai render komponen template yang disembunyikan
      setTimeout(async () => {
        const success = await exportElementToPdf('pdf-statement-template', `MoneyApp_Statement_${new Date().getTime()}.pdf`);
        if (!success) {
          alert('Gagal mengekspor PDF. Silakan coba lagi.');
        }
        setIsExportingPdf(false);
        setExportData(null); // Bersihkan DOM setelah selesai
      }, 500);
      
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengambil data.');
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold tracking-tight">Data Export</h3>
        <p className="text-sm text-muted-foreground mt-1">Download laporan transaksi personal Anda.</p>
      </div>
      <div className="p-6 space-y-6">
        
        {/* PDF Export Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b">
          <div className="space-y-0.5">
            <label className="text-sm font-medium leading-none">Export PDF Bank Statement</label>
            <p className="text-sm text-muted-foreground">Unduh laporan transaksi Anda ke dalam format PDF yang rapi layaknya rekening koran.</p>
          </div>
          <button 
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {isExportingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
            {isExportingPdf ? 'Generating PDF...' : 'Download PDF'}
          </button>
        </div>

        {/* CSV Export Section (Optional) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <label className="text-sm font-medium leading-none">Export CSV (Raw Data)</label>
            <p className="text-sm text-muted-foreground">Unduh data mentah transaksi dalam bentuk .csv untuk diolah di Excel.</p>
          </div>
          <button className="flex items-center gap-2 rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors whitespace-nowrap">
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </div>

      {/* Hidden PDF Template Container */}
      {exportData && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          <div id="pdf-statement-template">
            <TransactionStatement 
              userName={exportData.userName}
              userEmail={exportData.userEmail}
              transactions={exportData.transactions}
              totalIncome={exportData.totalIncome}
              totalExpenses={exportData.totalExpenses}
              netBalance={exportData.netBalance}
            />
          </div>
        </div>
      )}
    </div>
  );
}
