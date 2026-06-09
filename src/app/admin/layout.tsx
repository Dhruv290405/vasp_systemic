"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Package, BookOpen, Briefcase, Users, Mail, LogOut, Loader2 } from "lucide-react";
import { signOut } from "@/lib/supabase/auth-actions";
import { createClient } from "@/lib/supabase/client";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog Posts", href: "/admin/blogs", icon: FileText },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Case Studies", href: "/admin/case-studies", icon: BookOpen },
  { label: "Careers", href: "/admin/careers", icon: Briefcase },
  { label: "Contacts", href: "/admin/contacts", icon: Mail },
  { label: "Demo Requests", href: "/admin/demo-requests", icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const ALLOWED_EMAILS = ["vaspsystemic@gmail.com", "dhruvtiwari864@gmail.com"];

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/admin/login");
      } else {
        const email = data.session.user.email;
        if (email && ALLOWED_EMAILS.includes(email)) {
          setLoading(false);
        } else {
          await supabase.auth.signOut();
          router.replace("/admin/login?error=unauthorized");
        }
      }
    };
    if (pathname !== "/admin/login") checkSession();
    else setLoading(false);
  }, [pathname, router]);

  const handleSignOut = async () => {
    await signOut();
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral flex">
      <aside className="w-64 bg-white border-r border-border shrink-0 hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/vasplogogo.png" alt="VASP Systemic" width={2560} height={748} priority style={{ imageRendering: "auto", objectFit: "contain", height: "40px", width: "auto" }} />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-neutral-500 hover:text-foreground hover:bg-neutral"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-500 hover:text-red-500 hover:bg-red-50 w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
