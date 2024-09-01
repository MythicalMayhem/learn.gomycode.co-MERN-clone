import { ChangeEvent } from "react";
import { pagePropType } from "../Page";
function StaticPage({ checkpointId, page, changeType, update }: pagePropType) {
  return (
    <div className="page">
      <select
        defaultValue="static"
        name="type"
        onChange={(e) => {
          changeType(e.target.value);
        }}
      >
        <option value="static">static</option>
        <option value="order">order</option>
        <option value="quiz">quiz</option>
      </select> 
      <br />
      title:
      <input
        name="title"
        value={page.content["title"]}
        onChange={(e) => {
          update(checkpointId, page.id, "title", e.target.value);
        }}
      />  
      <br />
      paragraph
      <input
        value={page.content["paragraph"]}
        onChange={(e) => {
          update(checkpointId, page.id, "paragraph", e.target.value);
        }}
        name="paragraph"
      />  
      <br />
      slideshow
      <input
        name="title"
        type="file"
        onChange={(e: ChangeEvent) =>
          update(checkpointId, page.id, "slideshow", [
            ...(page.content.slideshow ?? []),
            (e?.target as HTMLInputElement)?.files?.item(0),
          ])
        }
      />  
      <br />
    </div>
  );
}

export default StaticPage;
