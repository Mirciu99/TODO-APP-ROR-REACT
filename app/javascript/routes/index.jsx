import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Todo } from "../components/Todo";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Todo />} />
    </Routes>
  </Router>
);