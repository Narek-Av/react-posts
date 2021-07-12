import React from "react";

import { Provider } from "react-redux";
import { store } from "../../store";

import PostSorter from "../PostSorter";
import PostList from "../Posts";
import ToggleButtons from "../ToggleButton";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app-container">
        <ToggleButtons />
        <PostList />
        <div className="average-group">
          <PostSorter />
          <PostSorter />
        </div>
      </div>
    </Provider>
  );
};

export default App;
