import { useEffect, useState } from "react";
import { instructorStore, student } from "../../lib/instructorStore";

function StudentStats({ studentId }: { studentId: string }) {
  // const { id } = instructorStore()
  const [studentStats, setStudentStats] = useState<student>()
  useEffect(() => {
    const abc = new AbortController()
    fetch("/getStats", {
      "headers": {
        "Content-Type": "Application/json",
        studentId
      },
      signal: abc.signal,
      method: "GET"
    }).then(res => res.json())
      .then((res) => !res.error ? setStudentStats(res) : alert('couldn\'t load student'))
    return abc.abort(" rerendering ")
  }, [])

  return (
    <>
      <h3>{studentStats?.name || "loading"}</h3>
      <h4>{studentStats?.age || "..."}</h4>
    </>
  );
}

export default StudentStats;