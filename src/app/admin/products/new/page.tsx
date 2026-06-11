"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, ArrowLeft, Plus, X } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [trustBadges, setTrustBadges] = useState<string[]>([]);
  const [problemsSolved, setProblemsSolved] = useState<string[]>([]);
  const [suitableFor, setSuitableFor] = useState<string[]>([]);
  const [deploymentStats, setDeploymentStats] = useState<{ key: string; value: string }[]>([]);

  const addItem = (list: string[], setter: (v: string[]) => void) => {
    setter([...list, ""]);
  };
  const updateItem = (list: string[], setter: (v: string[]) => void, index: number, value: string) => {
    const next = [...list]; next[index] = value; setter(next);
  };
  const removeItem = (list: string[], setter: (v: string[]) => void, index: number) => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const features = (form.get("features") as string).split("\n").filter(Boolean);
    const benefits = (form.get("benefits") as string).split("\n").filter(Boolean);
    const specPairs = (form.get("specifications") as string).split("\n").filter(Boolean);
    const specifications: Record<string, string> = {};
    specPairs.forEach(line => { const [k, v] = line.split(":").map(s => s.trim()); if (k && v) specifications[k] = v; });

    const statsObj: Record<string, string> = {};
    deploymentStats.forEach(s => { if (s.key && s.value) statsObj[s.key] = s.value; });

    const body = {
      name: form.get("name"),
      slug: (form.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: form.get("description"),
      category: form.get("category"),
      features,
      benefits,
      specifications,
      image_url: images[0] || "",
      published: form.get("published") === "true",
      extended_data: {
        hero_title: form.get("hero_title"),
        subheadline: form.get("subheadline"),
        trust_badges: trustBadges.filter(Boolean),
        overview: form.get("overview"),
        problems_solved: problemsSolved.filter(Boolean),
        smart_coach_integration: form.get("smart_coach_integration"),
        technology_statement: form.get("technology_statement"),
        suitable_for: suitableFor.filter(Boolean),
        deployment_statistics: statsObj,
        images: images,
        cta_text: form.get("cta_text"),
        cta_link: form.get("cta_link"),
      },
    };
    const res = await fetch("/api/products", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (res.ok) router.push("/admin/products");
    setLoading(false);
  };

  const inputClass = "w-full h-11 rounded-lg border border-border bg-white px-4 text-sm";
  const sectionClass = "border border-border rounded-xl p-6 space-y-4 bg-white";

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Add Product</h1></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Basic Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input name="name" required placeholder="Product name" /></div>
            <div className="space-y-2"><Label>Category</Label><select name="category" className={inputClass}><option value="Hardware">Hardware</option><option value="Software">Software</option></select></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Status</Label><select name="published" className={inputClass}><option value="true">Published</option><option value="false">Draft</option></select></div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Hero Section</h2>
          <div className="space-y-2"><Label>Hero Title</Label><Input name="hero_title" placeholder="e.g. Transform Railway Operations" /></div>
          <div className="space-y-2"><Label>Subheadline</Label><Textarea name="subheadline" rows={2} placeholder="Brief description under the hero title" /></div>
          <div className="space-y-2">
            <Label>Trust Badges</Label>
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={badge} onChange={(e) => updateItem(trustBadges, setTrustBadges, i, e.target.value)} placeholder="e.g. ISO 9001 Certified" />
                <button type="button" onClick={() => removeItem(trustBadges, setTrustBadges, i)} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(trustBadges, setTrustBadges)} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add Badge</button>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Content</h2>
          <div className="space-y-2"><Label>Overview</Label><Textarea name="overview" rows={4} placeholder="Detailed overview of the product..." /></div>
          <div className="space-y-2">
            <Label>Problems Solved</Label>
            {problemsSolved.map((prob, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={prob} onChange={(e) => updateItem(problemsSolved, setProblemsSolved, i, e.target.value)} placeholder="e.g. Lack of real-time monitoring" />
                <button type="button" onClick={() => removeItem(problemsSolved, setProblemsSolved, i)} className="p-2 text-red-500"><X className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => addItem(problemsSolved, setProblemsSolved)} className="flex items-center gap-1 text-sm text-primary"><Plus className="w-3 h-3" /> Add Problem</button>
          </div>
          <div className="space-y-2"><Label>Smart Coach Integration</Label><Textarea name="smart_coach_integration" rows={3} placeholder="How this product integrates with VASP Smart Coach..." /></div>
          <div className="space-y-2"><Label>Technology Statement</Label><Textarea name="technology_statement" rows={3} placeholder="Technology behind the product..." /></div>
        </div>

        <div className={sectionClass}>
          <h2 className="text-lg font-bold text-foreground">Details</h2>
          <div className="space-y-2"><Label>Description</Label><Textarea name="description" required rows={3} /></div>
          <div className="space-y-2"><Label>Features (one per line)</Label><Textarea name="features" rows={4} placeholder="Feature 1&#x0a;Feature 2" /></div>
          <div className="space-y-2"><Label>Benefits (one per line)</Label><Textarea name="benefits" rows={4} placeholder="Benefit 1&#x0a;Benefit 2" /></div>
          <div className="space-y-2"><Label>Specifications (key: value per line)</Label><Textarea name="specifications" rows={4} placeholder="Processor: ARM Cortex&#x0a;RAM: 4GB" /></div>
          <div className="space-y-2">
            <Label>Suitable For</Label>
            {suitableFor.map((item, i) => (
              <div key={i} className="flex gap-2 items-center">
                <Input value={item} onChange={(e) => updateItem(suitableFor, setSuitableFor, i, e.target.value)} placeholder="e.g. Railway Operators" />
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
              <Input placeholder="Label (e.g. Deployed)" value={stat.key} onChange={(e) => { const next = [...deploymentStats]; next[i].key = e.target.value; setDeploymentStats(next); }} className="w-1/2" />
              <Input placeholder="Value (e.g. 50+ Railways)" value={stat.value} onChange={(e) => { const next = [...deploymentStats]; next[i].value = e.target.value; setDeploymentStats(next); }} className="w-1/2" />
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
            <div className="space-y-2"><Label>CTA Text</Label><Input name="cta_text" placeholder="e.g. Request Demo" /></div>
            <div className="space-y-2"><Label>CTA Link</Label><Input name="cta_link" placeholder="e.g. /contact?type=demo" /></div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/products"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
