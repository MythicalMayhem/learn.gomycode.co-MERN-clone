import { Course } from "../admin/AddCourse";
export const CourseCard = ({ _key, course, handleEnroll }: { _key: number, course: Course, handleEnroll: (id: string) => void }) => {
    return (
        <div key={_key} style={{ width: '350px', backgroundColor: 'lightpink' }}>
            <h1>{course.name}</h1>
            <p>
                description Lorem ipsum dolor sit,
                amet consectetur adipisicing elit.
                Dignissimos facilis exercitationem aliquam ab hic
                ullam quis atque incidunt ad,
                soluta minus error dolores perferendis
                officiis assumenda? Provident iusto rem hic!
            </p>
            <img src="" alt="" />
            <button onClick={() => handleEnroll(course.id)}> enroll </button>
        </div>
    );
}
