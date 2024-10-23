import { instructorStore } from "../../lib/instructorStore";

function InstructorDashBoard() {
  const { students } = instructorStore()

  return (<>
    {students.map((stu, i) => <div>
      name : {stu.name}
      age : {stu.age}
    </div>)}
  </>);
}

export default InstructorDashBoard;