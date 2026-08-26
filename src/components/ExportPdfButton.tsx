"use client";

import { useState } from "react";
import { Loader2, FileText, Download } from "lucide-react";
import { getExportData } from "@/actions/export";
import { exportElementToPdf } from "@/lib/exportPdf";
import { TransactionStatement } from "@/components/pdf/TransactionStatement";

type ExportPdfButtonProps = {
  variant?: "outline" | "default";
  label?: string;
  icon?: "download" | "filetext";
};

export function ExportPdfButton({ variant = "default", label = "Download PDF", icon = "filetext" }: ExportPdfButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportData, setExportData] = useState<any>(null);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      const data = await getExportData();
      
      const formattedData = {
        ...data,
        transactions: data.transactions.map((tx: any) => ({
          ...tx,
          date: new Date(tx.date)
        }))
      };
      
      setExportData(formattedData);
      
      setTimeout(async () => {
        const success = await exportElementToPdf('pdf-statement-template-shared', `MoneyApp_Statement_${new Date().getTime()}.pdf`);
        if (!success) {
          alert('Gagal mengekspor PDF. Silakan coba lagi.');
        }
        setIsExporting(false);
        setExportData(null);
      }, 500);
      
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengambil data untuk PDF.');
      setIsExporting(false);
    }
  };

  const IconToUse = icon === "download" ? Download : FileText;
  const variantClass = variant === "outline" 
    ? "border bg-card hover:bg-muted" 
    : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <>
      <button 
        onClick={handleExport}
        disabled={isExporting}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap disabled:opacity-50 ${variantClass}`}
      >
        {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <IconToUse className="h-4 w-4" />}
        {isExporting ? 'Generating...' : label}
      </button>

      {exportData && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '794px' }}>
          <div id="pdf-statement-template-shared" style={{ width: '794px' }}>
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
    </>
  );
}
