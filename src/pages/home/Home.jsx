import React, { useState, useEffect } from "react";
import { Nav } from "../../components/Nav";
import { Products } from "../../components/Products";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
export const Home = () => {
  let location = useLocation();
  const [pagination, setPagination] = useState(0);
  useEffect(() => {
    setPagination(location.pathname.split("/")[1]);
  }, [pagination]);

  return (
    <div>
      <Nav />
      <Products />
    </div>
  );
};
