"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";

export default function NewCareerPositionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const requirements = (fd.get("requirements") as string).split("\n").filter(Boolean);
    const responsibilities = (fd.get("responsibilities") as string).split("\n").filter(Boolean);
    const body = {
      title: fd.get("title"), slug: (fd.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      department: fd.get("department"), location: fd.get("location"), type: fd.get("type"),
      description: fd.get("description"), requirements, responsibilities, published: fd.get("published") === "true",
    };
    const res = await fetch("/api/careers/positions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) router.push("/admin/careers");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/careers"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">New Position</h1></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Title</Label><Input name="title" required placeholder="e.g. Senior AI/ML Engineer" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <select name="department" className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2"><Label>Location</Label><Input name="location" required placeholder="India" /></div>
          <div className="space-y-2">
            <Label>Type</Label>
            <select name="type" className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
        <div className="space-y-2"><Label>Description</Label><Textarea name="description" required rows={4} /></div>
        <div className="space-y-2"><Label>Requirements (one per line)</Label><Textarea name="requirements" rows={5} /></div>
        <div className="space-y-2"><Label>Responsibilities (one per line)</Label><Textarea name="responsibilities" rows={5} /></div>
        <div className="flex items-center gap-3">
          <Label>Status</Label>
          <select name="published" className="px-3 py-2 rounded-lg border border-border bg-white text-sm">
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/careers"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Position"}
          </Button>
        </div>
      </form>
    </div>
  );
}
