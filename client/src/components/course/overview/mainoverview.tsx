import '../../../styles/courseOverviewPage.css'

import { Link } from 'react-router-dom';
import CheckpointBar from "./checkpointbar";
// eslint-disable-next-line
import { courseStore } from '../../../lib/courseStore';

import Header from "./header";
import Aside from "./aside";
import NavBar from '../../navbar';

function CourseOverView() {
    const course = courseStore()
    return (
        <>
            <NavBar />
            <div className="overview-page">
                <Aside />
                <div className="checkpoints-list">
                    {/* {course.completed && <Header />} */}
                    {course.courseData?.checkpoints.map((el, index) =>
                        <Link key={index} to={"/course?page=learn&id=" + course.courseData?.id + "&checkpoint=" + el.id} >
                            <CheckpointBar id={el.id} />
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}

export default CourseOverView;