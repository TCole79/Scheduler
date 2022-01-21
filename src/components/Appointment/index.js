import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  // anything rendering in the return statement
  // </> syntax for react component

  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? (
        <Show
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
