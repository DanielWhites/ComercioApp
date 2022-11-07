import React, { useState, useEffect } from "react";
import Paginator from "./Paginator";
import { dataProdutcs } from "../myProducts/app";

export const Products = ({ paginate }) => {
  const path = `https://api.mercadolibre.com/sites/MLC/search?q=Espejo 75x30&offset=${paginate}`;

  const [products, setProtudts] = useState();
  const [pagination, setPagination] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let getProduct = async () => {
      const response = await fetch(path);
      let products = await response.json();
      console.log(products.results);
      let mergedArray = [];
      if (paginate == 0) mergedArray = [...dataProdutcs, ...products.results];
      else mergedArray = [...products.results];

      setProtudts(mergedArray);
      setPagination(products.paging);
      return products.results;
    };
    getProduct();
  }, [path]);

  return (
    <>
      <div className="containerProducts">
        {products?.map((product) => (
          <div className="cardProduct" key={product.id}>
            {product.title}
            <img className="thumbnailProduct" src={product.thumbnail} alt="" />
            <button id="cartProduct" type="button" className="btn btn-primary">
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
