"use client";

import { Download } from "lucide-react";
import { ExportPdfButton } from "@/components/ExportPdfButton";

export function DataExportSettings() {
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
          <ExportPdfButton />
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
    </div>
  );
}
