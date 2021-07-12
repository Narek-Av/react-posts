import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPost } from "../../store/actions";

import "./PostSorter.css";

const PostSorter = () => {
  const [reverse, setReverse] = useState(false);
  const { posts, selectedPosts } = useSelector(state => state);
  const [sortedPosts, setSortedPosts] = useState([]);
  const dispatch = useDispatch();

  const calculateAverage = () => {
    return posts
      .filter(post => !selectedPosts.includes(post.id))
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
    if (posts.length === selectedPosts.length && !id) return;

    let selectedPost;

    if (!id) {
      selectedPost = calculateAverage();
    }

    if (id) {
      dispatch(selectPost({ postId: id, hide: true }));
      setSortedPosts(sortedPosts.filter(post => post.id !== id));
    } else {
      dispatch(selectPost(selectedPost.id));
      setSortedPosts([...sortedPosts, selectedPost]);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const clearList = () => {
    sortedPosts.forEach(post =>
      dispatch(selectPost({ postId: post.id, hide: true }))
    );
    setSortedPosts([]);
  };

  return (
    <div className="comment-average-container">
      <div className="average-btns">
        <button
          className="btn btn-sort"
          onClick={() => setReverse(reverse => !reverse)}
        ></button>
        <button className="btn btn-reset" onClick={clearList}>
          &#8634;
        </button>
        <button className="btn" onClick={() => togglePost()}>
          +
        </button>
      </div>
      <div className="average-content">
        <ul className="average-list">
          {sortedPosts
            .sort((a, b) =>
              reverse
                ? a.averageRating - b.averageRating
                : b.averageRating - a.averageRating
            )
            .map(post => (
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
