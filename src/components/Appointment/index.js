import React, { Fragment } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM_DELETE = "CONFIRM_DELETE";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /////----- SAVE -----/////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING); // this shows the saving transition
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW); // this calls the transition function, with 'SHOW' as the argument
    });
  }
  /////----- DELETE -----/////
  function cancel() {
    //transition(CONFIRM)
    transition(DELETING);
    props.cancelInterview(props.id).then(() => transition(EMPTY));
  }
  /////----- CONFIRM DELETE -----/////
  function confirmDelete() {
    transition(CONFIRM_DELETE);
  }
  /////----- EDIT -----/////
  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onDelete={confirmDelete} // linked to confirm delete function
          onEdit={edit} // linked to edit function
        />
      )}
      {mode === CREATE && (
        <Form
          onCancel={() => back(EMPTY)}
          interviewers={props.interviewers}
          onSave={save} // linked to save function
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM_DELETE && (
        <Confirm
          message="Are you certain you want to cancel?"
          onConfirm={cancel}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
        />
      )}
    </article>
  );
}
