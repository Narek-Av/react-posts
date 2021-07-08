import React from "react";

import "./Emojies.css";
import emojies from "./emojies.json";

const Emojies = ({ selectEmoji }) => {
  return (
    <div className="emojies-container">
      <ul className="emojies-list">
        {emojies.map((emoji, index) => (
          <li className="emojies-list-item" key={index}>
            <button
              type="button"
              className="emoji-btn"
              onClick={() => selectEmoji(String.fromCodePoint("0x" + emoji))}
            >
              {String.fromCodePoint("0x" + emoji)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Emojies;
