import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { MobileSidebarWrapper } from "@/components/MobileSidebarWrapper";

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
    <MobileSidebarWrapper userName={userName}>
      {children}
    </MobileSidebarWrapper>
  );
}
