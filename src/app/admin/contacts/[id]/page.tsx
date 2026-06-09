"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import type { ContactSubmission } from "@/types";

export default function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [contact, setContact] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/contacts/${id}`).then(r => r.json()).then(d => { setContact(d); setLoading(false); });
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Delete this contact request?")) return;
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    router.push("/admin/contacts");
  };

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  if (!contact) return <div className="text-center py-16 text-neutral-400">Contact not found.</div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/contacts"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
          <div><h1 className="text-2xl font-bold text-foreground">{contact.name}</h1></div>
        </div>
        <Button variant="ghost" size="sm" className="text-red-500" onClick={handleDelete}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
      </div>
      <div className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div><Label>Name</Label><p className="text-sm font-medium text-foreground mt-1">{contact.name}</p></div>
          <div><Label>Email</Label><p className="text-sm text-foreground mt-1">{contact.email}</p></div>
          <div><Label>Phone</Label><p className="text-sm text-neutral-400 mt-1">{contact.phone || "—"}</p></div>
          <div><Label>Company</Label><p className="text-sm text-neutral-400 mt-1">{contact.company || "—"}</p></div>
          <div><Label>Type</Label><div className="mt-1"><Badge variant="primary">{contact.type}</Badge></div></div>
          <div><Label>Date</Label><p className="text-sm text-neutral-400 mt-1">{new Date(contact.created_at).toLocaleString()}</p></div>
        </div>
        <div className="pt-4 border-t border-border">
          <Label>Message</Label>
          <p className="text-sm text-neutral-400 mt-2 whitespace-pre-wrap">{contact.message}</p>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">{children}</span>;
}
