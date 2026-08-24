import { db } from "@/db";
import { users, transactions, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TransactionsTable } from "@/components/TransactionsTable";

export default async function TransactionsPage() {
  // Ambil user.id (mock auth)
  const currentUser = (await db.select().from(users).limit(1))[0];

  if (!currentUser) {
    return <div>User tidak ditemukan. Silakan jalankan seeding.</div>;
  }

  // Fetch semua transaksi
  const allTransactionsRaw = await db.select({
    id: transactions.id,
    amount: transactions.amount,
    description: transactions.description,
    date: transactions.date,
    status: transactions.status,
    categoryName: categories.name,
  })
  .from(transactions)
  .leftJoin(categories, eq(transactions.categoryId, categories.id))
  .where(eq(transactions.userId, currentUser.id))
  .orderBy(desc(transactions.date));

  // Format data untuk komponen tabel
  const formattedTransactions = allTransactionsRaw.map((tx) => ({
    id: tx.id,
    date: tx.date,
    description: tx.description,
    category: tx.categoryName || "Uncategorized",
    status: tx.status,
    amount: tx.amount,
  }));

  return (
    <TransactionsTable data={formattedTransactions} />
  );
}
