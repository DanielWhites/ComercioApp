import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState , useEffect} from "react";
import "./App.css";
import { Nav } from "./components/Nav";
import { Products } from "./components/Products";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  let location = useLocation();
  const [pagination, setPagination]=useState(0)
  //setPatination(location.pathname.split("/")[1]);
  console.log(location.pathname.split("/")[1]);

  useEffect(()=>{
    console.log("ALGO");
    setPagination(location.pathname.split("/")[1]);
  })
  return (
    <div className="App">
      <Nav />
      <Products paginate={pagination}/>
    </div>
  );
}

export default App;
