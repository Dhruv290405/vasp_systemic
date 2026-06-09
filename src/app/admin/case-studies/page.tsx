"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, Search } from "lucide-react";
import type { CaseStudy } from "@/types";

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudies = async () => {
    setLoading(true);
    const res = await fetch("/api/case-studies");
    if (res.ok) setStudies(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchStudies(); }, []);

  const filtered = studies.filter(s =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this case study?")) return;
    const res = await fetch(`/api/case-studies/${id}`, { method: "DELETE" });
    if (res.ok) fetchStudies();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Case Studies</h1>
          <p className="text-neutral-400 mt-1">Manage your case studies portfolio.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            <Input placeholder="Search case studies..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64" />
          </div>
          <Link href="/admin/case-studies/new"><Button variant="primary"><Plus className="w-4 h-4 mr-1" />New Case Study</Button></Link>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-medium mb-1">No case studies found</p>
            <p className="text-sm">{searchQuery ? "Try a different search term." : "Add your first case study."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral">
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Title</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Client</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Date</th>
                <th className="text-right p-4 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-neutral/50">
                  <td className="p-4 text-sm font-medium text-foreground">{s.title}</td>
                  <td className="p-4 text-sm text-neutral-400">{s.client}</td>
                  <td className="p-4"><Badge variant={s.published ? "success" : "warning"}>{s.published ? "published" : "draft"}</Badge></td>
                  <td className="p-4 text-sm text-neutral-400">{new Date(s.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <Link href={`/admin/case-studies/${s.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(s.id)}><Trash2 className="w-3 h-3" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
