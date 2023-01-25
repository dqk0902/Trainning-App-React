import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Customer";
import Root from "./components/Root";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
