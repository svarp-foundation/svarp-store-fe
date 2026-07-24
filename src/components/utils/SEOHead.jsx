import { useEffect } from "react";

export default function SEOHead({
  title,
  description = "SVARP Body Wellness — Promoting healthy lifestyle through natural, organic and sustainable products. Shop organic food, cold pressed oils, eco clothing, sustainable jewellery, and hydroponic setups.",
  keywords = "SVARP, Body Wellness, Organic Food, Cold Pressed Oil, Hydroponics, Natural Living, Organic Clothing, Hemp Wear, Sustainable Jewellery, Handcrafted Ornaments, Health Supplements",
  canonicalUrl,
  ogType = "website",
  ogImage = "https://svarp.org/company/svarp-logo.webp",
  schemaJson,
}) {
  useEffect(() => {
    // 1. Dynamic Page Title
    const siteTitle = title
      ? `${title} | SVARP Body Wellness`
      : "SVARP BODY WELLNESS LLP | Sustainable & Organic Products";
    document.title = siteTitle;

    // Helper to set or update meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Standard Meta Tags
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // 3. Open Graph Meta Tags (Facebook/WhatsApp/Telegram previews)
    setMetaTag("property", "og:title", siteTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "SVARP Body Wellness");
    setMetaTag("property", "og:url", canonicalUrl || window.location.href);

    // 4. Twitter Card Meta Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:site", "@svarpglobal");
    setMetaTag("name", "twitter:title", siteTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // 5. Canonical URL & Favicon Links
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute("href", canonicalUrl || window.location.href);

    let iconElement = document.querySelector('link[rel="icon"]');
    if (!iconElement) {
      iconElement = document.createElement("link");
      iconElement.setAttribute("rel", "icon");
      document.head.appendChild(iconElement);
    }
    iconElement.setAttribute("type", "image/webp");
    iconElement.setAttribute("href", "https://svarp.org/company/svarp-logo.webp");

    // 6. Structured Data (Schema.org JSON-LD)
    let jsonLdElement = document.getElementById("json-ld-schema");
    if (schemaJson) {
      if (!jsonLdElement) {
        jsonLdElement = document.createElement("script");
        jsonLdElement.setAttribute("id", "json-ld-schema");
        jsonLdElement.setAttribute("type", "application/ld+json");
        document.head.appendChild(jsonLdElement);
      }
      jsonLdElement.textContent = JSON.stringify(schemaJson);
    } else if (jsonLdElement) {
      jsonLdElement.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, schemaJson]);

  return null;
}
