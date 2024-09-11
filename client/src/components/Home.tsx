import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/admin"> Admin</Link> <br />
      <Link to="/courses">Courses</Link>
    </div>
  );
}

export default App;
