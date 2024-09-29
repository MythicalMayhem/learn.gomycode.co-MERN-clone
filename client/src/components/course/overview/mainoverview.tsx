import { Link } from 'react-router-dom';
import '../../../styles/courseOverviewPage.css'
import NavBar from '../../navbar';
import Aside from "./aside";
import CheckpointBar from "./checkpointbar";
// eslint-disable-next-line
import Header from "./header";
import { courseStore } from '../../../lib/courseStore';

function CourseOverView(props: { course_name: string, completed: boolean, checkpoints: Array<{ id: string, completed: boolean, score: number }> }) {
    const course = courseStore()
    return (
        <>
            <NavBar />
            <div className="overview-page">
                <Aside />
                <div className="checkpoints-list">
                    {props.completed && <Header />}
                    {props.checkpoints.map((el, index) =>
                        <Link to={"/course?page=learn&id=" + course.courseData?.id + "&checkpoint=" + el.id} >
                            <CheckpointBar score={el.score} id={el.id} key={index} />
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default CourseOverView;