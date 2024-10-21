
import { useNavigate } from "react-router-dom";
import { userStore } from "../../lib/userStore";
import { useEffect } from "react";

function Auth() {
  const user = userStore()
  const handleLogin = () => user.login("d", "d")
  const navigate = useNavigate()
  useEffect(() => user.currentUser ? navigate('/') : undefined)
  return (
    <>
      email <input type="text" />
      password<input type="text" />
      <button onClick={() => handleLogin()}>submit</button>
    </>
  );
}

export default Auth;