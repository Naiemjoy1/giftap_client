import Carousel from "./Carousel/Carousel";
import Category from "./Category/Category";

const Banner = () => {
  return (
    <div className="grid grid-cols-[30%_70%] justify-between gap-5">
      <section className="bg-primary rounded-md px-8 py-10 h-[450px] overflow-y-auto">
        <Category />
      </section>
      <section className="rounded-md h-[450px]">
        <Carousel />
      </section>
    </div>
  );
};

export default Banner;
