import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Paginator = ({ totalPages, currentPage, setCurrentPage }) => {
  useEffect(() => {}, []);
  const setCurrentPageClick = (cambiar) => {
    //console.log(cambiar);
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#">
            &laquo;
          </a>
        </li>
        {[...Array(6)].map((x, i) => (
          <li className="page-item" key={i}>
            <Link
              onClick={() => setCurrentPageClick(i)}
              className="page-link"
              to={`/${i}`}
            >
              {i+1}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">
            &raquo;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
