import '../../../styles/courseOverviewPage.css'
import NavBar from '../../navbar';
import Aside from "./aside";
import CheckpointBar from "./checkpointbar";
// eslint-disable-next-line
import Header from "./header";

function CourseOverView(props: { course_name: string, completed: boolean, checkpoints: Array<{ id: string, completed: boolean, score: number }> }) {
    return (
        <>
            <NavBar />
            <div className="overview-page">
                <Aside />
                <div className="checkpoints-list">
                    {props.completed && <Header />}
                    {props.checkpoints.map((el, index) =>
                        <CheckpointBar score={el.score} id={el.id} key={index} />
                    )}
                </div>
            </div>
        </>
    );
}

export default CourseOverView;