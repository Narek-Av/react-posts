import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "../Search";
import Pagination from "../UI/Pagination";

import Post from "./Post";

const PAGE_ITEM_COUNT = 4;

const PostList = () => {
  const posts = useSelector(({ posts }) => posts);
  const selectedPosts = useSelector(({ selectedPosts }) => selectedPosts);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPostList = useCallback(
    posts => {
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
        : filteredPosts.slice(
            (currentPage - 1) * PAGE_ITEM_COUNT,
            currentPage * PAGE_ITEM_COUNT
          );
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
    <div className="post-container">
      <Search searchPost={setSearchValue} />
      {filteredPostList(posts).map(post => (
        <Post key={post.id} post={post} />
      ))}
      {!searchValue && calculateItemCount() > 4 && (
        <div className="post-pagination">
          <Pagination
            itemCount={calculateItemCount()}
            pageItemCount={PAGE_ITEM_COUNT}
            postPagination={postPagination}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default PostList;
