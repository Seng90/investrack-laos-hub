import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import IndustryCategories from "@/components/IndustryCategories";
import RecentFunding from "@/components/RecentFunding";

import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <StatsBar />
        <FeaturedCompanies />
        <IndustryCategories />
        <RecentFunding />
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
