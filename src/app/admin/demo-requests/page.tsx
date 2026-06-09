"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, ExternalLink, Search } from "lucide-react";

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  solution: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, "warning" | "primary" | "success" | "neutral"> = {
  pending: "warning",
  contacted: "primary",
  scheduled: "success",
  completed: "neutral",
};

export default function AdminDemoRequestsPage() {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("/api/demo-requests");
    if (res.ok) setRequests(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchRequests(); }, []);

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this demo request?")) return;
    const res = await fetch(`/api/demo-requests/${id}`, { method: "DELETE" });
    if (res.ok) fetchRequests();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Demo Requests</h1>
          <p className="text-neutral-400 mt-1">Manage product demo requests from prospects.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
          <Input placeholder="Search by name or company..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-medium mb-1">No demo requests found</p>
            <p className="text-sm">{searchQuery ? "Try a different search term." : "Requests will appear here."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral">
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Name</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Company</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Solution</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Date</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                <th className="text-right p-4 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-neutral/50">
                  <td className="p-4 text-sm font-medium text-foreground">{r.name}</td>
                  <td className="p-4 text-sm text-neutral-400">{r.company}</td>
                  <td className="p-4 text-sm text-neutral-400">{r.solution}</td>
                  <td className="p-4 text-sm text-neutral-400">{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="p-4"><Badge variant={statusColors[r.status] || "neutral"}>{r.status}</Badge></td>
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <Link href={`/admin/demo-requests/${r.id}`}><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3 mr-1" />View</Button></Link>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(r.id)}><Trash2 className="w-3 h-3" /></Button>
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
