import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
export const Nav = () => {
  
 
  const [total, setTotal] = useState();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("onCart")) || [];
    setTotal(cart.length)
    //deleteOneItem();
  }, [total]);

  const deleteOneItem = () => {
   // console.log(cart.length);
  };
  return (
    <header className="containerHeader">
      <div className="headerLogo">
        <Link to="/">
          <img
            className="headerLogo"
            src={logo}
            alt="Logo - Happy Shopping Logo Png @clipartmax.com"
          />
        </Link>
      </div>
      <div className="headerMenu">
        <Link to="/cart">
          <button type="button" className="btn btn-primary position-relative">
            <i className="bi bi-bag"></i> Inbox
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {total != undefined && total}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
};
