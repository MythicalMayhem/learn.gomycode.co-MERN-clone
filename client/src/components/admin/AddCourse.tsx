import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Page as PageComponent } from "./Page";
import React from "react";

const newPage = (type: string, pageId: string): Page => {
  if (type === "order") {
    return {
      type: type,
      id: pageId,
      content: {
        title: "new title",
        paragraph: "lorem paragraph",
        scattered: [],
      },
    };
  }
  if (type === "quiz") {
    return {
      id: pageId,
      type: type,
      content: {
        title: "new title",
        paragraph: "lorem paragraph",
        options: [],
        correct: 0,
      },
    };
  }
  return {
    type: "static",
    id: pageId,
    content: {
      title: "new title",
      paragraph: "lorem paragraph",
      slideshow: [],
    },
  };
};
function createUrl(obj: File) {
  return URL.createObjectURL(obj);
}
export interface Page {
  id: string;
  type: "static" | "quiz" | "order";
  content: {
    ["paragraph"]: string;
    ["title"]: string;
    ["slideshow"]?: Array<any>;
    ["options"]?: Array<string>;
    ["scattered"]?: Array<number>;
    ["correct"]?: number;
  };
}

export interface Checkpoint {
  name: string;
  pages: { [id: string]: Page };
}

export interface Checkpoints {
  [id: string]: Checkpoint;
}

export function AddCourse() {
  const [courseImage, setCourseImage] = useState<any>(null);
  const [courseName, setCourseName] = useState("course_name");
  const [checkpoints, setCheckpoints] = useState<Checkpoints>({});
  const [checkpointName, setCheckpointName] = useState("checkpoint_name");
  const addCheckPoint = () => {
    const id = uuidv4();
    const pid = uuidv4();

    setCheckpoints({
      ...checkpoints,
      [id]: {
        name: checkpointName,
        pages: {
          [pid]: {
            id: pid,
            type: "static",
            content: {
              title: "page title",
              paragraph: "Lorem ipsum dolor",
              slideshow: [],
            },
          },
        },
      },
    });
  };
  const handleTypeChange = (
    checkpointId: string,
    type: string,
    pageId: string
  ) => {
    const checkpoint = checkpoints[checkpointId];
    setCheckpoints({
      ...checkpoints,
      [checkpointId]: {
        ...checkpoint,
        pages: { ...checkpoint.pages, [pageId]: newPage(type, pageId) },
      },
    });
  };
  const update = (
    checkpointId: string,
    pageId: string,
    field: string,
    value: any
  ) => {
    const checkpoint: Checkpoint = checkpoints[checkpointId];
    const page = checkpoint.pages[pageId];
    setCheckpoints({
      ...checkpoints,
      [checkpointId]: {
        ...checkpoint,
        pages: {
          ...checkpoint.pages,
          [pageId]: {
            ...page,
            content: { ...page["content"], [field]: value },
          },
        },
      },
    });
  };

  const page = (checkpointId: string, pageId: string) => {
    const checkpoint = checkpoints[checkpointId];
    return (
      <PageComponent
        key={pageId}
        checkpointId={checkpointId}
        update={update}
        page={checkpoint.pages[pageId]}
        changeType={(type: string) => {
          handleTypeChange(checkpointId, type, pageId);
        }}
      />
    );
  };

  const checkpoint = (checkpointId: string, checkpointIndex: any) => {
    return (
      <div key={checkpointIndex}>
        {checkpoints[checkpointId].name}
        {Object.keys(checkpoints[checkpointId].pages).map((pageId: string) =>
          page(checkpointId, pageId)
        )}
      </div>
    );
  };
  const handleSubmit = (data: Checkpoints) => {
    fetch("http://127.0.0.1:3001/AddCourse", {
      method: "POST",
      body: JSON.stringify(checkpoints),
    }).then((res)=>res.json()).then(console.log)
  };
  return (
    <>
      <button onClick={() => handleSubmit(checkpoints)}> SAVE</button>
      <br />
      <br />
      course name :
      <input
        type="text"
        name="course-name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <br />
      course image :{" "}
      <input
        type="file"
        name="course-img"
        onChange={(e) => setCourseImage(e.target.files?.item(0) || null)}
      />{" "}
      <br />
      <b> {courseName} </b> <br />
      {courseImage && (
        <img height="200px" alt="course" src={createUrl(courseImage)} />
      )}
      <br />
      <input
        value={checkpointName}
        onChange={(e) => setCheckpointName(e.target.value)}
      />
      <br />
      <button onClick={addCheckPoint}>Add Checkpoint</button> <br />
      checkpoints :{Object.keys(checkpoints).map(checkpoint)}
      <pre>{JSON.stringify(checkpoints, undefined, "  ")}</pre>
    </>
  );
}
