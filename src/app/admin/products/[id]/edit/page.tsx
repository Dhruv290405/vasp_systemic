"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, ArrowLeft } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(`/api/products/${id}`).then(r => r.json()).then(d => { setForm(d); setImageUrl(d.image_url || ""); setLoading(false); });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.target as HTMLFormElement);
    const features = (fd.get("features") as string).split("\n").filter(Boolean);
    const benefits = (fd.get("benefits") as string).split("\n").filter(Boolean);
    const specPairs = (fd.get("specifications") as string).split("\n").filter(Boolean);
    const specifications: Record<string, string> = {};
    specPairs.forEach(line => { const [k, v] = line.split(":").map(s => s.trim()); if (k && v) specifications[k] = v; });
    const body = { ...form, features, benefits, specifications, image_url: imageUrl, published: fd.get("published") === "true" };
    const res = await fetch(`/api/products/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) router.push("/admin/products");
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Edit Product</h1><p className="text-sm text-neutral-400 mt-1">{form.name}</p></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Name</Label><Input name="name" defaultValue={form.name} required /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select name="category" defaultValue={form.category} className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <select name="published" defaultValue={form.published ? "true" : "false"} className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="false">Draft</option>
              <option value="true">Published</option>
            </select>
          </div>
        </div>
        <div className="space-y-2"><Label>Description</Label><Textarea name="description" defaultValue={form.description} required rows={3} /></div>
        <div className="space-y-2"><Label>Features (one per line)</Label><Textarea name="features" defaultValue={Array.isArray(form.features) ? form.features.join("\n") : ""} rows={4} /></div>
        <div className="space-y-2"><Label>Benefits (one per line)</Label><Textarea name="benefits" defaultValue={Array.isArray(form.benefits) ? form.benefits.join("\n") : ""} rows={4} /></div>
        <div className="space-y-2"><Label>Specifications (key: value per line)</Label><Textarea name="specifications" defaultValue={form.specifications ? Object.entries(form.specifications).map(([k, v]) => `${k}: ${v}`).join("\n") : ""} rows={4} /></div>
        <div className="space-y-2"><Label>Product Image</Label><ImageUpload value={imageUrl} onChange={setImageUrl} /></div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/products"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
