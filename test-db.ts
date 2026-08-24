import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Harus di-import SETELAH dotenv.config() dijalankan (menggunakan dynamic import atau require)
async function getDb() {
  const { db } = await import("./src/db");
  const { users } = await import("./src/db/schema");
  return { db, users };
}

async function testConnection() {
  const { db, users } = await getDb();
  console.log("Mencoba terhubung ke database Neon...");
  
  try {
    // 1. Uji coba menambahkan pengguna baru (Insert)
    console.log("Menambahkan user percobaan...");
    const newUser = await db.insert(users).values({
      name: "Budi Santoso",
      email: `budi.${Date.now()}@example.com`,
    }).returning();
    
    console.log("Berhasil menambahkan user:", newUser[0]);

    // 2. Uji coba mengambil data (Select)
    console.log("Mengambil daftar user dari database...");
    const allUsers = await db.select().from(users);
    
    console.log(`Berhasil! Terdapat ${allUsers.length} user di database:`);
    console.log(allUsers);
    
    console.log("✅ UJI COBA DATABASE SUKSES! Backend sudah terhubung.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Gagal terhubung atau query error:", error);
    process.exit(1);
  }
}

testConnection();
