import Carousel from "./Carousel/Carousel";
// import Category from "./Category/Category";

const Banner = () => {
  return (
    <div className="lg:grid grid-cols-[50%_50%] min-h-[80vh] justify-between">
      <section>
        <Carousel />
      </section>
      <section className="">
        
        <img className="min-h-[80vh]" src="https://ap-aprin.myshopify.com/cdn/shop/files/right.png?v=1711787624&width=3000" alt="get discount" />
      </section>
    </div>
  );
};

export default Banner;
