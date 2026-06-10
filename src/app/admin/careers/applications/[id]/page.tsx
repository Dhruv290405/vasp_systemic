"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const statusOptions = ["new", "reviewed", "shortlisted", "rejected"];
const statusColors: Record<string, "primary" | "secondary" | "success" | "warning" | "neutral"> = {
  new: "primary", reviewed: "warning", shortlisted: "success", rejected: "neutral",
};

export default function CandidateDetailPage() {
  const params = useParams();
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const pendingRef = useRef(false);

  useEffect(() => {
    fetch(`/api/careers/applications/${params.id}`)
      .then((r) => r.json())
      .then((data) => { if (data) setCandidate(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);

  const updateStatus = async (status: string) => {
    if (pendingRef.current) return;
    pendingRef.current = true;

    setCandidate((prev: any) => prev ? { ...prev, status } : prev);
    setEmailStatus("Updating...");

    try {
      const res = await fetch("/api/careers/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: params.id, status }),
      });
      const result = await res.json();
      if (result.status) {
        setCandidate((prev: any) => prev ? { ...prev, status: result.status } : prev);
      }
      if (result.emailSent) setEmailStatus("Email sent to candidate");
      else if (result.emailError) setEmailStatus(`Email failed: ${result.emailError}`);
      else setEmailStatus("Status updated");
    } catch {
      setEmailStatus("Update failed");
    } finally {
      pendingRef.current = false;
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

  if (!candidate) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-foreground">Candidate not found</h2>
        <Link href="/admin/careers/applications"><Button variant="outline" className="mt-4"><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/careers/applications" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Candidates
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{candidate.name}</h1>
          <p className="text-neutral-400 mt-1">{candidate.position_title || candidate.position_id}</p>
        </div>
        <Badge variant={statusColors[candidate.status] || "primary"}>{candidate.status || "new"}</Badge>
      </div>

      <div className="p-6 rounded-xl border border-border bg-white space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-neutral-300" />
          <a href={`mailto:${candidate.email}`} className="text-primary hover:underline">{candidate.email}</a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-neutral-300" />
          <span>{candidate.phone}</span>
        </div>
        {candidate.resume_url && (
          <div className="flex items-center gap-2 text-sm">
            <FileText className="w-4 h-4 text-neutral-300" />
            <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">View Resume</a>
          </div>
        )}
        {candidate.cover_letter && (
          <div>
            <h3 className="font-semibold text-foreground mb-2">Cover Letter</h3>
            <p className="text-sm text-neutral-400 whitespace-pre-wrap">{candidate.cover_letter}</p>
          </div>
        )}
      </div>

      <div className="p-6 rounded-xl border border-border bg-white">
        <h3 className="font-semibold text-foreground mb-4">Status</h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                candidate.status === s
                  ? "bg-primary text-white"
                  : "bg-neutral text-neutral-500 hover:bg-neutral-100"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        {emailStatus && (
          <p className={`text-sm mt-3 w-full ${emailStatus.includes("sent") ? "text-green-600" : emailStatus.includes("failed") ? "text-red-500" : "text-neutral-400"}`}>
            {emailStatus}
          </p>
        )}
        </div>
      </div>
    </div>
  );
}
