import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Import dynamically after dotenv
async function seed() {
  const { db } = await import("./index");
  const { users, accounts, categories, transactions } = await import("./schema");
  const { eq } = await import("drizzle-orm");
  const bcrypt = await import("bcryptjs");

  console.log("Memulai proses seeding...");

  try {
    // 1. Ambil atau buat user
    let user = (await db.select().from(users).limit(1))[0];
    if (!user) {
      console.log("Membuat user baru...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      const result = await db.insert(users).values({
        name: "Budi Santoso",
        email: "budi.santoso@example.com",
        password: hashedPassword,
      }).returning();
      user = result[0];
    }
    console.log("Menggunakan user:", user.name);

    // 2. Buat Accounts
    console.log("Membuat Accounts...");
    const existingAccounts = await db.select().from(accounts).where(eq(accounts.userId, user.id));
    if (existingAccounts.length === 0) {
      await db.insert(accounts).values([
        { userId: user.id, name: "BCA Checking", type: "Checking", balance: "4250.80", color: "text-blue-600 bg-blue-100" },
        { userId: user.id, name: "Mandiri Savings", type: "Savings", balance: "12500.00", color: "text-emerald-600 bg-emerald-100" },
        { userId: user.id, name: "Credit Card", type: "Credit Card", balance: "-845.30", color: "text-slate-600 bg-slate-100" },
      ]);
    }
    const myAccounts = await db.select().from(accounts).where(eq(accounts.userId, user.id));

    // 3. Buat Categories
    console.log("Membuat Categories...");
    const existingCats = await db.select().from(categories).where(eq(categories.userId, user.id));
    if (existingCats.length === 0) {
      await db.insert(categories).values([
        { userId: user.id, name: "Food & Dining", icon: "Utensils", color: "bg-orange-500", budget: "600.00" },
        { userId: user.id, name: "Transportation", icon: "Car", color: "bg-purple-500", budget: "300.00" },
        { userId: user.id, name: "Entertainment", icon: "Film", color: "bg-pink-500", budget: "200.00" },
        { userId: user.id, name: "Income", icon: "DollarSign", color: "bg-green-500", budget: "0.00" },
      ]);
    }
    const myCats = await db.select().from(categories).where(eq(categories.userId, user.id));

    // 4. Buat Transactions
    console.log("Membuat Transactions...");
    const existingTx = await db.select().from(transactions).where(eq(transactions.userId, user.id));
    if (existingTx.length === 0) {
      const foodCat = myCats.find(c => c.name === "Food & Dining");
      const incomeCat = myCats.find(c => c.name === "Income");
      const bcaAcc = myAccounts.find(a => a.name === "BCA Checking");

      await db.insert(transactions).values([
        { 
          userId: user.id, accountId: bcaAcc!.id, categoryId: foodCat?.id, 
          amount: "-120.50", description: "Makan Malam", date: new Date(Date.now() - 1 * 86400000), status: "Completed" 
        },
        { 
          userId: user.id, accountId: bcaAcc!.id, categoryId: incomeCat?.id, 
          amount: "4500.00", description: "Gaji Bulan Ini", date: new Date(Date.now() - 3 * 86400000), status: "Completed" 
        },
        { 
          userId: user.id, accountId: bcaAcc!.id, categoryId: foodCat?.id, 
          amount: "-12.00", description: "Kopi Starbucks", date: new Date(Date.now() - 5 * 86400000), status: "Completed" 
        },
      ]);
    }
    
    console.log("Seeding berhasil!");
    process.exit(0);
  } catch (error) {
    console.error("Gagal saat seeding:", error);
    process.exit(1);
  }
}

seed();
