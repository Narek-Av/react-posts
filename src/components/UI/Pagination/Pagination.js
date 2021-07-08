import React from "react";

import "./Pagination.css";

const Pagination = ({
  itemCount,
  pageItemCount,
  postPagination,
  currentPage,
}) => {
  const renderButtons = () => {
    const pageCount = Math.ceil(itemCount / pageItemCount);
    const btns = [];

    for (let i = 1; i <= pageCount; i++) {
      btns.push(
        <button
          className={`pagination-btn${
            i === currentPage ? " pagination-btn-active" : ""
          }`}
          onClick={() => postPagination(i)}
          key={i}
        >
          {i}
        </button>
      );
    }
    return btns;
  };

  return <div className="pagination-container">{renderButtons()}</div>;
};

export default Pagination;
