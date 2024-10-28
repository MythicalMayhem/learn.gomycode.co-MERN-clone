import { useNavigate } from "react-router-dom";

 

function StudentCard({name, age, bio,studentid}:{name:string, age:number,bio?:string, studentid?:string}) {
  const navigate =  useNavigate()

  return ( 
  <>
      <img src="" alt="" className="pfp" />
      <p className="name">name :<b>{name}</b></p> <br />
      <p className="age">age :<b>{age}</b></p> <br />
      <button onClick={() => navigate( "/studentStats?studentId=" + studentid )}>Check Stats</button>
  </> );
}

export default StudentCard;