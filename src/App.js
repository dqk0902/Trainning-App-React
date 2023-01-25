import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customer from "./components/Customer";
import Root from "./components/Root";
import Training from "./components/Training";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="" element={<Customer />} />
          <Route path="/training" element={<Training />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
