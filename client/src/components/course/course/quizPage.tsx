import { page } from "../../../lib/courseStore";

function Quiz(props: { page?: page }) {
  return (
    <div className="quiz-page">
      <h3>{props.page?.title}</h3>
    </div>);
}

export default Quiz;