"use client";

import { useState, useActionState, useEffect } from "react";
import { createCategory } from "@/actions/categories";
import { Plus, Loader2, X } from "lucide-react";

export function AddCategoryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(createCategory, null);

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
    }
  }, [state]);

  const ICONS = ["Home", "Utensils", "Car", "Film", "HeartPulse", "ShoppingBag", "DollarSign"];
  const COLORS = ["bg-blue-500", "bg-orange-500", "bg-purple-500", "bg-pink-500", "bg-red-500", "bg-emerald-500", "bg-slate-500"];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
      >
        <Plus className="h-4 w-4" />
        New Category
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <h2 className="text-xl font-bold mb-4">Buat Kategori Baru</h2>
            
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Kategori</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Misal: Liburan"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ikon</label>
                <select 
                  name="icon" 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {ICONS.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Warna Tema</label>
                <select 
                  name="color" 
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {COLORS.map((color) => (
                    <option key={color} value={color}>{color.replace("bg-", "").replace("-500", "")}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bujet Maksimal (Rp)</label>
                <input
                  name="budget"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {state?.error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md border border-destructive/20">
                  {state.error}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Simpan Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
