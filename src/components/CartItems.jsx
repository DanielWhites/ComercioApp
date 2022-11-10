import React from "react";
import noImage from "../assets/no-image.svg";
export const CartItems = () => {
  let cartItems = JSON.parse(localStorage.getItem("onCart") || "[]");

  console.log(cartItems);
  debugger;
  const deleteItem = (id) => {
    console.log(`Eliminar el ${id}`);
  };
  return (
    <div>
      <h4>Mis productos </h4>
      <hr />
      <div className="containerProducts" onClick={() => deleteItem("ddd")}>
        {cartItems?.map((item) => (
          <div className="cardProduct" key={item.id}>
            {item.title}

            {item.thumbnail ? (
              <img className="thumbnailProduct" src={item.thumbnail} alt="" />
            ) : (
              <img className="thumbnailProduct" src={noImage} alt="" />
            )}

            <p className="cartOption">
              <div>
                Cant: <b>{item.quantity}</b>
              </div>
              
              <button onClick={() => deleteItem("ddd")}>sss</button>
              <div className="delete">
                <i class="bi bi-trash3"></i>
              </div>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
