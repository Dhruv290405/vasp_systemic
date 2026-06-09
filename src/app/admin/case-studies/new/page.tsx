"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowLeft } from "lucide-react";

export default function NewCaseStudyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const tech = (fd.get("technology") as string).split("\n").filter(Boolean);
    const metrics: Record<string, string> = {};
    (fd.get("metrics") as string).split("\n").filter(Boolean).forEach(line => {
      const [k, v] = line.split(":").map(s => s.trim());
      if (k && v) metrics[k] = v;
    });
    const body = {
      title: fd.get("title"), slug: (fd.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      client: fd.get("client"), problem: fd.get("problem"), solution: fd.get("solution"),
      implementation: fd.get("implementation"), results: fd.get("results"), impact: fd.get("impact"),
      technology: tech, metrics, image_url: fd.get("image_url") || "", published: fd.get("published") === "true",
    };
    const res = await fetch("/api/case-studies", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) router.push("/admin/case-studies");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/case-studies"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">New Case Study</h1></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Title</Label><Input name="title" required /></div>
        <div className="space-y-2"><Label>Client</Label><Input name="client" required /></div>
        <div className="space-y-2"><Label>Problem</Label><Textarea name="problem" required rows={3} /></div>
        <div className="space-y-2"><Label>Solution</Label><Textarea name="solution" required rows={3} /></div>
        <div className="space-y-2"><Label>Implementation</Label><Textarea name="implementation" rows={3} /></div>
        <div className="space-y-2"><Label>Results</Label><Textarea name="results" required rows={3} /></div>
        <div className="space-y-2"><Label>Impact</Label><Textarea name="impact" rows={2} /></div>
        <div className="space-y-2"><Label>Technology (one per line)</Label><Textarea name="technology" rows={3} /></div>
        <div className="space-y-2"><Label>Metrics (key: value per line)</Label><Textarea name="metrics" rows={3} placeholder="Cost Reduction: 35%&#x0a;Efficiency Gain: 40%" /></div>
        <div className="space-y-2"><Label>Image URL</Label><Input name="image_url" /></div>
        <div className="flex items-center gap-3">
          <Label>Status</Label>
          <select name="published" className="px-3 py-2 rounded-lg border border-border bg-white text-sm">
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/case-studies"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Case Study"}
          </Button>
        </div>
      </form>
    </div>
  );
}
