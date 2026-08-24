"use server";

import { db } from "@/db";
import { transactions, accounts, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getTransactions() {
  try {
    // This is a basic example. In a real app with Auth, you would filter by the logged in user's ID
    const results = await db.select({
      id: transactions.id,
      amount: transactions.amount,
      description: transactions.description,
      date: transactions.date,
      status: transactions.status,
      accountName: accounts.name,
      categoryName: categories.name,
    })
    .from(transactions)
    .leftJoin(accounts, eq(transactions.accountId, accounts.id))
    .leftJoin(categories, eq(transactions.categoryId, categories.id))
    .orderBy(desc(transactions.date))
    .limit(50);
    
    return { success: true, data: results };
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return { success: false, error: "Failed to fetch transactions" };
  }
}
