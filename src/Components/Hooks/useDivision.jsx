import { useEffect, useState } from "react";

const useDivision = () => {
  const [division, setDivision] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./divisions.json")
      .then((res) => res.json())
      .then((data) => {
        setDivision(data);
        setLoading(false);
      });
  }, []);

  return [division, loading];
};

export default useDivision;
