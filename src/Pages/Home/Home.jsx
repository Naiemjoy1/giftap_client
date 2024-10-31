import { useState, useEffect, useRef } from "react";
import Category from "./Category/Category";
import Review from "./Review/Review";
import Faq from "./Faq/Faq";
import FeatureSection from "./FeatureSection/FeatureSection";
import ProductTabs from "./ProductTabs/ProductTabs";
import RecentBlog from "./RecentBlog/RecentBlog";
import TrustedShop from "./TrustedShop/TrustedShop";
import Subscription from "./Subscription/Subscription";
import ScrollNav from "../../Shared/Navbar/ScrollNav/ScrollNav";
import NewBanner from "./Banner/NewBanner/NewBanner";

const Home = () => {
  document.title = `GifTap || Home`;

  const navbarRef = useRef(null);
  const [showScrollNav, setShowScrollNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarBottom = navbarRef.current.getBoundingClientRect().bottom;
        setShowScrollNav(window.scrollY > navbarBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mb-10">
      <div ref={navbarRef}></div>
      {showScrollNav && (
        <div className="fixed top-0 left-0 w-full z-50">
          <ScrollNav />
        </div>
      )}

      <NewBanner></NewBanner>

      <Category />
      <ProductTabs />
      <Subscription />
      <TrustedShop />
      <FeatureSection />
      <RecentBlog />
      <Review />
      <Faq />
    </div>
  );
};

export default Home;
