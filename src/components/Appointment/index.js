import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log("props.interview.student test ", mode === SHOW && props.interview.student);

  /////----- SAVE -----/////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING) // this shows the saving transition
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW); // this calls the transition function, with 'SHOW' as the argument
        console.log("transition check ", transition);
      })
      // .catch((err) => {});
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={() => back(EMPTY)}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
      {mode === SAVING}
    </article>
  );
}
