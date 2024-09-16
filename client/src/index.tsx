import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Enrolled from "./components/Enrolled";
import Courses from "./components/Courses";
import Course from "./components/Course";

import Navigations from "./lib/Navigations";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

  <React.StrictMode>
    <Router>
      <Navigations />
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/auth"     element={<Auth />}     />
        <Route path="/admin"    element={<Admin />}    />
        <Route path="/course"   element={<Course />}   />
        <Route path="/courses"  element={<Courses />}  />
        <Route path="/enrolled" element={<Enrolled />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
