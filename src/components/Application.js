import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import Axios from "axios";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  
  const setDay = (day) => setState({ ...state, day }); // added this as part of the refactor

  //const showInterviewers = getInterviewersForDay(state, state.day); // get interviewers for each day specified
  const appointments = getAppointmentsForDay(state, state.day); // get appointments for each day specified

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      // alternate code for below Appointment = <Appointment key={appointment.id} {...appointment} />
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });

  // Intital request to get all the data from the three endpoints, days, appointments, interviewers
  useEffect(() => {
    const fetchDays = Axios.get("http://localhost:8001/api/days");
    const fetchAppointments = Axios.get(
      "http://localhost:8001/api/appointments"
    );
    const fetchInterviewers = Axios.get(
      "http://localhost:8001/api/interviewers"
    );

    Promise.all([
      Promise.resolve(fetchDays),
      Promise.resolve(fetchAppointments),
      Promise.resolve(fetchInterviewers),
    ])
      .then((response) => {
        setState((prev) => ({
          ...prev,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
