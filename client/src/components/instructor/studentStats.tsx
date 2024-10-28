import "../../styles/instructor/studentStats.css"
import { useEffect, useState } from "react";
import { student } from "../../lib/instructorStore";
import { useParams, useSearchParams } from "react-router-dom";

function StudentStats() {
  // const { id } = instructorStore()
  const [studentStats, setStudentStats] = useState<student>()
  const [params] = useSearchParams()
  console.log(studentStats);
  
  const studentId = params.get('studentId');
  useEffect(() => {
    console.log('getting',studentId);
    if (!studentId) return
    const abc = new AbortController()
    
    fetch("http://127.0.0.1:3001/getStudentStats", {
      "headers": {
        "Content-Type": "Application/json",
        studentId,
        email:"a",
        password:"a"
      },
      signal: abc.signal,
      method: "GET"
    }).then(res => res.json())
      .then((res) => !res.error ? setStudentStats(res.data) : alert('couldn\'t load student'))
    return () =>  abc.abort(" rerendering ")
  }, [])

  return (
    <div className="student-stats">
      <img src="" alt="" />
      <p className="name">{studentStats?.name || "loading"}</p>
      <p className="age">{studentStats?.age || "..."}</p>
      <button>approve meeting</button>
    </div>
  );
}

export default StudentStats;