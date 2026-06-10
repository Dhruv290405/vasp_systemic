import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { COMPANY, SOLUTIONS, INDUSTRIES } from "@/lib/constants";

const footerLinks = {
  solutions: SOLUTIONS.slice(0, 4).map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
  industries: INDUSTRIES.map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  company: [
    { label: "About Us", href: "/about" },
    { label: "Technology", href: "/technology" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-700 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-6" style={{ maxWidth: "280px" }}>
              <Image
                src="/vasplogogo.png"
                alt="VASP Systemic"
                width={280}
                height={82}
                priority
                style={{ imageRendering: "auto", objectFit: "contain", width: "100%", height: "auto" }}
              />
            </Link>
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">VASP SYSTEMIC</h3>
            <p className="text-white/80 font-medium text-sm mb-2">Railway IoT Solutions</p>
            <p className="text-secondary text-xs font-medium tracking-wider mb-4">Safety • Comfort • Digital Operations</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              Building India's Intelligent Railway Operations Ecosystem with AI, IoT, and Safety solutions for enterprise and government.
            </p>
            <div className="space-y-3">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-sm text-white/60 hover:text-secondary transition-colors">
                <Mail size={16} />
                {COMPANY.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-white/60">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Solutions</h4>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Industries</h4>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-white/40 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-white/40 hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
