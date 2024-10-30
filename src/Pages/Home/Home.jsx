import { useState, useEffect, useRef } from "react";
import Banner from "./Banner/Banner";
import BannerFeature from "./Banner/BannerFeature/BannerFeature";
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
import Slide1 from "./Banner/NewBanner/Slide1/Slide1";
import Slide2 from "./Banner/NewBanner/Slide2/Slide2";
import Slide3 from "./Banner/NewBanner/Slide3/Slide3";

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

      {/* <Banner />
      <div className="hidden md:block">
        <BannerFeature />
      </div> */}
      <NewBanner></NewBanner>
      {/* <Slide1></Slide1> */}
      {/* <Slide2></Slide2> */}
      {/* <Slide3></Slide3> */}
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
