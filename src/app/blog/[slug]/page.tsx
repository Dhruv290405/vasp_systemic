"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTASection } from "@/components/sections/cta";

export default function BlogPostPage() {
  const params = useParams();
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const slug = params.slug as string;

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data
            .filter((p: any) => p.published)
            .map((p: any) => ({
              title: p.title,
              slug: p.slug,
              content: p.content || "",
              excerpt: p.excerpt || "",
              category: p.category || "General",
              author: p.author || "VASP Systemic Team",
              date: p.created_at?.split("T")[0] || "",
              image: "bg-gradient-to-br from-primary/20 to-primary/5",
            }));
          setAllPosts(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const post = allPosts.find((p) => p.slug === slug);

  if (!post && !loading) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Button>
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <Badge variant="secondary" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-400">Share this article</div>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm">LinkedIn</Button>
                <Button variant="ghost" size="sm">Twitter</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {allPosts.filter((p) => p.slug !== post.slug).slice(0, 3).map((related) => (
              <Link key={related.slug} href={`/blog/${related.slug}`} className="group">
                <div className="p-6 rounded-xl bg-white border border-border hover:shadow-md transition-all">
                  <Badge variant="secondary" className="mb-3">{related.category}</Badge>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{related.title}</h3>
                  <p className="text-sm text-neutral-400 line-clamp-2">{related.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
