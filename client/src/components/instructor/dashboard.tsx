import { useEffect, useState } from "react";
import { student } from "../../lib/instructorStore";

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
    {students.map((stu, i) => <div key={i}>
      <img src="" alt="" className="student-pfp" />
      <p>name :<b>{stu.name}</b></p> <br />
      <p>age :<b>{stu.age}</b></p> <br />
      <button>Check Stats</button>
    </div>)}
  </>);
}

export default InstructorDashBoard;