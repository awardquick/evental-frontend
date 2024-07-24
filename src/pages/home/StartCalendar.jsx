import React from "react";
import { CalendarContainer } from "react-datepicker";

const StartCalendar = ({ className, children}) => {
  return (
    <div className="calendar-outer">
      <CalendarContainer className={className}>
        <h4 className="title">Start Date</h4>
        <p className="sub-title">Select the start date of the lease</p>
        <div style={{ position: "relative" }}>{children}</div>

      </CalendarContainer>
    </div>
  );
};

export default StartCalendar;
