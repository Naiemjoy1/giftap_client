import shop from "../../../../assets/Images/shop.png";
import phone from "../../../../assets/Images/phone-call.png";
import rocket from "../../../../assets/Images/rocket.png";
import truck from "../../../../assets/Images/free-delivery.png";
import coffee from "../../../../assets/Images/coffee-shop.png";

const BannerFeature = () => {
  return (
    <div className="bg-white">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 md:border-b justify-items-center">
          <Feature icon={shop} text="No minimum order" />
          <Feature icon={phone} text="One on one services" />
          <Feature icon={rocket} text="100% Free to use" />
          <Feature icon={coffee} text="1000+ Products available" />
          <Feature icon={truck} text="Free delivery for order over $80" />
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, text }) => (
  <div className="flex justify-center items-center border-r p-5 last:border-r-0">
    <img className="w-8 h-8 mr-2" src={icon} alt={text} />
    <p className="text-sm font-medium">{text}</p>
  </div>
);

export default BannerFeature;
