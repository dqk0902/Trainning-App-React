import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customer from "./components/CustomerPage/Customer";
import Root from "./components/Root";
import Training from "./components/TrainingPage/Training";
import CalendarPage from "./components/Calendar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Root />}>
          <Route path="" element={<Customer />} />
          <Route path="/training" element={<Training />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
