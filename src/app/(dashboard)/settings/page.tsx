"use client";

import { useState } from "react";
import { User, Bell, Shield, Smartphone, Monitor } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { id: "Profile", icon: User },
    { id: "Security", icon: Shield },
    { id: "Notifications", icon: Bell },
    { id: "Connected Apps", icon: Smartphone },
    { id: "Appearance", icon: Monitor },
  ];

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
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap w-full text-left ${
                    isActive 
                      ? "bg-muted text-foreground" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.id}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 space-y-6">
          {activeTab === "Profile" && (
            <>
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
                </div>
              </div>
            </>
          )}

          {activeTab === "Security" && (
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold tracking-tight">Security Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage your password and security preferences.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Current Password</label>
                  <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">New Password</label>
                  <input type="password" placeholder="••••••••" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "Appearance" && (
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold tracking-tight">Appearance</h3>
                <p className="text-sm text-muted-foreground mt-1">Customize how the app looks.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium leading-none">Dark Mode</label>
                    <p className="text-sm text-muted-foreground">Toggle dark mode theme.</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted border cursor-pointer">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-muted-foreground transition" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {["Notifications", "Connected Apps"].includes(activeTab) && (
            <div className="rounded-xl border bg-card shadow-sm p-12 text-center text-muted-foreground">
              <p>Pengaturan untuk <strong>{activeTab}</strong> akan segera hadir di versi mendatang.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
