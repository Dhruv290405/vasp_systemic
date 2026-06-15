"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, Search } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES } from "@/lib/constants";

const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

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
              excerpt: p.excerpt || "",
              category: p.category || "General",
              author: p.author || "VASP Systemic Team",
              date: p.created_at?.split("T")[0] || "",
              image: p.image_url ? `bg-cover bg-center` : "bg-gradient-to-br from-primary/20 to-primary/5",
            }));
          setPosts(mapped);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayed = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <section className="pt-32 pb-20 gradient-dark relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Blog</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Insights, analysis, and thought leadership on railway technology, AI, IoT, and smart infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionWrapper>
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-300" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setActiveCategory("All"); setVisibleCount(ITEMS_PER_PAGE); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === "All" ? "bg-primary text-white" : "bg-neutral text-neutral-500 hover:bg-neutral-100"
              }`}
            >
              All
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(ITEMS_PER_PAGE); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat ? "bg-primary text-white" : "bg-neutral text-neutral-500 hover:bg-neutral-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400">{posts.length === 0 ? "No blog posts published yet. Check back soon." : "No articles found matching your criteria."}</p>
          </div>
        ) : (
          <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <div className="h-full rounded-xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all duration-300">
                    <div className={`h-48 ${post.image} p-6`}>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-neutral-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-3">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleCount(v => v + ITEMS_PER_PAGE)}
                className="px-6 py-3 rounded-lg border border-border bg-white text-foreground font-medium hover:bg-neutral transition-colors"
              >
                Load More Articles
              </button>
            </div>
          )}
          </>
        )}
      </SectionWrapper>

      <section className="py-20 bg-neutral">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-neutral-400 mb-6">Stay updated with the latest in railway technology and VASP Systemic news.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input type="email" placeholder="your@email.com" className="flex-1" />
            <Button variant="primary">Subscribe</Button>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-primary relative overflow-hidden">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want to Contribute?</h2>
          <p className="text-white/70 mb-8">We welcome guest posts from industry experts. Share your knowledge with our audience.</p>
          <Link href="/contact">
            <Button variant="secondary" size="xl">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
