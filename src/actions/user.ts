"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.userId) {
    return null;
  }

  const currentUser = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
  if (currentUser.length === 0) {
    return null;
  }

  return {
    id: currentUser[0].id,
    name: currentUser[0].name,
    email: currentUser[0].email,
  };
}

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: "Anda harus login untuk melakukan ini." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Nama dan Email tidak boleh kosong." };
  }

  try {
    await db.update(users)
      .set({ name, email })
      .where(eq(users.id, session.userId));

    revalidatePath("/settings");
    revalidatePath("/");
    
    return { success: true, message: "Profil berhasil diperbarui." };
  } catch (error: any) {
    console.error("Error updating profile:", error);
    if (error.message?.includes("duplicate key") || error.code === '23505') {
      return { error: "Email sudah digunakan oleh akun lain." };
    }
    return { error: "Terjadi kesalahan saat memperbarui profil." };
  }
}
