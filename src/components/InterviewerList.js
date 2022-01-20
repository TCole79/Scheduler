import React, { useState } from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const [value, setValue] = useState(props.value);
  const onChange = (id) => {
    setValue(id);
  }

  const showInterviewer = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer.id)}
    />
  ));

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{showInterviewer}</ul>
    </section>
  );
}
