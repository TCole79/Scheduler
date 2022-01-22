export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredAppointments = [];
  // loop through array to find the day object

  // finding the day object from state.days that matches the day passed
  const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; // {} | undefined

  // go over the appointments of filteredday and get all the appointment that match from the state.appoinments
  if (!filteredDay) {
    // if day passed doesn't match the state.days
    return [];
  }

  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}
