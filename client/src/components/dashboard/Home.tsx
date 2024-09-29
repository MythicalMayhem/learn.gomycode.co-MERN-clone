import '../../styles/homePage.css'
import { userStore } from "../../lib/userStore";
import NavBar from "../navbar";
import HomePageCourseCard from "./HomePageCourseCard";

function App() {
  const user = userStore()
  console.log(user);

  return (
    <div>
      <NavBar />
      <main className='course-list'>

        <HomePageCourseCard
          course_id="string" img="https://imgur.com/NTJGqjU.png" name="Introduction to Artificial Intelligence"
          dates={{ from: "23 octobre 2021", to: "08 janvier 2022" }} progress={{ percent: 5, checkpointId: "checkpointId", pageId: "pageId", completed: true, desc: "Tunis Lac Hacker Space" }}
        />
      </main>

      {/* <Link to="/auth">   Login signup</Link> <br /> */}
      {/* <Link to="/admin">   Admin</Link> <br /> */}
      {/* <Link to="/courses"> Courses</Link> <br /> */}
      {/* <Link to="/enrolled">Enrolled</Link> */}
    </div>
  );
}

export default App;
