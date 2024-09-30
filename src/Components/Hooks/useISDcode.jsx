import { useEffect, useState } from "react";

const useISDcode = () => {
  const [ISDcode, setISDcode] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./MobileCode.json")
      .then((res) => res.json())
      .then((data) => {
        setISDcode(data);
        setLoading(false);
      });
  }, []);

  return [ISDcode, loading];
};

export default useISDcode;
