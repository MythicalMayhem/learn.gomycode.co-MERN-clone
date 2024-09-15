import { Navigate } from "react-router-dom";
import { userStore } from "../../lib/userStore";
import SignIn from "./SignIn";
import SignUp from "./SignUp";



function Auth() {
    const user = userStore()
    console.log(user);
    
    if (user.currentUser) return <Navigate to='/' />;
    return (
        <>
            <SignIn /> <br />
            <SignUp />
        </>
    );
}

export default Auth;