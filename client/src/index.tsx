import ReactDOM from "react-dom/client"; 
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  // </React.StrictMode>
);
