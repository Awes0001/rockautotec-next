import type { MetadataRoute } from "next";

const BASE_URL = "https://www.rockautotec.com";

const CATEGORY_SLUGS = [
  "engine", "brakes", "suspension", "cooling",
  "electrical", "fuel", "transmission", "exhaust", "filters", "body",
];

const MAKE_SLUGS = [
  "ford", "chevrolet", "gmc", "ram", "dodge", "jeep",
  "toyota", "honda", "nissan", "hyundai", "kia", "mazda",
  "subaru", "volkswagen", "audi", "bmw", "mercedes-benz", "lexus",
  "acura", "infiniti", "cadillac", "buick", "lincoln", "mitsubishi",
  "volvo", "tesla",
];

const BRAND_SLUGS = [
  "bosch", "acdelco", "gates", "monroe", "moog", "ngk",
  "dorman", "raybestos", "delphi", "fel-pro", "bilstein", "stoptech",
  "kyb", "denso", "motorcraft", "standard",
];

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,              changeFrequency: "daily",   priority: 1.0 },
  { url: `${BASE_URL}/parts`,   changeFrequency: "weekly",  priority: 0.9 },
  { url: `${BASE_URL}/search`,  changeFrequency: "weekly",  priority: 0.8 },
  { url: `${BASE_URL}/cart`,    changeFrequency: "monthly", priority: 0.4 },
  { url: `${BASE_URL}/checkout`,changeFrequency: "monthly", priority: 0.4 },
  { url: `${BASE_URL}/login`,   changeFrequency: "monthly", priority: 0.3 },
  { url: `${BASE_URL}/orders`,  changeFrequency: "monthly", priority: 0.3 },
  { url: `${BASE_URL}/profile`, changeFrequency: "monthly", priority: 0.3 },
  // Business pages
  { url: `${BASE_URL}/about`,    changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`,  changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/fleet`,    changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/fitment`,  changeFrequency: "monthly", priority: 0.7 },
  // Policy pages
  { url: `${BASE_URL}/shipping`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/returns`,  changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/warranty`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/privacy`,  changeFrequency: "yearly",  priority: 0.3 },
  { url: `${BASE_URL}/terms`,    changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const makePages: MetadataRoute.Sitemap = MAKE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/make/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const brandPages: MetadataRoute.Sitemap = BRAND_SLUGS.map((slug) => ({
    url: `${BASE_URL}/brand/${slug}`,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...STATIC_PAGES, ...categoryPages, ...makePages, ...brandPages];
}
