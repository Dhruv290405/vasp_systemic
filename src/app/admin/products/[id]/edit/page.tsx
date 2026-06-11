"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<any>({});
  const [images, setImages] = useState<string[]>([]);
  const [trustBadges, setTrustBadges] = useState<string[]>([]);
  const [problemsSolved, setProblemsSolved] = useState<string[]>([]);
  const [suitableFor, setSuitableFor] = useState<string[]>([]);
  const [deploymentStats, setDeploymentStats] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(d => {
      setForm(d);
      const ext = d.extended_data || {};
      setImages(ext.images || [d.image_url].filter(Boolean));
      setTrustBadges(ext.trust_badges || []);
      setProblemsSolved(ext.problems_solved || []);
      setSuitableFor(ext.suitable_for || []);
      setDeploymentStats(
        ext.deployment_statistics
          ? Object.entries(ext.deployment_statistics).map(([key, value]) => ({ key, value: value as string }))
          : [{ key: "", value: "" }]
      );
      setLoading(false);
    });
  }, [id]);

  const addItem = (list: string[], setter: (v: string[]) => void) => setter([...list, ""]);
  const updateItem = (list: string[], setter: (v: string[]) => void, index: number, value: string) => {
    const next = [...list]; next[index] = value; setter(next);
  };
  const removeItem = (list: string[], setter: (v: string[]) => void, index: number) => setter(list.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const features = (fd.get("features") as string).split("\n").filter(Boolean);
    const benefits = (fd.get("benefits") as string).split("\n").filter(Boolean);
    const specPairs = (fd.get("specifications") as string).split("\n").filter(Boolean);
    const specifications: Record<string, string> = {};
    specPairs.forEach(line => { const [k, v] = line.split(":").map(s => s.trim()); if (k && v) specifications[k] = v; });
    const statsObj: Record<string, string> = {};
    deploymentStats.forEach(s => { if (s.key && s.value) statsObj[s.key] = s.value; });

    const body = {
      ...form,
      features, benefits, specifications,
      image_url: images[0] || "",
      published: fd.get("published") === "true",
      extended_data: {
        hero_title: fd.get("hero_title"),
        subheadline: fd.get("subheadline"),
        trust_badges: trustBadges.filter(Boolean),
        overview: fd.get("overview"),
        problems_solved: problemsSolved.filter(Boolean),
        smart_coach_integration: fd.get("smart_coach_integration"),
        technology_statement: fd.get("technology_statement"),
        suitable_for: suitableFor.filter(Boolean),
        deployment_statistics: statsObj,
        images: images,
        cta_text: fd.get("cta_text"),
        cta_link: fd.get("cta_link"),
      },
    };
    let res, data;
    try {
      res = await fetch(`/api/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      data = await res.json();
    } catch (e) {
      setError("Network error — check console"); setSaving(false); return;
    }
    if (!res.ok) { setError(data?.error || `HTTP ${res.status}`); setSaving(false); return; }
    router.push("/admin/products");
  };

  const inputClass = "w-full h-11 rounded-lg border border-border bg-white px-4 text-sm";
  const sectionClass = "border border-border rounded-xl p-6 space-y-4 bg-white";

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Edit Product</h1><p className="text-sm text-neutral-400 mt-1">{form.name}</p></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input name="name" defaultValue={form.name} required /></div>
            <div className="space-y-2"><Label>Category</Label><select name="category" defaultValue={form.category} className={inputClass}><option value="Hardware">Hardware</option><option value="Software">Software</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Status</Label><select name="published" defaultValue={form.published ? "true" : "false"} className={inputClass}><option value="false">Draft</option><option value="true">Published</option></select></div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Hero Section</h2>
          <div className="space-y-2"><Label>Hero Title</Label><Input name="hero_title" defaultValue={form.extended_data?.hero_title || ""} /></div>
          <div className="space-y-2"><Label>Subheadline</Label><Textarea name="subheadline" rows={2} defaultValue={form.extended_data?.subheadline || ""} /></div>
          <div className="space-y-2">
            <Label>Trust Badges</Label>
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={badge} onChange={(e) => updateItem(trustBadges, setTrustBadges, i, e.target.value)} />
                <button type="button" onClick={() => removeItem(trustBadges, setTrustBadges, i)} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(trustBadges, setTrustBadges)} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add Badge</button>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Content</h2>
          <div className="space-y-2"><Label>Overview</Label><Textarea name="overview" rows={4} defaultValue={form.extended_data?.overview || ""} /></div>
          <div className="space-y-2">
            <Label>Problems Solved</Label>
            {problemsSolved.map((prob, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={prob} onChange={(e) => updateItem(problemsSolved, setProblemsSolved, i, e.target.value)} />
                <button type="button" onClick={() => removeItem(problemsSolved, setProblemsSolved, i)} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(problemsSolved, setProblemsSolved)} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add Problem</button>
          </div>
          <div className="space-y-2"><Label>Smart Coach Integration</Label><Textarea name="smart_coach_integration" rows={3} defaultValue={form.extended_data?.smart_coach_integration || ""} /></div>
          <div className="space-y-2"><Label>Technology Statement</Label><Textarea name="technology_statement" rows={3} defaultValue={form.extended_data?.technology_statement || ""} /></div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Details</h2>
          <div className="space-y-2"><Label>Description</Label><Textarea name="description" defaultValue={form.description} required rows={3} /></div>
          <div className="space-y-2"><Label>Features (one per line)</Label><Textarea name="features" defaultValue={Array.isArray(form.features) ? form.features.join("\n") : ""} rows={4} /></div>
          <div className="space-y-2"><Label>Benefits (one per line)</Label><Textarea name="benefits" defaultValue={Array.isArray(form.benefits) ? form.benefits.join("\n") : ""} rows={4} /></div>
          <div className="space-y-2"><Label>Specifications (key: value per line)</Label><Textarea name="specifications" defaultValue={form.specifications ? Object.entries(form.specifications).map(([k, v]) => `${k}: ${v}`).join("\n") : ""} rows={4} /></div>
          <div className="space-y-2">
            <Label>Suitable For</Label>
            {suitableFor.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={item} onChange={(e) => updateItem(suitableFor, setSuitableFor, i, e.target.value)} />
                <button type="button" onClick={() => removeItem(suitableFor, setSuitableFor, i)} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(suitableFor, setSuitableFor)} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add</button>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Deployment Statistics</h2>
          {deploymentStats.map((stat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <Input placeholder="Label" value={stat.key} onChange={(e) => { const next = [...deploymentStats]; next[i].key = e.target.value; setDeploymentStats(next); }} className="w-1/2" />
              <Input placeholder="Value" value={stat.value} onChange={(e) => { const next = [...deploymentStats]; next[i].value = e.target.value; setDeploymentStats(next); }} className="w-1/2" />
              <button type="button" onClick={() => setDeploymentStats(deploymentStats.filter((_, j) => j !== i))} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
            </div>
          ))}
          <button type="button" onClick={() => setDeploymentStats([...deploymentStats, { key: "", value: "" }])} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add Stat</button>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Media</h2>
          <div className="space-y-2"><Label>Product Images</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {images.map((url, i) => (
                <div key={i} className="flex items-center gap-2 bg-neutral rounded-lg px-3 py-1.5 text-sm border border-border">
                  <span className="text-neutral-400 truncate max-w-[200px]">{url.split("/").pop()}</span>
                  <button type="button" onClick={() => setImages(images.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
                </div>
              ))}
            </div>
            <ImageUpload values={images} onChange={setImages} />
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Call to Action</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>CTA Text</Label><Input name="cta_text" defaultValue={form.extended_data?.cta_text || ""} /></div>
            <div className="space-y-2"><Label>CTA Link</Label><Input name="cta_link" defaultValue={form.extended_data?.cta_link || ""} /></div>
          </div>
        </div>

        {error && <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>}
        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/products"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
