import React from "react";

import Post from "./Post";

const PostList = ({ posts, selectedPosts, likeComment, addNewComment }) => {
  const filterSelectedPosts = (posts, selectedPosts) => {
    return posts.filter(
      post => !selectedPosts.find(sPost => sPost.id === post.id)
    );
  };

  return (
    <div className="post-container">
      {posts &&
        filterSelectedPosts(posts, selectedPosts).map(post => (
          <Post
            key={post.id}
            post={post}
            likeComment={(commentId, replyId) =>
              likeComment(post.id, commentId, replyId)
            }
            addNewComment={(comment, commentId) =>
              addNewComment(post.id, comment, commentId)
            }
          />
        ))}
    </div>
  );
};

export default PostList;
