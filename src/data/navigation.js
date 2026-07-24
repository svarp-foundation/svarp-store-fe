export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about" },
  { name: "Our Mission", path: "/mission" },
];

export const footerLinks = {
  contactInfo: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "",
    phone: import.meta.env.VITE_CONTACT_PHONE || "",
    address: import.meta.env.VITE_CONTACT_ADDRESS || "",
  },
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Our Mission", path: "/mission" },
  ],
  categories: [
    { name: "Health & Wellness", path: "/shop?category=Wellness" },
    { name: "Organic Food", path: "/shop?category=Food" },
    { name: "Farming Solutions", path: "/shop?category=Farming" },
    { name: "Personal Care", path: "/shop?category=Oils" },
    { name: "Supplements", path: "/shop?category=Supplements" },
    { name: "Herbs", path: "/shop?category=Herbs" },
  ],
  customerService: [
    { name: "FAQs", path: "/contact" },
    { name: "Shipping Policy", path: "#" },
    { name: "Return & Refund", path: "#" },
    { name: "Terms & Conditions", path: "#" },
    { name: "Privacy Policy", path: "#" },
  ],
};

export const socialLinks = {
  facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || "#",
  instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || "#",
  twitter: import.meta.env.VITE_SOCIAL_TWITTER || "#",
  linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || "#",
};
