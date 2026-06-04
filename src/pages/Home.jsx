import HeroSection from "../components/HeroSection";
import BestSellers from "../components/BestSellers";
import Collections from "../components/Collections";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
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
