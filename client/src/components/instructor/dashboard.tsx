import '../../styles/instructor/dashboard.css'
import { useEffect, useState } from "react";
import { student } from "../../lib/instructorStore";
import StudentCard from "./dashboard/studentCard";
function InstructorDashBoard() {
  const [students, setStudents] = useState<student[]>([])
  useEffect(() => {
    fetch("http://127.0.0.1:3001/instructorStudents", {
      headers: {
        "Content-Type": "Application/json",
        email: "a",
        password: "a",
      },
    }).then(res => res.json())
    .then((students) => setStudents(students.data))
  }, [])
  console.log(students);
  return (<>
    {students.map((stu, i) => <div className="student-card" key={i}>
      <StudentCard studentid={stu.id} name={stu.name} age={stu.age} />
    </div>)}

  </>);
}

export default InstructorDashBoard;