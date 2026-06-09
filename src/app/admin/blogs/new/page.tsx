"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { BLOG_CATEGORIES } from "@/lib/constants";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const body = {
      title: form.get("title"),
      slug: (form.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      excerpt: form.get("excerpt"),
      content: form.get("content"),
      category: form.get("category"),
      author: form.get("author") || "VASP Systemic",
      image_url: form.get("image_url") || "",
      published: form.get("published") === "true",
    };
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) router.push("/admin/blogs");
    setLoading(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blogs"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" />Back</Button></Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Blog Post</h1>
          <p className="text-neutral-400 mt-1">Create a new blog post.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-8 rounded-xl border border-border bg-white space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required placeholder="Enter blog post title" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue="Railway Technology">
              {BLOG_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" placeholder="VASP Systemic" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" required rows={2} placeholder="Brief description for cards and previews" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content (Markdown supported)</Label>
          <Textarea id="content" name="content" required rows={12} placeholder="Write your blog content here..." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input id="image_url" name="image_url" placeholder="https://example.com/image.jpg" />
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="published">Status</Label>
          <select id="published" name="published" className="px-3 py-2 rounded-lg border border-border bg-white text-sm">
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Link href="/admin/blogs"><Button variant="outline" type="button">Cancel</Button></Link>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : "Save Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
