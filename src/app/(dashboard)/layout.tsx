import { Sidebar } from "@/components/Sidebar";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  let userName = "User";
  
  if (session?.userId) {
    const user = (await db.select().from(users).where(eq(users.id, session.userId)).limit(1))[0];
    if (user) userName = user.name;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar userName={userName} />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
