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

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const results: Record<string, number> = {};
      for (const cfg of statConfigs) {
        try {
          const res = await fetch(`/api/${cfg.table}`);
          if (res.ok) { const data = await res.json(); results[cfg.table] = data.length; }
        } catch { results[cfg.table] = 0; }
      }
      setStats(results);
      setLoading(false);
    };
    fetchStats();
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

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-white border border-border">
          <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="w-4 h-4 text-neutral-300" />
              <p className="text-sm text-neutral-400">Data loaded from Supabase database.</p>
            </div>
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
