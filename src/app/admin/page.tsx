"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Package, BookOpen, Briefcase, Mail, Users, Activity } from "lucide-react";

const statConfigs = [
  { label: "Blog Posts", icon: FileText, color: "text-blue-600 bg-blue-100", table: "blogs" },
  { label: "Products", icon: Package, color: "text-green-600 bg-green-100", table: "products" },
  { label: "Case Studies", icon: BookOpen, color: "text-purple-600 bg-purple-100", table: "case-studies" },
  { label: "Open Positions", icon: Briefcase, color: "text-orange-600 bg-orange-100", table: "careers/positions" },
  { label: "Contact Requests", icon: Mail, color: "text-pink-600 bg-pink-100", table: "contacts" },
  { label: "Demo Requests", icon: Users, color: "text-teal-600 bg-teal-100", table: "demo-requests" },
];

interface AnalyticsData {
  totalViews: number; todayViews: number; weekViews: number; monthViews: number;
  topPages: { path: string; views: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      const [statsRes, analyticsRes] = await Promise.all([
        Promise.all(statConfigs.map(async (cfg) => {
          try {
            const res = await fetch(`/api/${cfg.table}`);
            if (res.ok) { const data = await res.json(); return [cfg.table, data.length] as const; }
          } catch {}
          return [cfg.table, 0] as const;
        })),
        fetch("/api/analytics/stats").then(r => r.json()).catch(() => null),
      ]);
      setStats(Object.fromEntries(statsRes));
      setAnalytics(analyticsRes);
      setLoading(false);
    };
    fetchAll();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-neutral-400 mt-1">Overview of your VASP Systemic administration panel.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statConfigs.map((cfg, index) => {
          const Icon = cfg.icon;
          const count = stats[cfg.table];
          return (
            <motion.div
              key={cfg.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-xl bg-white border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg ${cfg.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : count ?? 0}
              </div>
              <div className="text-sm text-neutral-400 mt-1">{cfg.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Section */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Today", value: analytics?.todayViews, icon: Activity },
          { label: "This Week", value: analytics?.weekViews, icon: Activity },
          { label: "This Month", value: analytics?.monthViews, icon: Activity },
          { label: "All Time", value: analytics?.totalViews, icon: Activity },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl bg-white border border-border">
            <div className="text-sm text-neutral-400">{item.label}</div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {analytics === null ? "..." : (item.value ?? 0).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-border">
          <h2 className="font-semibold text-foreground mb-4">Top Pages (This Week)</h2>
          <div className="space-y-2">
            {!analytics || analytics.topPages.length === 0 ? (
              <p className="text-sm text-neutral-400">No data yet. Page views will appear once visitors browse the site.</p>
            ) : (
              analytics.topPages.map((p) => (
                <div key={p.path} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                  <span className="text-sm text-neutral-400">{p.path || "/"}</span>
                  <span className="text-sm font-medium text-foreground">{p.views}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-white border border-border">
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "New Blog Post", href: "/admin/blogs/new" },
              { label: "Add Product", href: "/admin/products/new" },
              { label: "View Contacts", href: "/admin/contacts" },
              { label: "Manage Careers", href: "/admin/careers" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="p-4 rounded-lg bg-neutral border border-border text-sm font-medium text-foreground hover:bg-neutral-100 transition-colors text-center"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
