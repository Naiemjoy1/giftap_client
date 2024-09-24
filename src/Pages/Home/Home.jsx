import Banner from "./Banner/Banner";
import BannerFeature from "./Banner/BannerFeature/BannerFeature";
import Category from "./Category/Category";
import Features from "./Features/Features";
import Gifts from "./Gifts/Gifts";

const Home = () => {
  return (
    <div className=" container mx-auto my-10 space-y-5">
      <Banner></Banner>
      <BannerFeature></BannerFeature>
      <Category></Category>
      <Features></Features>
      <Gifts></Gifts>
    </div>
  );
};

export default Home;
