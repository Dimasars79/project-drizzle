"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  PieChart,
  CreditCard,
  Settings,
  Wallet,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
  { name: "Categories", href: "/categories", icon: PieChart },
  { name: "Accounts", href: "/accounts", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
];

import { logoutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

export function Sidebar({ userName = "John Doe" }: { userName?: string }) {
  const pathname = usePathname();
  
  // Ambil inisial nama
  const initials = userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Wallet className="h-6 w-6" />
          <span>MoneyApp</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-muted",
                isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate max-w-[100px]">{userName}</span>
              <span className="text-xs text-muted-foreground">User</span>
            </div>
          </div>
          <button 
            onClick={() => logoutUser()}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
