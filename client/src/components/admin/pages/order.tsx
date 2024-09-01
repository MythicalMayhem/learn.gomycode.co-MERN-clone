import { Page as typePage } from "../AddCourse";

interface typeProp {
  changeType: Function;
  update: Function;
  page: typePage;
  checkpointId: string;
}
function OrderPage({ page, changeType, update, checkpointId }: typeProp) {
  return (
    <div className="page">
      <select
        defaultValue="order"
        name="type"
        onChange={(e) => {
          changeType(e.target.value);
        }}
      >
        <option value="static">static</option>
        <option value="order"> order</option>
        <option value="quiz"> quiz</option>
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
      paragraph:
      <input
        value={page.content["paragraph"]}
        onChange={(e) => {
          update(checkpointId, page.id, "paragraph", e.target.value);
        }}
        name="paragraph"
      />
      <br />
      <br />
      {page.content.paragraph
        .replace(/\s\s+/g, " ")
        .trim()
        .split(" ")
        .map((word, index) => {
          const elInd = (page.content.scattered || []).findIndex(
            (el) => el === index
          );
          if (elInd > -1) {
            return (
              <button
                style={{ opacity: "25%" }}
                key={index}
                onClick={() =>
                  update(checkpointId, page.id, "scattered", [
                    ...(page.content.scattered?.filter(
                      (item) => item !== index
                    ) ?? []),
                  ])
                }
              >
                {word}
              </button>
            );
          }

          return (
            <button
              key={index}
              onClick={() =>
                update(checkpointId, page.id, "scattered", [
                  ...(page.content.scattered || []),
                  index,
                ])
              }
            >
              {word}
            </button>
          );
        })}
    </div>
  );
}

export default OrderPage;
