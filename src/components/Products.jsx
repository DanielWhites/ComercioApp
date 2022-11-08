import React, { useState, useEffect } from "react";
import Paginator from "./Paginator";
import { dataProdutcs } from "../myProducts/app";
import noImage from "../assets/no-image.svg";
export const Products = ({ paginate }) => {
  const path = `https://api.mercadolibre.com/sites/MLC/search?q=Espejo 75x30&offset=${paginate}`;

  const [products, setProtudts] = useState();
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityItem, setQuantityItem] = useState(1);
  const [onCart, setOnCart] = useState([]);

  useEffect(() => {
    let getProduct = async () => {
      const response = await fetch(path);
      let products = await response.json();
      //console.log(products.results);
      let mergedArray = [];
      if (paginate == 0) mergedArray = [...dataProdutcs, ...products.results];
      else mergedArray = [...products.results];

      setProtudts(mergedArray);
      setPagination(products.paging);
      return products.results;
    };
    getProduct();
  }, [path]);

  const handleCart = (obj) => {
    console.log(obj);
    //setOnCart([obj]);
    if (onCart.length <= 0) {
      console.log("Es nulo");
      setOnCart([obj]);
    } else {
      console.log("tiene data");
      let resp = findOnCart(obj.id);
      if (resp === undefined) {
        setOnCart([...onCart, obj]);
      } else {
        console.log(resp);
        let addQuantity = parseInt(obj.quantity) + parseInt(resp.quantity);
        setOnCart([{ ...resp, quantity: addQuantity }]);
      }
    }
  };

  const findOnCart = (id) => {
    console.log(id);
    let dat = onCart.find((v) => v.id === id);
    console.log(dat);
    return dat;
  };

  const quantityProduct = (value) => {
    setQuantityItem(value);
  };
  console.log(onCart);
  return (
    <>
      <div className="containerProducts">
        {products?.map((product) => (
          <div className="cardProduct" key={product.id}>
            {product.title}
            {product.thumbnail ? (
              <img
                className="thumbnailProduct"
                src={product.thumbnail}
                alt=""
              />
            ) : (
              <img className="thumbnailProduct" src={noImage} alt="" />
            )}

            <input
              className="form-control form-control-sm"
              type="number"
              id="quantityProduct"
              name={`quantityProduct_${product.id}`}
              min="1"
              max="18"
              onClick={(event) => quantityProduct(event.target.value)}
            />
            <button
              onClick={() =>
                handleCart({
                  id: product.id,
                  title: product.title,
                  image: product.thumbnail,
                  quantity: quantityItem,
                })
              }
              id="cartProduct"
              type="button"
              className="btn btn-primary"
            >
              <i className="bi bi-cart-plus"></i> Agregar
            </button>
          </div>
        ))}
      </div>
      <Paginator
        totalPages={pagination.total}
        currentPage={pagination.offset}
        setCurrentPage={currentPage}
      />
    </>
  );
};
