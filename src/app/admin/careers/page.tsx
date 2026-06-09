"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2, Users, Search } from "lucide-react";
import type { CareerPosition } from "@/types";

export default function AdminCareersPage() {
  const [positions, setPositions] = useState<(CareerPosition & { candidateCount?: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const [posRes, appRes] = await Promise.all([
      fetch("/api/careers/positions"),
      fetch("/api/careers/applications"),
    ]);
    if (posRes.ok) {
      const positions = await posRes.json();
      if (appRes.ok) {
        const apps = await appRes.json();
        const counts: Record<string, number> = {};
        (apps as any[]).forEach((a: any) => { counts[a.position_id] = (counts[a.position_id] || 0) + 1; });
        positions.forEach((p: any) => { p.candidateCount = counts[p.id] || 0; });
      }
      setPositions(positions);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = positions.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this position?")) return;
    const res = await fetch(`/api/careers/positions/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Careers</h1>
          <p className="text-neutral-400 mt-1">Manage job positions and candidate applications.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            <Input placeholder="Search positions..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64" />
          </div>
          <Link href="/admin/careers/new"><Button variant="primary"><Plus className="w-4 h-4 mr-1" />New Position</Button></Link>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-medium mb-1">No positions found</p>
            <p className="text-sm">{searchQuery ? "Try a different search term." : "Create your first job posting."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral">
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Position</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Department</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Type</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                <th className="text-center p-4 text-sm font-medium text-neutral-400">Candidates</th>
                <th className="text-right p-4 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-neutral/50">
                  <td className="p-4 text-sm font-medium text-foreground">{p.title}</td>
                  <td className="p-4 text-sm text-neutral-400">{p.department}</td>
                  <td className="p-4 text-sm text-neutral-400">{p.type}</td>
                  <td className="p-4"><Badge variant={p.published ? "success" : "warning"}>{p.published ? "active" : "closed"}</Badge></td>
                  <td className="p-4 text-center">
                    <Link href={`/admin/careers/applications?positionId=${p.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {p.candidateCount || 0}
                      </Button>
                    </Link>
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <Link href={`/admin/careers/${p.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(p.id)}><Trash2 className="w-3 h-3" /></Button>
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
