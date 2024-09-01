import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = () => {
    fetch("http://127.0.0.1:3001/signup", {
      method: "GET",
      headers: { password, email },
    })
      .then((res) => res.json())
      .then(console.log);
  };
  return (
    <>
      <strong>sign up</strong> <br />
      email{" "}
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
