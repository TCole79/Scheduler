import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const showDay = props.days.map((day) =>(
  // alternate way to consider is that this immediately should return something
    <DayListItem 
      key={day.id}
      name={day.name} 
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
    />
    )
  ) 

  return (
    <ul>{showDay}</ul>
  );
}