import { useState } from "react";
import { userStore } from "../../lib/userStore";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const user = userStore()
  console.log(user);

  const handleSignUp = () =>
    fetch("http://127.0.0.1:3001/signup", { method: "GET", headers: { password, email } })
      .then((res) => res.json())
      .then((res) => (res.success) ? user.login(email, password) : null)

  return (
    <>
      <strong>sign up</strong> <br />
      email
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />{" "}
      <br />
      password{" "}
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
      />
      <button onClick={handleSignUp}>Sign up</button>
    </>
  );
}

export default SignUp;
