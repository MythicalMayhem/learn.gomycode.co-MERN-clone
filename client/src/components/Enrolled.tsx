import { Link } from "react-router-dom";
import { userStore } from "../lib/userStore";

function Enrolled() {
    // const urlParams = useParams()
    const user = userStore()

    return (<>
        <ul>
            {Object.keys(user.currentUser.progress)
                .map((el, i) => <li key={i}><Link to={"/course?id=" + el}>{el}</Link></li>)}
        </ul>
    </>);
}

export default Enrolled;