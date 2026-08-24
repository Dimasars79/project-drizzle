"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createCategory(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Anda harus login untuk melakukan ini." };
  }

  const name = formData.get("name") as string;
  const icon = formData.get("icon") as string;
  const budget = Number(formData.get("budget") || 0);
  const color = formData.get("color") as string || "bg-blue-500";
  
  if (!name || !icon) {
    return { error: "Nama dan ikon kategori harus diisi." };
  }

  try {
    await db.insert(categories).values({
      userId: session.userId,
      name,
      icon,
      budget: budget.toString(),
      color,
    });

    revalidatePath("/categories");
    
    return { success: true };
  } catch (error) {
    return { error: "Terjadi kesalahan saat menyimpan data kategori." };
  }
}
