"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";
import { DEPARTMENTS } from "@/lib/constants";

export default function EditCareerPositionPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`/api/careers/positions/${params.id}`).then(r => r.json()).then(d => { setForm(d); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const requirements = (fd.get("requirements") as string).split("\n").filter(Boolean);
    const responsibilities = (fd.get("responsibilities") as string).split("\n").filter(Boolean);
    const body = { ...form, requirements, responsibilities, published: fd.get("published") === "true" };
    const res = await fetch(`/api/careers/positions/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) router.push("/admin/careers");
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/careers"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Edit Position</h1><p className="text-sm text-neutral-400 mt-1">{form.title}</p></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Title</Label><Input name="title" defaultValue={form.title} required /></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Department</Label>
            <select name="department" defaultValue={form.department} className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="space-y-2"><Label>Location</Label><Input name="location" defaultValue={form.location} required /></div>
          <div className="space-y-2">
            <Label>Type</Label>
            <select name="type" defaultValue={form.type} className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
        <div className="space-y-2"><Label>Description</Label><Textarea name="description" defaultValue={form.description} required rows={4} /></div>
        <div className="space-y-2"><Label>Requirements (one per line)</Label><Textarea name="requirements" defaultValue={Array.isArray(form.requirements) ? form.requirements.join("\n") : ""} rows={5} /></div>
        <div className="space-y-2"><Label>Responsibilities (one per line)</Label><Textarea name="responsibilities" defaultValue={Array.isArray(form.responsibilities) ? form.responsibilities.join("\n") : ""} rows={5} /></div>
        <div className="flex items-center gap-3">
          <Label>Status</Label>
          <select name="published" defaultValue={form.published ? "true" : "false"} className="px-3 py-2 rounded-lg border border-border bg-white text-sm">
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/careers"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
