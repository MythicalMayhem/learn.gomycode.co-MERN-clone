import { Navigate } from "react-router-dom";
import { userStore } from "./userStore";

function Navigations() {
    const user = userStore()
    console.log(user);


    if (!user.currentUser) return <Navigate to='/auth' />;

    return <></>
}

export default Navigations;