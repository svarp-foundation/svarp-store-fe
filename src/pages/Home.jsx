import HeroSection from "../components/HeroSection";
import BestSellers from "../components/BestSellers";
import Collections from "../components/Collections";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SEOHead from "../components/utils/SEOHead";

const Home = () => {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : (import.meta.env.VITE_SITE_URL || "https://bodywellness.svarp.org");

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "SVARP Body Wellness",
        "url": `${siteUrl}/`,
        "logo": "https://svarp.org/company/svarp-logo.webp",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61590402162054",
          "https://www.instagram.com/svarpglobal/?hl=en",
          "https://x.com/svarpglobal",
          "https://www.linkedin.com/company/svarpglobal"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9917759966",
          "contactType": "customer service",
          "email": "info@svarp.org"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": `${siteUrl}/`,
        "name": "SVARP Body Wellness",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="Home — Sustainable & Organic Living"
        description="SVARP Body Wellness — Promoting healthy lifestyle through natural, organic and sustainable products. Shop spices, cold-pressed oils, and urban farming setups."
        schemaJson={homeSchema}
      />
      <HeroSection />
      <Features />
      <BestSellers />
      <Collections />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;
