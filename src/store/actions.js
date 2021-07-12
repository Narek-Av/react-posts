import { NEW_COMMENT, SELECT_POST, LIKE_COMMENT } from "./types";

export const selectPost = data => {
  return {
    type: SELECT_POST,
    payload: data,
  };
};

export const newComment = data => {
  return {
    type: NEW_COMMENT,
    payload: data,
  };
};

export const likeComment = data => {
  return {
    type: LIKE_COMMENT,
    payload: data,
  };
};
