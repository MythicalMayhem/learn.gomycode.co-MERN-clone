import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Page as PageComponent } from "./Page";

const newPage = (type: string, pageId: string): Page => {
  if (type === "order") {
    return {
      name: "page name",
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
      name: "page name",
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
    name: "page name",
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
  name: string
  content: {
    ["title"]: string;
    ["paragraph"]: string;
    ["slideshow"]?: Array<any>;
    ["options"]?: Array<string>;
    ["scattered"]?: Array<number>;
    ["correct"]?: number;
  };
}

export interface Checkpoint {
  name: string;
  pages: { [id: string]: (Page | undefined) };
}

export interface Checkpoints {
  [id: string]: Checkpoint;
}
export interface Course {
  id: string;
  name: string;
  image: string;
  checkpoints: Checkpoints;
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
            name: "page name",
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
            content: { ...page?.content, [field]: value },
          },
        },
      },
    } as Checkpoints);
  };

  const page = (checkpointId: string, pageId: string) => {
    const checkpoint = checkpoints[checkpointId];
    if (!checkpoint.pages[pageId]) return
    return (
      <PageComponent
        checkpointId={checkpointId}
        update={update}
        page={checkpoint.pages[pageId] as Page}
        changeType={(type: string) => handleTypeChange(checkpointId, type, pageId)}
      />
    );
  };
  const addPage = (checkpointId: string, id: string) => setCheckpoints({ ...checkpoints, [checkpointId]: { ...checkpoints[checkpointId], pages: { ...checkpoints[checkpointId].pages, [id]: newPage("static", id) } } })
  const deletePage = (checkpointId: string, pageId: string) => setCheckpoints({ ...checkpoints, [checkpointId]: { ...checkpoints[checkpointId], pages: { ...checkpoints[checkpointId].pages, [pageId]: undefined } } })
  const deleteCheckPoint = (checkpointId: string) => setCheckpoints({ ...checkpoints, [checkpointId]: undefined } as Checkpoints)
  const checkpoint = (checkpointId: string, checkpointIndex: any) => {
    if (!checkpoints[checkpointId]) return <></>
    return (
      <>
        {checkpoints[checkpointId].name}
        <ul>
          {Object.keys(checkpoints[checkpointId].pages).map((pageId: string, index: number) =>
            checkpoints[checkpointId].pages[pageId]
            && <li key={index}>
              {page(checkpointId, pageId)}
              <button onClick={() => deletePage(checkpointId, pageId)}>Delete Page</button>
            </li>
          )}
        </ul>
        <button onClick={() => addPage(checkpointId, uuidv4())}>Add Page</button><br />
        <button onClick={() => deleteCheckPoint(checkpointId)}>Delete Checkpoint</button>
      </>
    );
  };
  const handleSubmit = (data: Checkpoints) =>
    fetch("http://127.0.0.1:3001/AddCourse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkpoints, id: uuidv4(), name: courseName }),
    }).then(res => res.json())
      .then(console.log);

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
      checkpoints :
      <ul>
        {Object.keys(checkpoints).map((checkpointid, index) =>
          checkpoints[checkpointid] && <li key={index}> {checkpoint(checkpointid, index)} </li>)}
      </ul>
      <pre>{JSON.stringify(checkpoints, null, "  ")}</pre>
    </>
  );
}
