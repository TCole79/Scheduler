/////----- HELPER FUNCTIONS -----/////

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredAppointments = [];
  // loop through array to find the day object

  // finding the day object from state.days that matches the day passed
  const filteredDay = state.days.filter((weekday) => weekday.name === day)[0]; // {} | undefined

  // if day passed doesn't match the state.days
  if (!filteredDay) {
    return [];
  }
  // go over the appointments of filteredday and get all the appointment that match from the state.appoinments
  filteredDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}




export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  let interviewer = state.interviewers[interview.interviewer]; // state is current state, then we access the interviewers object, then we access the interviewer id
  return { ...interview, interviewer }; // we are creating an object, containing the interview properties (student + interviewer as a number) then after the , we add another key to the object which is the 'interviewer'
}

/* explanation as below of what this function is trying to access:
const interview = {student:'Name of the Student', interviewer:7}
const interviewer = {avatar: 'url/here', id:7, name:'Interviewer Name'}
const newObject = {
  student: 'Name of the Student',
  interviewer:7,
  interviewer : {
    avatar: 'url/here', id:7, name:'Interviewer Name'
  }
} */