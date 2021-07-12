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

    const btns = [...Array(pageCount).keys()].map(idx => 
        <button
          className={`pagination-btn${
            idx + 1 === currentPage ? " pagination-btn-active" : ""
          }`}
          onClick={() => postPagination(idx + 1)}
          key={idx}
        >
          {idx + 1}
        </button>
    )

    return btns;
  };

  return <div className="pagination-container">{renderButtons()}</div>;
};

export default Pagination;
