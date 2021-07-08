import React from "react";

import dateFormat from "dateformat";

import "./ReplyComment.css";

const ReplyComment = ({ comments, likeReplyComment }) => {
  const commentDateFormater = date => {
    return dateFormat(date, "mmmm dS, yyyy, h:MM");
  };

  return (
    <ul className="comment-replyes">
      {comments.map(comment => (
        <li className="comment-list-item" key={comment.id}>
          <div className="comment-left">
            <div className="user-avatar">
              <span>&#128104;</span>
            </div>
          </div>
          <div className="comment-right">
            <div className="comment-user-name">
              <h3>{comment.user.name}</h3>
              <div className="comment-date">
                {commentDateFormater(comment.date)}
              </div>
            </div>
            <div className="comment-text">{comment.text}</div>
            <div className="comment-info">
              <div className="comment-like">
                <button
                  className="comment-like-btn"
                  onClick={() => likeReplyComment(comment.id)}
                >
                  <span>&#128077;</span>
                </button>
              </div>
              <div className="comment-rating">
                <div className="comment-rating-icon">
                  <span>&#11088;</span>
                  {comment.rating}
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReplyComment;
