import { page } from "../../../lib/courseStore";
function Static(props: { page?: page }) {
  return (
    <div className="static-page">
      <h3>{props.page?.title}</h3>
      <p> 
        { props.page?.content.desc } 
      </p>
    </div>);
}

export default Static;