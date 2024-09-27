import React, { useEffect, useState } from "react";

const useDistricts = () => {
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("./districts.json")
      .then((res) => res.json())
      .then((data) => {
        setDistricts(data);
        setLoading(false);
      });
  }, []);

  return [districts, loading];
};

export default useDistricts;
