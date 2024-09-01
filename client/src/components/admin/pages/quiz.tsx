import { useState } from "react";

import { pagePropType } from "../Page";

function QuizPage({ checkpointId, page, changeType, update }: pagePropType) {
  const [option, setOption] = useState("");
  return (
    <div className="page">
      <select
        defaultValue="quiz"
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
        value={page.content.title}
        onChange={(e) => {
          update(checkpointId, page.id, "title", e.target.value);
        }}
      />{" "}
      <br />
      paragraph:
      <input
        value={page.content["paragraph"]}
        onChange={(e) => {
          update(checkpointId, page.id, "paragraph", e.target.value);
        }}
        name="paragraph"
      />{" "}
      <br />
      add option
      <input
        type="text"
        value={option}
        onChange={(e) => setOption(e.target.value)}
      />
      <button
        onClick={() => {
          update(checkpointId, page.id, "options", [
            ...(page.content["options"] ?? []),
            option,
          ]);
          setOption("");
        }}
      >
        {" "}
        <br />
        Add option
      </button>{" "}
      <br />
      options
      <ul>
        {page.content.options?.map((el: string, i: number) => (
          <li key={i}>{el}</li>
        ))}
      </ul>
      correct{" "}
      <input
        type="number"
        min={0}
        max={page.content.options?.length || 0}
        value={page.content.correct}
        onChange={(e) => {
          update(
            checkpointId,
            page.id,
            "correct",
            Math.min(Number(e.target.value), page.content.options?.length || 0)
          );
        }}
      />
      <p>
        {page.content.options && page.content.options.length > 0
          ? page.content.options[(page.content.correct || 0) - 1]
          : ""}
      </p>
    </div>
  );
}

export default QuizPage;
