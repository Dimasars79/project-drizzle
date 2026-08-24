"use server";

import { db } from "@/db";
import { users, accounts, transactions, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export async function getExportData() {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const currentUser = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];
  
  if (!currentUser) throw new Error("User not found");

  const allAccounts = await db.select().from(accounts).where(eq(accounts.userId, currentUser.id));
  
  const allTransactions = await db.select({
    id: transactions.id,
    amount: transactions.amount,
    description: transactions.description,
    date: transactions.date,
    categoryName: categories.name,
  })
  .from(transactions)
  .leftJoin(categories, eq(transactions.categoryId, categories.id))
  .where(eq(transactions.userId, currentUser.id))
  .orderBy(desc(transactions.date));

  let totalIncome = 0;
  let totalExpenses = 0;
  
  allTransactions.forEach(tx => {
    const amt = Number(tx.amount);
    if (amt > 0) totalIncome += amt;
    else totalExpenses += Math.abs(amt);
  });

  const netBalance = totalIncome - totalExpenses;

  return {
    userName: currentUser.name,
    userEmail: currentUser.email,
    transactions: allTransactions,
    totalIncome,
    totalExpenses,
    netBalance,
  };
}
