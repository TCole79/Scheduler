/////----- HELPER FUNCTIONS -----/////
// to change all occurences of a name, select it, then press F2 then change

/////----- GET APPOINTMENTS FOR DAY -----/////
export function getAppointmentsForDay(state, day) {
  let filteredAppointments = [];

  let foundDay = state.days.find((weekday) => weekday.name === day);

  if (!foundDay) {
    return [];
  }

  foundDay.appointments.forEach((appointment) => {
    let matchedAppointment = state.appointments[appointment];
    if (matchedAppointment) {
      filteredAppointments.push(matchedAppointment);
    }
  });

  return filteredAppointments;
}

/////----- GET INTERVIEW -----/////
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

/////-----GET INTERVIEWERS FOR DAY -----/////
/* Tristan to review Gabriel's suggested refactor as below
export function getInterviewersForDay(state, day) {
  
  const foundDay = state.days.find((weekday) => weekday.name === day);

  if (!foundDay) {
    return [];
  }

  const filteredInterviewers = foundDay.interviewers.map((interviewer) => {
    return state.interviewers[interviewer]
  });

  return filteredInterviewers;
} */

export function getInterviewersForDay(state, day) {
  let filteredInterviewers = [];

  let foundDay = state.days.find((weekday) => weekday.name === day);
  
  if (!foundDay) {
    return [];
  }

  foundDay.interviewers.forEach((interviewer) => { // foundDay should be an object, with foundDay.interviewers value is an array
    let matchedInterviewer = state.interviewers[interviewer];
    if (matchedInterviewer) {
      filteredInterviewers.push(matchedInterviewer);
    }
  });

  return filteredInterviewers;
}




// Gary's example for debugging
/*
export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const foundDay = state.days
  .find((weekday) => weekday.name === day)
  
    if (!foundDay) {
    return [];
  }
  
  foundDay.appointments.forEach((appointment) => {
    const matchedAppointment = state.appointments[appointment]; // { id: 4, time: "3pm", interview: null } | undefined
    if (matchedAppointment) {
      appointments.push(matchedAppointment);
      console.log(appointment)
    }
  });

  return appointments;
}

//---get interviewers for day ---//
export function getInterviewersForDay(state, day) {
  
  const foundDay = state.days
  .find((weekday) => weekday.name === day)
  
    if (!foundDay) {
      return []
    };

  const interviewers = [];

  foundDay.interviewers.forEach((interviewer) => {
    const matchedInterviewer = state.interviewers[interviewer];
    if (matchedInterviewer) {
      interviewers.push(matchedInterviewer);
    }
  });

  return interviewers;
}
*/