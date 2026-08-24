"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession, clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Semua kolom harus diisi!" };
  }

  try {
    const user = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
    if (!user) {
      return { error: "Email atau password salah." };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: "Email atau password salah." };
    }

    // Set JWT Cookie Session
    await createSession(user.id);
  } catch (error) {
    return { error: "Terjadi kesalahan internal." };
  }

  // Redirect harus diluar try/catch karena throw di dalam Next.js
  redirect("/");
}

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Semua kolom harus diisi!" };
  }

  try {
    // Cek email duplikat
    const existingUser = (await db.select().from(users).where(eq(users.email, email)).limit(1))[0];
    if (existingUser) {
      return { error: "Email sudah digunakan." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    }).returning();

    // Auto login setelah register
    await createSession(newUser[0].id);
  } catch (error) {
    return { error: "Terjadi kesalahan saat mendaftar." };
  }

  redirect("/");
}

export async function logoutUser() {
  await clearSession();
  redirect("/login");
}
