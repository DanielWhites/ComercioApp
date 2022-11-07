import React from "react";
import { Link } from "react-router-dom";
import { Car } from "./Car";
import logo from "../assets/logo.png"
export const Nav = () => {
  return (
    <header className="containerHeader">
      <div className="headerLogo">
        <Link to="/"><img className="headerLogo" src={logo} alt="Logo - Happy Shopping Logo Png @clipartmax.com"/></Link>
      </div>
      <div className="headerMenu">
        <Link to="/cart"><i className="bi bi-bag"></i></Link>
      </div>
    
    </header>
  );
};
