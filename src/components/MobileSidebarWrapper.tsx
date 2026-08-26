"use client";

import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";

export function MobileSidebarWrapper({ userName, children }: { userName: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-muted/30">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex h-16 items-center justify-between border-b bg-card px-4 shrink-0 z-20">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <Wallet className="h-6 w-6" />
          <span>MoneyApp</span>
        </Link>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-md"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop Sidebar (Always visible on md+) */}
      <div className="hidden md:block shrink-0">
        <Sidebar userName={userName} />
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar (Slides in) */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar userName={userName} onNavigate={() => setIsOpen(false)} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-0">
        <div className="mx-auto max-w-6xl w-full">
          {children}
        </div>
      </main>

    </div>
  );
}
