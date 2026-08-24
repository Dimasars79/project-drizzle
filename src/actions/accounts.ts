"use server";

import { db } from "@/db";
import { accounts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createAccount(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Anda harus login untuk melakukan ini." };
  }

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const balance = Number(formData.get("balance") || 0);
  let color = formData.get("color") as string;
  
  if (!name || !type) {
    return { error: "Nama dan tipe akun harus diisi." };
  }

  // Pilih warna otomatis jika kosong berdasarkan tipe
  if (!color) {
    if (type === "Checking") color = "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400";
    else if (type === "Savings") color = "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400";
    else color = "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
  }

  try {
    await db.insert(accounts).values({
      userId: session.userId,
      name,
      type: type as "Checking" | "Savings" | "Credit Card",
      balance: balance.toString(),
      color,
    });

    revalidatePath("/accounts");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    return { error: "Terjadi kesalahan saat menyimpan data akun." };
  }
}
