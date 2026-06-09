"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FileText, Mail, Phone, ExternalLink, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusColors: Record<string, "primary" | "secondary" | "success" | "warning" | "neutral"> = {
  new: "primary", reviewed: "warning", shortlisted: "success", rejected: "neutral",
};

export default function AdminCandidatesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const positionId = searchParams.get("positionId");
  const [candidates, setCandidates] = useState<any[]>([]);
  const [positionTitle, setPositionTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!positionId) return;
    const fetchData = async () => {
      const [appRes, posRes] = await Promise.all([
        fetch("/api/careers/applications"),
        fetch(`/api/careers/positions/${positionId}`),
      ]);
      if (appRes.ok) {
        const all = await appRes.json();
        const filtered = Array.isArray(all) ? all.filter((a: any) => a.position_id === positionId) : [];
        setCandidates(filtered);
      }
      if (posRes.ok) {
        const pos = await posRes.json();
        setPositionTitle(pos.title || "");
      }
      setLoading(false);
    };
    fetchData();
  }, [positionId]);

  if (!positionId) {
    return <div className="text-center py-20 text-neutral-400">No position selected. <Link href="/admin/careers" className="text-primary">Back to Careers</Link></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/careers")}><ArrowLeft className="w-4 h-4 mr-1" />Back</Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{positionTitle || "Candidates"}</h1>
          <p className="text-neutral-400 mt-1">{candidates.length} applicant(s)</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">No applications for this position yet.</div>
      ) : (
        <div className="space-y-4">
          {candidates.map((c: any) => (
            <div key={c.id} className="p-6 rounded-xl border border-border bg-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{c.name}</h3>
                  <p className="text-sm text-neutral-400 mt-1">{c.email}</p>
                </div>
                <Badge variant={statusColors[c.status] || "primary"}>{c.status || "new"}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-400 mb-4">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {c.phone}</span>
                {c.resume_url && (
                  <a href={c.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    <FileText className="w-3.5 h-3.5" /> Resume
                  </a>
                )}
              </div>
              <div className="flex justify-end">
                <Link href={`/admin/careers/applications/${c.id}`}>
                  <Button variant="outline" size="sm">View Details <ExternalLink className="ml-1 w-3.5 h-3.5" /></Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
