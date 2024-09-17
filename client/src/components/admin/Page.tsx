import React from "react";
import StaticPage from "./pages/static";
import OrderPage from "./pages/order";
import QuizPage from "./pages/quiz";
import { Page as typePage } from "./AddCourse";

export interface pagePropType {
  changeType: Function;
  update: (
    checkpointId: string,
    pageId: string,
    field: string,
    value: any
  ) => void;
  page: typePage;
  checkpointId: string;
}

export function Page({ checkpointId, page, changeType, update }: pagePropType) {

  if (page.type === "order") {
    return (
      <OrderPage
        checkpointId={checkpointId}
        page={page}
        changeType={changeType}
        update={update}
      />
    );
  } else if (page.type === "quiz") {
    return (
      <QuizPage
        checkpointId={checkpointId}
        page={page}
        changeType={changeType}
        update={update}
      />
    );
  }
  return (
    <StaticPage
      checkpointId={checkpointId}
      page={page}
      changeType={changeType}
      update={update}
    />
  );
}
