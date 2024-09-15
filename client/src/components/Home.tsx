import { Link } from "react-router-dom";
import { userStore } from "../lib/userStore";

function App() {
  const user = userStore()
  console.log(user);
  
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/admin">   Admin</Link> <br />
      <Link to="/courses"> Courses</Link> <br />
      <Link to="/enrolled">Enrolled</Link>
    </div>
  );
}

export default App;
