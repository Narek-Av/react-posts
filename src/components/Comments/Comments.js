import React, { useRef, useState } from "react";

import dateFormat from "dateformat";

import "./Comments.css";
import NewComment from "./NewComment";
import ReplyComment from "./ReplyComment";

const Comments = ({ comments, likeComment, addNewComment }) => {
  const [selectedComment, setSelectedComment] = useState();
  const commentRef = useRef();
  const replyCommentRef = useRef();

  const commentDateFormater = date => {
    return dateFormat(date, "mmmm dS, yyyy, h:MM");
  };

  return (
    <div className="comment-container">
      <button
        className="post-comment-btn"
        onClick={() => commentRef.current.focus()}
      >
        Comment
      </button>
      <ul className="comment-list">
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
                    onClick={() => likeComment(comment.id)}
                  >
                    <span>&#128077;</span>
                  </button>
                </div>
                <div className="comment-reply-btn">
                  <button
                    className="btn-replay"
                    onClick={() =>
                      setSelectedComment(selectedComment =>
                        selectedComment !== comment.id ? comment.id : ""
                      )
                    }
                  >
                    Reply
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
            {selectedComment === comment.id && (
              <div className="comment-reply">
                <NewComment
                  commentRef={replyCommentRef}
                  sendComment={replyComment => {
                    addNewComment(replyComment, comment.id);
                    setSelectedComment("");
                  }}
                />
              </div>
            )}
            {comment.replyes && (
              <ReplyComment
                likeReplyComment={replyId => likeComment(comment.id, replyId)}
                comments={comment.replyes}
              />
            )}
          </li>
        ))}
      </ul>
      <NewComment commentRef={commentRef} sendComment={addNewComment} />
    </div>
  );
};

export default Comments;
