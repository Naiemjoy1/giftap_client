import { useState, useEffect } from "react";
import usePromo from "../../../Components/Hooks/usePromo";
import toast from "react-hot-toast";

const Offerbar = () => {
  const [promo, refetch] = usePromo();

  const activePromo = promo.find((p) => p.status === "active");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (activePromo) {
      const finishDate = new Date(activePromo.finishDate).getTime();

      const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = finishDate - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
      };

      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
    }
  }, [activePromo]);

  const handleCopyCode = () => {
    if (activePromo) {
      navigator.clipboard.writeText(activePromo.promoCode);
      toast.success(`Promo code copied: ${activePromo.promoCode}`);
    }
  };

  const hasPromoExpired =
    activePromo &&
    new Date(activePromo.finishDate).getTime() < new Date().getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="bg-primary flex justify-center text-white py-2 gap-4 font-gabarito text-sm">
      {hasPromoExpired ? (
        <p>No active promotions available.</p>
      ) : activePromo ? (
        <>
          <p>{activePromo.text}</p>
          <p>
            Use code:{" "}
            <span
              className="font-semibold cursor-pointer"
              onClick={handleCopyCode}
            >
              {activePromo.promoCode}
            </span>
          </p>
          <p>
            <span className="countdown font-semibold">
              <span style={{ "--value": timeLeft.days }}></span>:
              <span style={{ "--value": timeLeft.hours }}></span>:
              <span style={{ "--value": timeLeft.minutes }}></span>:
              <span style={{ "--value": timeLeft.seconds }}></span>
            </span>
          </p>
        </>
      ) : (
        <p>No active promotions available.</p>
      )}
    </div>
  );
};

export default Offerbar;
