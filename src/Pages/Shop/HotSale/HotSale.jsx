import "./styles.css";
import usePromo from "../../../Components/Hooks/usePromo";
import animation from "../../../assets/animation/Animation - 1728653089064.gif";
import { useEffect } from "react";

const HotSale = () => {
  const [promo, refetch] = usePromo();
  const activePromo = promo.find((p) => p.status === "active");

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="hot-sale-container">
      <div className="grid grid-cols-1 justify-center items-center">
        <img src={animation} alt="Animation" className="mx-auto" />
        <p className="offer">{activePromo?.text}</p>
      </div>
    </div>
  );
};

export default HotSale;
