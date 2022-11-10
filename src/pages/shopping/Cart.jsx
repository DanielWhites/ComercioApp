import React, { useState, useEffect } from "react";
import { Nav } from "../../components/Nav";
import noImage from "../../assets/no-image.svg";
//import CartItems from "../../components/CartItems";
export const Cart = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    searhMyCart();
  }, []);

  const searhMyCart = () => {
    let cartItems = JSON.parse(localStorage.getItem("onCart") || "[]");
    setItems(cartItems);
  };
  const deleteItem = (id) => {
    console.log(id);
    let cartNewObj = items.filter((item) => {
      return item.id !== id;
    });
    localStorage.setItem("onCart", JSON.stringify(cartNewObj));
    setItems(cartNewObj);
    console.log(cartNewObj, "N+++++++++++++UEVOOOOO");
  };

  return (
    <div>
      <Nav />
      <div>
        <h4>Mis productos </h4>
        <hr />
        <div className="containerProducts">
          {items?.map((item) => (
            <div className="cardProduct" key={item.id}>
              {item.title}

              {item.thumbnail ? (
                <img className="thumbnailProduct" src={item.thumbnail} alt="" />
              ) : (
                <img className="thumbnailProduct" src={noImage} alt="" />
              )}

              <div className="cartOption">
                <div>
                  Cant: <b>{item.quantity}</b>
                </div>

                <div className="delete" onClick={() => deleteItem(item.id)}>
                  <i className="bi bi-trash3"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
