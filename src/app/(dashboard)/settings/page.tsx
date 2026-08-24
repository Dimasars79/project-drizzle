"use client";

import { User, Bell, Shield, Smartphone, Monitor } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account preferences and application settings.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 shrink-0">
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 overflow-x-auto pb-4 md:pb-0">
            <a href="#" className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm font-medium text-foreground transition-colors whitespace-nowrap">
              <User className="h-4 w-4" />
              Profile
            </a>
            <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
              <Shield className="h-4 w-4" />
              Security
            </a>
            <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
              <Bell className="h-4 w-4" />
              Notifications
            </a>
            <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
              <Smartphone className="h-4 w-4" />
              Connected Apps
            </a>
            <a href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors whitespace-nowrap">
              <Monitor className="h-4 w-4" />
              Appearance
            </a>
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold tracking-tight">Profile Information</h3>
              <p className="text-sm text-muted-foreground mt-1">Update your account profile details and email address.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none">First Name</label>
                  <input id="firstName" defaultValue="John" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none">Last Name</label>
                  <input id="lastName" defaultValue="Doe" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
                <input id="email" type="email" defaultValue="john.doe@example.com" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium leading-none">Bio</label>
                <textarea id="bio" placeholder="Tell us a little bit about yourself" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"></textarea>
                <p className="text-xs text-muted-foreground">This information will be displayed on your public profile.</p>
              </div>
            </div>
            <div className="p-6 border-t bg-muted/20 flex justify-end">
              <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-xl border bg-card shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold tracking-tight">Preferences</h3>
              <p className="text-sm text-muted-foreground mt-1">Manage your general application preferences.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none">Currency</label>
                  <p className="text-sm text-muted-foreground">Select your primary currency.</p>
                </div>
                <select className="flex h-10 w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="usd">USD ($)</option>
                  <option value="eur">EUR (€)</option>
                  <option value="gbp">GBP (£)</option>
                </select>
              </div>
              <div className="border-t pt-6 flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium leading-none">Monthly Budget Alert</label>
                  <p className="text-sm text-muted-foreground">Receive an email when you exceed 90% of your budget.</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
