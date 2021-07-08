import React, { useState } from "react";

import Emojies from "../UI/Emojies";

const NewComment = ({ sendComment, commentRef }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showEmojies, setShwoEmojies] = useState(false);
  const [value, setValue] = useState("");

  const toggleEmojies = () => {
    setShwoEmojies(showEmojies => !showEmojies);
  };

  const onFocusHandler = e => {
    setIsFocused(true);
    e.target.classList.add("comment-active");
  };

  const onBlureHandler = e => {
    if (
      e.relatedTarget?.id !== "add-emoji-btn" &&
      e.relatedTarget?.className !== "emoji-btn" &&
      e.relatedTarget?.className !== "btn send-btn"
    ) {
      setIsFocused(false);
      setShwoEmojies(false);
      e.target.classList.remove("comment-active");
    } else {
      setIsFocused(true);
    }
  };

  const emojiesOnBlurHandler = e => {
    if (
      e.relatedTarget?.className !== "emoji-btn" &&
      e.relatedTarget?.name !== "comment-area"
    ) {
      setShwoEmojies(false);
    }
  };

  const addEmojiToComment = emoji => {
    setValue(value => value + " " + emoji);
    commentRef.current.focus();
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    sendComment(value);

    setIsFocused(false);
    setShwoEmojies(false);
    setValue("");
    commentRef.current.classList.remove("comment-active");
  };

  return (
    <div className="post-comment-add">
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <textarea
            ref={commentRef}
            type="text"
            placeholder="Add a comment..."
            onFocus={onFocusHandler}
            onBlur={onBlureHandler}
            name="comment-area"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          {isFocused && (
            <button
              type="button"
              className="add-emoji-btn"
              id="add-emoji-btn"
              onClick={toggleEmojies}
              onBlur={emojiesOnBlurHandler}
            >
              <span>&#9786;</span>
            </button>
          )}
        </div>
        {showEmojies && <Emojies selectEmoji={addEmojiToComment} />}
        {isFocused && value.trim() !== "" && (
          <div className="form-button">
            <button className="btn send-btn" type="submit">
              Send
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default NewComment;
