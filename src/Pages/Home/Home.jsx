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
import Subscription from "./Subscription/Subscription";

const Home = () => {
  // Title
  document.title = `GifTap || Home`;

  return (
    <div className=" mb-10 space-y-5">
      <Banner></Banner>
      <BannerFeature></BannerFeature>
      <Category></Category>
      <ProductTabs></ProductTabs>
      <Subscription></Subscription>
      <TrustedShop></TrustedShop>
      <FeatureSection></FeatureSection>
      <RecentBlog></RecentBlog>
      <Review></Review>
      <Faq></Faq>
    </div>
  );
};

export default Home;
