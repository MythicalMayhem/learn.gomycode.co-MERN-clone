import './styles/default.css'
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Enrolled from "./components/Enrolled";
import Courses from "./components/AllCourses";
import Course from "./components/Course";

import Navigations from "./lib/Navigations";
import CourseOverView from './components/course/overview/mainoverview';
import CoursePager from './components/course/page';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(

  
    <Router>
      <Navigations />
      <Routes>
        <Route path = "/"         element = { <Home /> }     />
        <Route path = "/course"   element = { <CoursePager /> }   />

        <Route path = "/auth"     element = { <Auth /> }     />
        <Route path = "/admin"    element = { <Admin /> }    />
        <Route path = "/courses"  element = { <Courses /> }  />
        <Route path = "/enrolled" element = { <Enrolled /> } />
      </Routes>
    </Router>
    
    
);
