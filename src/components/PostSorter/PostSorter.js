import React, { useState } from "react";

import "./PostSorter.css";

const PostSorter = ({ posts, updatePostList, searchValue }) => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  const calculateAverage = () => {
    return posts
      .map(post => {
        const tPost = post.comments.reduce(
          (post, comment) => {
            return {
              ...post,
              ratings: comment.rating + post.ratings,
            };
          },
          { ...post, ratings: 0 }
        );
        return {
          ...post,
          averageRating:
            tPost.ratings === 0 ? 0 : tPost.ratings / post.comments.length,
        };
      })
      .sort((a, b) => b.averageRating - a.averageRating)[0];
  };

  const togglePost = id => {
    if (posts.length === 0 && !id) return;

    const selectedPost = calculateAverage();

    setSelectedPosts(selectedPosts =>
      !id
        ? [...selectedPosts, selectedPost].sort(
            (a, b) => b.averageRating - a.averageRating
          )
        : selectedPosts.filter(post => post.id !== id)
    );

    window.scrollTo(0, document.body.scrollHeight);

    id ? updatePostList(id, true) : updatePostList(selectedPost.id);
  };

  const onSortHandler = () => {
    setSelectedPosts(selectedPosts => [...selectedPosts].reverse());
  };

  const clearList = () => {
    selectedPosts.forEach(post => {
      updatePostList(post.id, true);
    });
    setSelectedPosts([]);
  };

  const averageList = list => {
    list = searchValue
      ? selectedPosts.filter(
          post =>
            post.title.toLowerCase().includes(searchValue) ||
            post.content.toLowerCase().includes(searchValue)
        )
      : selectedPosts;
    return list;
  };

  return (
    <div className="comment-average-container">
      <div className="average-btns">
        <button className="btn btn-sort" onClick={onSortHandler}></button>
        <button className="btn btn-reset" onClick={clearList}>
          &#8634;
        </button>
        <button className="btn" onClick={() => togglePost()}>
          +
        </button>
      </div>
      <div className="average-content">
        <ul className="average-list">
          {averageList(selectedPosts).map(post => (
            <li className="average-list-item" key={post.id}>
              <h3>{post.title}</h3>
              <p>Average Comment Rating {post.averageRating.toFixed(2)}</p>
              <div className="rating">
                {post.averageRating >= 5 ? (
                  <span className="rating-excellent">&#x1F642;</span>
                ) : post.averageRating < 5 && post.averageRating >= 4 ? (
                  <span className="rating-good">&#x1F610;</span>
                ) : post.averageRating < 4 ? (
                  <span className="rating-bad">&#128577;</span>
                ) : (
                  ""
                )}
              </div>
              <button
                className="btn hide-button"
                onClick={() => togglePost(post.id)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostSorter;
