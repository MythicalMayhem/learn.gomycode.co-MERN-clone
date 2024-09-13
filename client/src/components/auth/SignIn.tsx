import { useState } from "react";
import { userStore } from "../../lib/userStore";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = userStore()
  async function handleSignIn() {
    user.login(email, password)
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
