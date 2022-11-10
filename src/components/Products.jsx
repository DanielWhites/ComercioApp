import React, { useState, useEffect } from "react";
import Paginator from "./Paginator";
import { dataProdutcs } from "../myProducts/app";
import noImage from "../assets/no-image.svg";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
export const Products = () => {
  let location = useLocation();
  let currentPag = location.pathname.split("/")[1];
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [products, setProducts] = useState();
  const [onCart, setOnCart] = useState([]);
  const [quantityItem, setQuantityItem] = useState(1);

  useEffect(() => {
    if (currentPag === "") {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPag);
    }
  });

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  const getProducts = async () => {
    if (currentPage != undefined) {
      let resApi = await fetch(
        `https://api.mercadolibre.com/sites/MLC/search?q=zapato&limit=10&offset=${currentPage}`
      );
      let products = await resApi.json();
      let mercadoLibre = products.results;
      let MyData = dataProdutcs;
      combination(mercadoLibre, MyData);
    }
  };

  const combination = (mercadoLibre, MyData) => {
    let mergedArray = [];
    if (currentPag == 0) {
      mergedArray = [...MyData, ...mercadoLibre];
    } else {
      mergedArray = [...mercadoLibre];
    }
    setProducts(mergedArray);
  };
  const handleCart = (obj) => {
    let haveItem = checkCart();
    if (haveItem === 0) {
      //primer insert
      setOnCart([obj]);
      saveOnStorage([obj]);
    } else {
      // tiene cosas en el carrito,
      let itemInCar = checkById(obj.id);
      if (itemInCar === undefined) {
        //el item no se encuentra en el carro, podemos incertarlo
        setOnCart([...onCart, obj]);
        saveOnStorage(onCart);
      } else {
        onCart.map((result) => {
          if (result.id === obj.id) {
            let nuevacantidad = parseInt(result.quantity) + 1;
            let updatedItem = { ...result, quantity: nuevacantidad };
            updateItemsInCart(result.id, updatedItem);
          }
        });
        //el item que está agregando ya se encuentra en el carrito
      }
    }
  };

  const updateItemsInCart = (id, item) => {
    let rsp = onCart.filter((data) => data.id != id);
    if (rsp === undefined) {
      setOnCart(item);
      saveOnStorage(onCart);
    } else {
      setOnCart(...rsp, item);
      let Np = [...rsp, item];
      saveOnStorage(Np);
    }
  };

  const checkCart = () => {
    if (onCart.length <= 0) {
      return 0;
    } else {
      return 1;
    }
  };
  const checkById = (id) => {
    return onCart.find((v) => v.id === id);
  };

  const saveOnStorage = (data) => {
    localStorage.setItem("onCart", JSON.stringify(data));
  };

  const handleCart_ = (obj) => {
    //check if is the first item
    if (onCart?.length === 0) {
      setOnCart([obj]);

      saveOnStorage(obj);
    } else {
      // no es el primer item, buscar en el objeto sí existe ese nuevo item
      let resp = findOnCart(obj.id);
      // .findIndex(obj => obj.email === email)
      setOnCart([...onCart, obj]);
      saveOnStorage([...onCart, obj]);
    }
  };

  const saveOnStorage_ = (obj) => {
    localStorage.setItem("onCart", JSON.stringify(obj));
  };

  const findOnCart = (id) => {
    //let resp = findOnCart(obj.id);
    let dat = onCart.find((v) => v.id === id);
    if (dat === undefined) {
      setOnCart([...onCart]);
    } else {
      //setOnCart([...onCart]);
      //buscar la posición en el arreglo de este item;
    }
    return dat;
  };

  const quantityProduct = (value) => {
    setQuantityItem(value);
  };
  const lStorage = () => {
    localStorage.setItem("onCart", JSON.stringify(onCart));
  };
  return (
    <>
      Products {currentPage}
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
            <button
              onClick={() =>
                handleCart({
                  id: product.id,
                  title: product.title,
                  thumbnail: product.thumbnail,
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
