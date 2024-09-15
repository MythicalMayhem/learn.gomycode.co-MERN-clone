import { Navigate } from "react-router-dom";
import { userStore } from "./userStore";

function Navigations() {
    const user = userStore()
    console.log(user);


    // if (!user.currentUser) return <Navigate to='/auth' />;
    // else return <Navigate to='/' />
    return <></>
}

export default Navigations;