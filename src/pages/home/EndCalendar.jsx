import React from "react";
import { Col, Row } from "react-bootstrap";
import { CalendarContainer } from "react-datepicker";

const EndCalendar = ({ className, children}) => {
  return (
    <div className="calendar-outer">
      <CalendarContainer className={className}>
        <h4 className="title">End Date</h4>
        <p className="sub-title">Select the end date of the lease</p>
        <div style={{ position: "relative" }}>{children}</div>

        <Row>
          <Col xs={6}>
            <button className="btn-theme-fill w-100">Confirm</button>
          </Col>
          <Col xs={6}>
            <button className="btn-theme-outline w-100">Cancel</button>
          </Col>
        </Row>
      </CalendarContainer>
    </div>
  );
};

export default EndCalendar;
