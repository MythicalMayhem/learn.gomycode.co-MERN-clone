import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Courses from "./components/admin/Courses";
import Navigations from "./lib/Navigations";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

  <React.StrictMode>
    <Router>
      <Navigations />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
