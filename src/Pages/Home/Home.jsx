import Banner from "./Banner/Banner";
import BannerFeature from "./Banner/BannerFeature/BannerFeature";
import Category from "./Category/Category";

import Review from "./Review/Review";
import Faq from "./Faq/Faq";
import FeatureSection from "./FeatureSection/FeatureSection";
import ProductTabs from "./ProductTabs/ProductTabs";
import RecentBlog from "./RecentBlog/RecentBlog";
import TrustedShop from "./TrustedShop/TrustedShop";
import OfferBanner from "./OfferBanner/OfferBanner";

const Home = () => {
  return (
    <div className=" mb-10 space-y-5">
      <Banner></Banner>
      <BannerFeature></BannerFeature>
      <Category></Category>
      {/* <OfferBanner></OfferBanner> */}
      <ProductTabs></ProductTabs>
      <TrustedShop></TrustedShop>
      <FeatureSection></FeatureSection>
      <RecentBlog></RecentBlog>
      <Review></Review>
      <Faq></Faq>
    </div>
  );
};

export default Home;
