"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, ExternalLink, Trash2, Search } from "lucide-react";
import type { BlogPost } from "@/types";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/blogs");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (res.ok) fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-neutral-400 mt-1">Manage your blog content.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            <Input placeholder="Search posts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9 w-64" />
          </div>
          <Link href="/admin/blogs/new"><Button variant="primary"><Plus className="w-4 h-4 mr-1" />New Post</Button></Link>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-white overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-400">
            <p className="text-lg font-medium mb-1">No blog posts found</p>
            <p className="text-sm">{searchQuery ? "Try a different search term." : "Create your first blog post to get started."}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral">
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Title</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Category</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-neutral-400">Date</th>
                <th className="text-right p-4 text-sm font-medium text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0 hover:bg-neutral/50">
                  <td className="p-4 text-sm font-medium text-foreground">{post.title}</td>
                  <td className="p-4 text-sm text-neutral-400">{post.category}</td>
                  <td className="p-4"><Badge variant={post.published ? "success" : "warning"}>{post.published ? "published" : "draft"}</Badge></td>
                  <td className="p-4 text-sm text-neutral-400">{new Date(post.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-1">
                    <Link href={`/admin/blogs/${post.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link>
                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(post.id)}><Trash2 className="w-3 h-3" /></Button>
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
