import '../../styles/course.css'
import { useSearchParams } from "react-router-dom";
import CourseOverView from "./overview/mainoverview";
import { useEffect } from "react";
import { courseStore } from "../../lib/courseStore";
import MyCourse from "./course/mycourse";
import SideBar from "./sideBar";
import NavBar from '../navbar';
import Saved from './saved/saved';
import CheckPointList from './checkpoint/checkpointList';
import OneToOne from './oneToOne/oneToOne';
import SkillCheck from './skillcheck/skillCheck';

function CoursePager() {
    const [params] = useSearchParams()
    const course = courseStore()
    const page = params.get('page')
    const id = params.get('id')

    useEffect(() => {
        if (!id) return
        const controller = new AbortController()
        fetch("http://127.0.0.1:3001/getCourse", {
            "method": "GET",
            signal: controller.signal,
            "headers": {
                username: "d",
                password: "d",
                "Content-Type": 'application/json',
                "courseid": id
            }
        }).then(res => res.json())
            .then(res => course.setCourseData(res.data))

        return () => controller.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])



    switch (page) {
        case 'overview':
            return <><NavBar /><div className='learn'><SideBar /><CourseOverView /></div></>
        case "learn":
            return <><NavBar /><div className='learn'><SideBar /><MyCourse /></div></>
        case "saved":
            return <><NavBar /><div className='learn'><SideBar /><Saved /></div></>
        case "checkpoints":
            return <><NavBar /><div className='learn'><SideBar /><CheckPointList /></div></>
        case "onetoone":
            return <><NavBar /><div className='learn'><SideBar /><OneToOne /></div></>
        case "skillcheck":
            return <><NavBar /><div className='learn'><SideBar /><SkillCheck /></div></>
        default:
            return <><NavBar /><div className='learn'><SideBar />Page Not Found 044</div></>;
    }
}

export default CoursePager;