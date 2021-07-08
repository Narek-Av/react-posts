import React from "react";

const ToggleButtons = () => {
  const onClickHandler = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="show-column">
      <button className="btn toggle-btn" onClick={onClickHandler}>
        Go to Columns
      </button>
    </div>
  );
};

export default ToggleButtons;
