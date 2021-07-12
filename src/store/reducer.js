import { NEW_COMMENT, SELECT_POST, LIKE_COMMENT } from "./types";

import dummyPosts from "../dummyPosts.json";

const initialState = {
  posts: dummyPosts,
  selectedPosts: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_POST:
      return {
        ...state,
        selectedPosts: !action.payload.hide
          ? [...state.selectedPosts, action.payload]
          : state.selectedPosts.filter(id => id !== action.payload.postId),
      };
    case NEW_COMMENT:
      const { postId, commentId, comment } = action.payload;
      return {
        ...state,
        posts: state.posts.map(post => {
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
        }),
      };
    case LIKE_COMMENT:
      const { postId: pId, commentId: cId, replyId } = action.payload;
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id !== pId) {
            return post;
          }

          if (!replyId) {
            return {
              ...post,
              comments: post.comments.map(comment =>
                comment.id === cId
                  ? { ...comment, rating: comment.rating + 1 }
                  : comment
              ),
            };
          }

          const replyComments = post.comments.map(comment => {
            if (comment.id !== cId) return comment;

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
        }),
      };
    default:
      return state;
  }
};
