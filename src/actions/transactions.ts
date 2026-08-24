"use server";

import { db } from "@/db";
import { transactions, accounts } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createTransaction(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Anda harus login untuk melakukan ini." };
  }

  const description = formData.get("description") as string;
  const amountStr = formData.get("amount") as string;
  const categoryId = formData.get("categoryId") as string;
  const accountId = formData.get("accountId") as string;
  const type = formData.get("type") as string; // 'income' or 'expense'
  
  if (!description || !amountStr || !categoryId || !accountId || !type) {
    return { error: "Semua kolom harus diisi." };
  }

  let amount = Number(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return { error: "Jumlah nominal tidak valid." };
  }

  // Jika pengeluaran, amount harus negatif
  if (type === "expense") {
    amount = -amount;
  }

  try {
    // Mulai proses penambahan transaksi
    await db.transaction(async (tx) => {
      // 1. Tambahkan ke tabel transaksi
      await tx.insert(transactions).values({
        userId: session.userId,
        accountId: accountId,
        categoryId: categoryId,
        amount: amount.toString(),
        description,
        date: new Date(),
      });

      // 2. Perbarui saldo akun
      const targetAccount = (await tx.select().from(accounts).where(eq(accounts.id, accountId)).limit(1))[0];
      if (targetAccount) {
        const newBalance = Number(targetAccount.balance) + amount;
        await tx.update(accounts)
          .set({ balance: newBalance.toString() })
          .where(eq(accounts.id, accountId));
      }
    });

    revalidatePath("/transactions");
    revalidatePath("/");
    revalidatePath("/accounts");
    revalidatePath("/categories");
    
    return { success: true };
  } catch (error) {
    return { error: "Terjadi kesalahan saat memproses transaksi." };
  }
}
