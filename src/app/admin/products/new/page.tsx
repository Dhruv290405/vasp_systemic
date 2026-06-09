"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/ui/image-upload";
import { Loader2, ArrowLeft } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const features = (form.get("features") as string).split("\n").filter(Boolean);
    const benefits = (form.get("benefits") as string).split("\n").filter(Boolean);
    const specPairs = (form.get("specifications") as string).split("\n").filter(Boolean);
    const specifications: Record<string, string> = {};
    specPairs.forEach(line => { const [k, v] = line.split(":").map(s => s.trim()); if (k && v) specifications[k] = v; });

    const body = {
      name: form.get("name"),
      slug: (form.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      description: form.get("description"),
      category: form.get("category"),
      features,
      benefits,
      specifications,
      image_url: imageUrl,
      published: form.get("published") === "true",
    };
    const res = await fetch("/api/products", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (res.ok) router.push("/admin/products");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div><h1 className="text-2xl font-bold text-foreground">Add Product</h1></div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2"><Label>Name</Label><Input name="name" required placeholder="Product name" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select name="category" className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <select name="published" className="w-full h-11 rounded-lg border border-border bg-white px-4 text-sm">
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>
        </div>
        <div className="space-y-2"><Label>Description</Label><Textarea name="description" required rows={3} /></div>
        <div className="space-y-2"><Label>Features (one per line)</Label><Textarea name="features" rows={4} placeholder="Feature 1&#x0a;Feature 2" /></div>
        <div className="space-y-2"><Label>Benefits (one per line)</Label><Textarea name="benefits" rows={4} placeholder="Benefit 1&#x0a;Benefit 2" /></div>
        <div className="space-y-2"><Label>Specifications (key: value per line)</Label><Textarea name="specifications" rows={4} placeholder="Processor: ARM Cortex&#x0a;RAM: 4GB" /></div>
        <div className="space-y-2"><Label>Product Image</Label><ImageUpload value={imageUrl} onChange={setImageUrl} /></div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/products"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
