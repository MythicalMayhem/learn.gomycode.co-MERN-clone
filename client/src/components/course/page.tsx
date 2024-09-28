import { useSearchParams } from "react-router-dom";
import CourseOverView from "./overview/mainoverview";

function CoursePager() {
    const [params, setParams] = useSearchParams()
    const page = params.get('page')
    const id = params.get('id')

    const getCourseName: () => string = () => {

        return 'fetched course Name'
    }
    const getCheckpoints = () => {
        return [
            { id: "unsupervised-machine-learning", completed: false, score: 0 },
            { id: "data-visualization", completed: false, score: 0 },
            { id: "python", completed: false, score: 0 },
            { id: "How to build your own Machine Learning project", completed: false, score: 0 },
            { id: "data-preprocessing", completed: false, score: 0 },
            { id: "supervised-machine-learning", completed: false, score: 0 },
            { id: "Let's start", completed: false, score: 0 },
        ]
    }
    switch (page) {
        case 'overview':
            return <CourseOverView course_name={getCourseName()} completed={false} checkpoints={getCheckpoints()} />

        default:
            break;
    }
    return (<></>);
}

export default CoursePager;