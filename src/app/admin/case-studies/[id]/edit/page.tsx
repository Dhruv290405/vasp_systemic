"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

export default function EditCaseStudyPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    fetch(`/api/case-studies/${params.id}`).then(r => r.json()).then(d => { setForm(d); setLoading(false); });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const tech = (fd.get("technology") as string).split("\n").filter(Boolean);
    const metrics: Record<string, string> = {};
    (fd.get("metrics") as string).split("\n").filter(Boolean).forEach(line => {
      const [k, v] = line.split(":").map(s => s.trim());
      if (k && v) metrics[k] = v;
    });
    const body = { ...form, technology: tech, metrics, published: fd.get("published") === "true" };
    const res = await fetch(`/api/case-studies/${params.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) router.push("/admin/case-studies");
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/case-studies"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Edit Case Study</h1><p className="text-sm text-neutral-400 mt-1">{form.title}</p></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Title</Label><Input name="title" defaultValue={form.title} required /></div>
        <div className="space-y-2"><Label>Client</Label><Input name="client" defaultValue={form.client} required /></div>
        <div className="space-y-2"><Label>Problem</Label><Textarea name="problem" defaultValue={form.problem} required rows={3} /></div>
        <div className="space-y-2"><Label>Solution</Label><Textarea name="solution" defaultValue={form.solution} required rows={3} /></div>
        <div className="space-y-2"><Label>Implementation</Label><Textarea name="implementation" defaultValue={form.implementation} rows={3} /></div>
        <div className="space-y-2"><Label>Results</Label><Textarea name="results" defaultValue={form.results} required rows={3} /></div>
        <div className="space-y-2"><Label>Impact</Label><Textarea name="impact" defaultValue={form.impact} rows={2} /></div>
        <div className="space-y-2"><Label>Technology (one per line)</Label><Textarea name="technology" defaultValue={Array.isArray(form.technology) ? form.technology.join("\n") : ""} rows={3} /></div>
        <div className="space-y-2"><Label>Metrics (key: value per line)</Label><Textarea name="metrics" defaultValue={form.metrics ? Object.entries(form.metrics).map(([k, v]) => `${k}: ${v}`).join("\n") : ""} rows={3} /></div>
        <div className="space-y-2"><Label>Image URL</Label><Input name="image_url" defaultValue={form.image_url || ""} /></div>
        <div className="flex items-center gap-3">
          <Label>Status</Label>
          <select name="published" defaultValue={form.published ? "true" : "false"} className="px-3 py-2 rounded-lg border border-border bg-white text-sm">
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/case-studies"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
