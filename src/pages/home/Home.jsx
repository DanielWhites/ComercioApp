import React, { useState, useEffect } from "react";
import { Nav } from "../../components/Nav";
import { Products } from "../../components/Products";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
export const Home = () => {
  let location = useLocation();
  const [pagination, setPagination] = useState(0);
  //console.log(location.pathname);
  useEffect(() => {
    setPagination(location.pathname.split("/")[1]);
  });

  return (
    <div>
      <Nav />
      {<Products paginate={pagination === "/" ? 0 : pagination} />}
    </div>
  );
};
