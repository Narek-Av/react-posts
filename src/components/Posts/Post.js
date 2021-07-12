import React from "react";
import { useDispatch } from "react-redux";
import { likeComment, newComment } from "../../store/actions";
import Comments from "../Comments/Comments";

import "./Post.css";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  return (
    <div className="post">
      <div className="post-item">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-content">
          <p>{post.content}</p>
        </div>
        <Comments
          comments={post.comments}
          addNewComment={(comment, commentId) =>
            dispatch(newComment({ postId: post.id, commentId, comment }))
          }
          likeComment={(commentId, replyId) =>
            dispatch(likeComment({ postId: post.id, commentId, replyId }))
          }
        />
      </div>
    </div>
  );
};

export default Post;
