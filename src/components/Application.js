import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import Axios from "axios";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday", // The day string is a direct child of the state object
    days: [], // The days array is a direct child of the state object
    appointments: {}, // The appointments object is a direct child of the state object, originally set to null it will set to an object when we book an interview
    interviewers: {}, // The interviewers object is a direct child of the state object
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
        console.log("Response check: ", response);
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

  const setDay = (day) => setState({ ...state, day }); // added this as part of the refactor

  const interviewers = getInterviewersForDay(state, state.day); // get interviewers for each day specified
  const appointments = getAppointmentsForDay(state, state.day); // get appointments for each day specified

  /////----- BOOK INTERVIEW -----/////
  function bookInterview(id, interview) { // this books a new interview
    console.log("id and interview test ", id, interview);

    const appointment = { // create new appointment
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = { // add the new appointment to the list of appointments
      ...state.appointments,
      [id]: appointment
    };

    Axios.put(`/api/appointments/${id}`, appointment) // send the new appointment info to the server
      .then(() => {
        console.log("State update check ", state);
        setState({
          ...state,
          appointments
        })
      })
      .catch((err) => {
        console.log("Error message: ", err)
      })
    }

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      // alternate spread operator code for below Appointment parts (key, id, time)= <Appointment key={appointment.id} {...appointment} />
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview} // prop name on left, what is being passed in on the right
      />
    );
  });

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
