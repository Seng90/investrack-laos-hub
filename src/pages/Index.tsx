import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturedCompanies from "@/components/FeaturedCompanies";
import IndustryCategories from "@/components/IndustryCategories";
import RecentFunding from "@/components/RecentFunding";
import FundingNews from "@/components/FundingNews";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsBar />
      <FeaturedCompanies />
      <IndustryCategories />
      <RecentFunding />
      <FundingNews />
      <Footer />
    </div>
  );
};

export default Index;
