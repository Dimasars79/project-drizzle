import { db } from "@/db";
import { users, transactions, categories, accounts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TransactionsTable } from "@/components/TransactionsTable";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TransactionsPage() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const currentUser = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];

  if (!currentUser) {
    return <div>User tidak ditemukan.</div>;
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

  // Ambil data dropdown
  const allAccounts = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(eq(accounts.userId, currentUser.id));
  const allCategories = await db.select({ id: categories.id, name: categories.name }).from(categories).where(eq(categories.userId, currentUser.id));

  return (
    <TransactionsTable 
      data={formattedTransactions} 
      accounts={allAccounts} 
      categories={allCategories} 
    />
  );
}
