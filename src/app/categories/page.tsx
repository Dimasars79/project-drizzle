"use client";

import { PieChart, Utensils, Home, Car, Film, HeartPulse, ShoppingBag, Plus } from "lucide-react";

const categoriesData = [
  { id: 1, name: "Housing", icon: <Home className="h-5 w-5" />, color: "bg-blue-500", spent: 1500, budget: 1500, txCount: 2 },
  { id: 2, name: "Food & Dining", icon: <Utensils className="h-5 w-5" />, color: "bg-orange-500", spent: 450, budget: 600, txCount: 24 },
  { id: 3, name: "Transportation", icon: <Car className="h-5 w-5" />, color: "bg-purple-500", spent: 280, budget: 300, txCount: 12 },
  { id: 4, name: "Entertainment", icon: <Film className="h-5 w-5" />, color: "bg-pink-500", spent: 120, budget: 200, txCount: 4 },
  { id: 5, name: "Health", icon: <HeartPulse className="h-5 w-5" />, color: "bg-red-500", spent: 85, budget: 150, txCount: 3 },
  { id: 6, name: "Shopping", icon: <ShoppingBag className="h-5 w-5" />, color: "bg-emerald-500", spent: 340, budget: 300, txCount: 8 },
];

export default function Categories() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Track your spending limits and budget by category.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          New Category
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoriesData.map((cat) => {
          const percentSpent = Math.min((cat.spent / cat.budget) * 100, 100);
          const isOverBudget = cat.spent > cat.budget;

          return (
            <div key={cat.id} className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${cat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.txCount} transactions</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={isOverBudget ? 'text-destructive' : 'text-foreground'}>${cat.spent} spent</span>
                  <span className="text-muted-foreground">${cat.budget}</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-in-out ${isOverBudget ? 'bg-destructive' : cat.color}`}
                    style={{ width: `${percentSpent}%` }}
                  />
                </div>
                {isOverBudget && (
                  <p className="text-xs text-destructive mt-1 font-medium text-right">
                    Over budget by ${cat.spent - cat.budget}
                  </p>
                )}
              </div>
            </div>
          );
        })}
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
