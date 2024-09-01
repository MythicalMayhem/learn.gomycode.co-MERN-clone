import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleSignIn() {
    fetch("http://127.0.0.1:3001/signin", {
      method: "GET",
      headers: { password, email },
    })
      .then((res) => res.json())
      .then(console.log);
  }
  return (
    <>
      <strong>sign in</strong> <br />
      email
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <br />
      password
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
      />
      <br />
      <button onClick={async () => await handleSignIn()}>Sign in</button>
    </>
  );
}

export default SignIn;
