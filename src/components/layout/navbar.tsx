"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SOLUTIONS } from "@/lib/constants";
const BASE_NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Solutions",
    href: "/solutions",
    dropdown: SOLUTIONS.map((s) => ({
      label: s.title,
      href: `/solutions/${s.slug}`,
      description: s.description,
    })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Technology", href: "/technology" },
  { label: "Contact", href: "/contact" },
  {
    label: "More",
    href: "#",
    dropdown: [
      { label: "Case Studies", href: "/case-studies", description: "Real-world railway transformation stories" },
      { label: "Blog", href: "/blog", description: "Insights on railway technology and innovation" },
      { label: "Careers", href: "/careers", description: "Join the VASP Systemic team" },
    ],
  },
];

function useDropdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onEnter = (i: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenIndex(i);
  };
  const onLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenIndex(null), 150);
  };

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  return { openIndex, onEnter, onLeave, setOpenIndex };
}

function NavLink({
  item,
  index,
  scrolled,
  openIndex,
  onEnter,
  onLeave,
  onClick,
}: {
  item: any;
  index: number;
  scrolled: boolean;
  openIndex: number | null;
  onEnter: (i: number) => void;
  onLeave: () => void;
  onClick?: () => void;
}) {
  const hasDropdown = "dropdown" in item && item.dropdown;
  const pathname = usePathname();
  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

  return (
    <div
      className="relative"
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
    >
      {hasDropdown ? (
        <button
          onClick={onClick}
          className={cn(
            "flex items-center gap-1 py-1.5 text-[13px] font-medium transition-colors group",
            "text-neutral-500 hover:text-primary"
          )}
        >
          {item.label}
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", openIndex === index && "rotate-180")} />
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={onClick}
          className={cn(
            "relative py-1.5 text-[13px] font-medium transition-colors group",
            isActive
              ? "text-primary"
              : "text-neutral-500 hover:text-primary"
          )}
        >
          {item.label}
          <span className={cn(
            "absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300",
            isActive ? "w-full" : "w-0 group-hover:w-full"
          )} />
        </Link>
      )}
      {hasDropdown && (
        <AnimatePresence>
          {openIndex === index && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
            >
              <div className="bg-white rounded-xl shadow-xl border border-border py-2 min-w-[240px] w-max max-w-[320px]">
                {item.dropdown!.map((d: any) => (
                  <Link
                    key={d.label}
                    href={d.href}
                    onClick={onClick}
                    className="block px-5 py-3 hover:bg-neutral transition-colors group/dd"
                  >
                    <div className="text-sm font-medium text-foreground group-hover/dd:text-primary transition-colors">{d.label}</div>
                    {d.description && (
                      <div className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{d.description}</div>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productItems, setProductItems] = useState<{ label: string; href: string; description: string }[]>([]);
  const { openIndex, onEnter, onLeave, setOpenIndex } = useDropdown();

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const items = data
            .filter((p: any) => p.published)
            .map((p: any) => {
              const ext = p.extended_data || {};
              const slug = p.slug || p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return {
                label: ext.hero_title || p.name,
                href: `/products/${slug}`,
                description: ext.subheadline || p.description || "",
              };
            });
          setProductItems(items);
        }
      })
      .catch(() => {});
  }, []);

  const NAV_ITEMS = [
    ...BASE_NAV_ITEMS.slice(0, 2),
    {
      label: "Products",
      href: "/products",
      dropdown: productItems.length > 0 ? productItems : [{ label: "View All Products", href: "/products", description: "Browse our product catalog" }],
    },
    ...BASE_NAV_ITEMS.slice(2),
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setOpenIndex(null); setIsOpen(false); }, [pathname, setOpenIndex]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md",
        scrolled && "shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-border"
      )}
    >
      <div className="mx-auto" style={{ maxWidth: "1440px" }}>
        <nav className="flex items-center justify-between h-16 lg:h-20 px-4 lg:px-8">
          {/* LEFT: Logo */}
          <Link href="/" className="shrink-0">
            <Image src="/vasplogogo.png" alt="VASP Systemic" width={2560} height={748} priority style={{ imageRendering: "auto", objectFit: "contain", height: "40px", width: "auto" }} className="lg:h-[56px] h-[40px] w-auto" />
          </Link>

          {/* CENTER: Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-4 xl:gap-5">
              {NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={item.label}
                  item={item}
                  index={i}
                  scrolled={scrolled}
                  openIndex={openIndex}
                  onEnter={onEnter}
                  onLeave={onLeave}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/admin/login"
              className="text-[13px] font-medium text-neutral-400 hover:text-primary transition-colors px-1"
            >
              Sign In
            </Link>
            <Link href="/contact">
              <button
                className="px-4 py-1.5 text-[13px] font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
              >
                Contact Sales
              </button>
            </Link>
            <Link href="/contact?type=demo">
              <button className="px-4 py-1.5 text-[13px] font-semibold rounded-lg bg-[#F97316] text-white hover:bg-[#e56710] transition-all duration-200 shadow-sm hover:shadow-md">
                Request Demo
              </button>
            </Link>
          </div>

          {/* MOBILE: Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <Link href="/contact?type=demo" className="lg:hidden">
              <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#F97316] text-white">
                Demo
              </button>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors text-foreground"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border shadow-lg overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1 max-h-[70vh] overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = "dropdown" in item && item.dropdown;
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <details className="group">
                        <summary className="flex items-center justify-between px-4 py-3 text-sm font-medium text-neutral-500 hover:text-primary hover:bg-neutral rounded-lg cursor-pointer list-none transition-colors">
                          {item.label}
                          <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="ml-4 mt-1 space-y-0.5 pb-2">
                          {item.dropdown!.map((d: any) => (
                            <Link
                              key={d.label}
                              href={d.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2.5 text-sm text-neutral-400 hover:text-primary hover:bg-neutral rounded-lg transition-colors"
                            >
                              {d.label}
                            </Link>
                          ))}
                        </div>
                      </details>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                          isActive ? "text-primary bg-primary/5" : "text-neutral-500 hover:text-primary hover:bg-neutral"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
              <div className="pt-4 border-t border-border space-y-2 mt-4">
                <Link href="/admin/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2.5 text-sm font-medium text-neutral-400 hover:text-primary transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                    Contact Sales
                  </button>
                </Link>
                <Link href="/contact?type=demo" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#F97316] text-white hover:bg-[#e56710] transition-colors">
                    Request Demo
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
