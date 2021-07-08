import React from "react";

import "./Search.css";

const Search = ({ searchPost }) => {
  const onChangeHandler = e => {
    const value = e.target.value;
    searchPost(value.toLowerCase());
  };

  return (
    <div className="search-content">
      <input onChange={onChangeHandler} type="text" placeholder="Search" />
    </div>
  );
};

export default Search;
