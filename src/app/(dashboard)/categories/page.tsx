import { PieChart, Utensils, Home, Car, Film, HeartPulse, ShoppingBag, Plus, DollarSign, ShoppingCart, Coffee } from "lucide-react";
import { db } from "@/db";
import { users, categories, transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AddCategoryModal } from "@/components/modals/AddCategoryModal";
import { formatRupiah } from "@/lib/format";
export default async function Categories() {
  const session = await getSession();
  if (!session?.userId) redirect("/login");

  const currentUser = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];

  if (!currentUser) {
    return <div>User tidak ditemukan.</div>;
  }

  // Ambil semua kategori user
  const allCategories = await db.select().from(categories).where(eq(categories.userId, currentUser.id));
  
  // Ambil semua transaksi user (untuk menghitung pengeluaran per kategori)
  const allTransactions = await db.select().from(transactions).where(eq(transactions.userId, currentUser.id));

  const getIconForName = (iconName: string | null) => {
    switch (iconName) {
      case "Home": return <Home className="h-5 w-5" />;
      case "Utensils": return <Utensils className="h-5 w-5" />;
      case "Car": return <Car className="h-5 w-5" />;
      case "Film": return <Film className="h-5 w-5" />;
      case "HeartPulse": return <HeartPulse className="h-5 w-5" />;
      case "ShoppingBag": return <ShoppingBag className="h-5 w-5" />;
      case "DollarSign": return <DollarSign className="h-5 w-5" />;
      default: return <PieChart className="h-5 w-5" />;
    }
  };

  // Agregasi data (gabungkan kategori dengan transaksi)
  const categoriesData = allCategories.map(cat => {
    const catTransactions = allTransactions.filter(tx => tx.categoryId === cat.id);
    const spent = catTransactions.reduce((acc, curr) => {
      // Jika amount negatif (pengeluaran), jumlahkan nilai absolutnya
      const amt = Number(curr.amount);
      return amt < 0 ? acc + Math.abs(amt) : acc;
    }, 0);

    return {
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      color: cat.color || "bg-muted",
      spent: spent,
      budget: Number(cat.budget) || 0,
      txCount: catTransactions.length
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Track your spending limits and budget by category.
          </p>
        </div>
        <AddCategoryModal />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoriesData.map((cat) => {
          // Cegah pembagian dengan 0
          const percentSpent = cat.budget > 0 ? Math.min((cat.spent / cat.budget) * 100, 100) : (cat.spent > 0 ? 100 : 0);
          const isOverBudget = cat.budget > 0 && cat.spent > cat.budget;

          // Pilih icon berdasarkan string
          let IconComponent = PieChart;
          if (cat.icon === "ShoppingCart") IconComponent = ShoppingCart;
          else if (cat.icon === "Coffee") IconComponent = Coffee;
          else if (cat.icon === "Home") IconComponent = Home;
          else if (cat.icon === "Car") IconComponent = Car;
          else if (cat.icon === "Utensils") IconComponent = Utensils;
          else if (cat.icon === "Film") IconComponent = Film;
          else if (cat.icon === "HeartPulse") IconComponent = HeartPulse;
          else if (cat.icon === "ShoppingBag") IconComponent = ShoppingBag;
          else if (cat.icon === "DollarSign") IconComponent = DollarSign;

          return (
            <div key={cat.id} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${cat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.txCount} transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={isOverBudget ? 'text-destructive' : 'text-foreground'}>{formatRupiah(cat.spent)} spent</span>
                  <span className="text-muted-foreground">{formatRupiah(cat.budget)} budget</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-in-out ${isOverBudget ? 'bg-destructive' : cat.color}`}
                    style={{ width: `${percentSpent}%` }}
                  />
                </div>
                {isOverBudget && (
                  <p className="text-xs text-destructive mt-1 font-medium text-right">
                    Over budget by {formatRupiah(cat.spent - cat.budget)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {categoriesData.length === 0 && (
          <div className="col-span-full py-8 text-center text-muted-foreground">
            Belum ada kategori yang dibuat.
          </div>
        )}
      </div>

      <div className="rounded-xl border bg-card p-8 shadow-sm text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <PieChart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Need a new budget category?</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Create custom categories to track specific expenses like "Vacation Fund" or "Home Renovation".
        </p>
        <button className="rounded-md border bg-card px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
          Create Custom Category
        </button>
      </div>
    </div>
  );
}
