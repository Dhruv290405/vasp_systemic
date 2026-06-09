import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vaspsystemic.com";

  const routes = [
    "",
    "/about",
    "/solutions",
    "/products",
    "/industries",
    "/technology",
    "/case-studies",
    "/careers",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const solutionSlugs = [
    "railway-iot-platform",
    "coach-monitoring-system",
    "asset-monitoring",
    "predictive-maintenance",
    "safety-intelligence-system",
    "real-time-alerts",
    "ai-analytics-platform",
    "operations-dashboard",
  ];

  const solutionRoutes = solutionSlugs.map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industrySlugs = [
    "indian-railways",
    "metro-rail",
    "freight-rail",
    "industrial-iot",
    "smart-infrastructure",
  ];

  const industryRoutes = industrySlugs.map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogSlugs = [
    "ai-predictive-maintenance-indian-railways",
    "iot-railway-safety-systems",
    "digital-twin-railway-infrastructure",
    "edge-computing-railway-operations",
    "safety-engineering-railway-systems",
    "future-freight-rail-automation",
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...routes,
    ...solutionRoutes,
    ...industryRoutes,
    ...blogRoutes,
  ];
}
