export const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About Us", path: "/about" },
  { name: "Our Mission", path: "/about" },
];

export const footerLinks = {
  contactInfo: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "support@svarpbodywellness.org",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+91 12345 67890",
    address: "123, Green Avenue, Eco City, India - 560001",
  },
  quickLinks: [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About Us", path: "/about" },
    { name: "Our Mission", path: "/about" },
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
