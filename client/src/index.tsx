import './styles/default.css'
import ReactDOM from "react-dom/client";
import Home from "./components/dashboard/Home";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Navigations from "./lib/Navigations";
import CoursePager from './components/course/PageRouter';
import Auth from './components/auth/authPage';
import InstructorDashBoard from './components/instructor/dashboard';
import StudentStats from './components/instructor/studentStats';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(


  <Router>
    {/* <Navigations /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/course" element={<CoursePager />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<InstructorDashBoard />} />
      <Route path="/studentStats" element={<StudentStats />} />
    </Routes>
  </Router>


);
