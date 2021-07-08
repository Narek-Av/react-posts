import React, { useCallback, useEffect, useRef, useState } from "react";

import PostSorter from "../PostSorter";
import PostList from "../Posts";
import ToggleButtons from "../ToggleButton";
import Search from "../Search";
import Pagination from "../UI/Pagination";

import dummyPost from "../../dummyPosts.json";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState(dummyPost);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageItemCount = useRef(4);

  const filteredPostList = useCallback(
    (posts, isSelected) => {
      const filteredPosts = posts.filter(
        post => !selectedPosts.includes(post.id)
      );

      return searchValue
        ? filteredPosts.filter(
            post =>
              post.title.toLowerCase().includes(searchValue) ||
              post.content.toLowerCase().includes(searchValue) ||
              post.comments.find(comment =>
                comment.text.toLowerCase().includes(searchValue)
              )
          )
        : !isSelected
        ? filteredPosts.slice(
            (currentPage - 1) * pageItemCount.current,
            currentPage * pageItemCount.current
          )
        : filteredPosts;
    },
    [selectedPosts, searchValue, currentPage]
  );

  useEffect(() => {
    const pagePostCount = filteredPostList(posts).length;

    pagePostCount === 0 &&
      setCurrentPage(currentPage =>
        currentPage === 1 ? currentPage : currentPage - 1
      );
  }, [filteredPostList, posts]);

  const updatePostList = (postId, hide) => {
    setSelectedPosts(selectedPosts =>
      !hide
        ? [...selectedPosts, postId]
        : selectedPosts.filter(id => id !== postId)
    );
  };

  const addNewComment = (postId, comment, commentId) => {
    setPosts(posts =>
      posts.map(post => {
        if (post.id !== postId) {
          return post;
        }

        const generetId = commentId
          ? `${post.id}${Math.random()}${post.comments.length}`
          : `${post.id}${post.comments.length}`;

        const newComment = {
          id: generetId,
          text: comment,
          rating: 0,
          date: new Date(),
          user: {
            name: "User User",
          },
        };

        if (!commentId) {
          newComment.replyes = [];

          return {
            ...post,
            comments: [...post.comments, newComment],
          };
        }

        const replyedComments = post.comments.map(comment => {
          if (comment.id !== commentId) {
            return comment;
          }

          return {
            ...comment,
            replyes: [...comment.replyes, newComment],
          };
        });

        return {
          ...post,
          comments: replyedComments,
        };
      })
    );
  };

  const likeComment = (postId, commentId, replyId) => {
    setPosts(posts =>
      posts.map(post => {
        if (post.id !== postId) {
          return post;
        }

        if (!replyId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, rating: comment.rating + 1 }
                : comment
            ),
          };
        }

        const replyComments = post.comments.map(comment => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            replyes: comment.replyes.map(reply =>
              reply.id === replyId
                ? { ...reply, rating: reply.rating + 1 }
                : reply
            ),
          };
        });

        return {
          ...post,
          comments: replyComments,
        };
      })
    );
  };

  const postPagination = page => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  const calculateItemCount = () => {
    return posts.length - selectedPosts.length;
  };

  return (
    <div className="app-container">
      <ToggleButtons />
      <Search searchPost={setSearchValue} />
      <PostList
        posts={filteredPostList(posts)}
        selectedPosts={selectedPosts}
        likeComment={likeComment}
        addNewComment={addNewComment}
      />
      {!searchValue && pageItemCount.current < calculateItemCount() && (
        <Pagination
          itemCount={calculateItemCount()}
          pageItemCount={pageItemCount.current}
          postPagination={postPagination}
          currentPage={currentPage}
        />
      )}

      <div className="average-group">
        <PostSorter
          posts={filteredPostList(posts, true)}
          updatePostList={(id, hide) => updatePostList(id, hide)}
          searchValue={searchValue}
        />
        <PostSorter
          posts={filteredPostList(posts, true)}
          updatePostList={(id, hide) => updatePostList(id, hide)}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
};

export default App;
