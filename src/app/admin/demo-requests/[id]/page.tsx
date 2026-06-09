"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";

interface DemoRequest {
  id: string; name: string; email: string; phone: string; company: string;
  job_title: string; solution: string; message: string; status: string; created_at: string;
}

const statusColors: Record<string, "warning" | "primary" | "success" | "neutral"> = {
  pending: "warning", contacted: "primary", scheduled: "success", completed: "neutral",
};

export default function DemoRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [req, setReq] = useState<DemoRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/demo-requests/${id}`).then(r => r.json()).then(d => { setReq(d); setLoading(false); });
  }, [id]);

  const handleStatusChange = async (status: string) => {
    await fetch(`/api/demo-requests/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    setReq(prev => prev ? { ...prev, status } : null);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this demo request?")) return;
    await fetch(`/api/demo-requests/${id}`, { method: "DELETE" });
    router.push("/admin/demo-requests");
  };

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  if (!req) return <div className="text-center py-16 text-neutral-400">Demo request not found.</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/demo-requests"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
          <div><h1 className="text-2xl font-bold text-foreground">{req.name}</h1></div>
        </div>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
      </div>
      <div className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><Label>Name</Label><p className="text-sm font-medium text-foreground mt-1">{req.name}</p></div>
          <div><Label>Email</Label><p className="text-sm text-foreground mt-1">{req.email}</p></div>
          <div><Label>Phone</Label><p className="text-sm text-neutral-400 mt-1">{req.phone || "—"}</p></div>
          <div><Label>Company</Label><p className="text-sm text-neutral-400 mt-1">{req.company || "—"}</p></div>
          <div><Label>Job Title</Label><p className="text-sm text-neutral-400 mt-1">{req.job_title || "—"}</p></div>
          <div><Label>Solution</Label><p className="text-sm text-neutral-400 mt-1">{req.solution || "—"}</p></div>
          <div>
            <Label>Status</Label>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant={statusColors[req.status] || "neutral"}>{req.status}</Badge>
              <select value={req.status} onChange={e => handleStatusChange(e.target.value)} className="px-2 py-1 rounded border border-border text-xs bg-white">
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div><Label>Date</Label><p className="text-sm text-neutral-400 mt-1">{new Date(req.created_at).toLocaleString()}</p></div>
        </div>
        {req.message && (
          <div className="pt-4 border-t border-border">
            <Label>Message</Label>
            <p className="text-sm text-neutral-400 mt-2 whitespace-pre-wrap">{req.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{children}</span>;
}
