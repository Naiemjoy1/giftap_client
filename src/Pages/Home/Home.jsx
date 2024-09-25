import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Features from "./Features/Features";
import Gifts from "./Gifts/Gifts";
import Review from "./Review/Review";

const Home = () => {
  return (
    <div className=" mb-10 space-y-5">
      <Banner></Banner>
      <Category></Category>
      <Features></Features>
      <Review></Review>
    </div>
  );
};

export default Home;
