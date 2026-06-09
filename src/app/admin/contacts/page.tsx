"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, ExternalLink, Search } from "lucide-react";
import type { ContactSubmission } from "@/types";

const typeColors: Record<string, "primary" | "secondary" | "success" | "warning"> = {
  demo: "secondary",
  business: "primary",
  partnership: "success",
  general: "warning",
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch("/api/contacts");
    if (res.ok) setContacts(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchContacts(); }, []);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this contact request?")) return;
    const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    if (res.ok) fetchContacts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Requests</h1>
          <p className="text-neutral-400 mt-1">Manage incoming inquiries.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
          <Input placeholder="Search by name or email..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64" />
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-medium mb-1">No contact requests found</p>
            <p className="text-sm">{searchQuery ? "Try a different search term." : "Inquiries will appear here."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral">
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Name</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Email</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Type</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Date</th>
                <th className="text-right p-4 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-neutral/50">
                  <td className="p-4 text-sm font-medium text-foreground">{c.name}</td>
                  <td className="p-4 text-sm text-neutral-400">{c.email}</td>
                  <td className="p-4"><Badge variant={typeColors[c.type] || "neutral"}>{c.type}</Badge></td>
                  <td className="p-4 text-sm text-neutral-400">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <Link href={`/admin/contacts/${c.id}`}><Button variant="ghost" size="sm"><ExternalLink className="w-3 h-3 mr-1" />View</Button></Link>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(c.id)}><Trash2 className="w-3 h-3" /></Button>
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
