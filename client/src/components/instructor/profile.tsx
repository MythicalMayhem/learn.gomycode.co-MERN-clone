import { instructorStore } from "../../lib/instructorStore";

function InstructorProfilePage() {
  const { name } = instructorStore()
  return (
    <>
      <h1>Welcome to your profile  <b>{name}</b></h1>
    </>
  );
}

export default InstructorProfilePage;