import React from "react";
import Header from "../Eventer/AuthHeader";
import Footer from "../Common/Footer";
import {Col, Container, Row } from "react-bootstrap";
import "./chat.css";

const EmptyChat = () => {
  return (
    <>
      <Header />
      <div className="chat_screen">
        <Container>
          <Row>
            <Col lg={6} className="mx-auto">
              <div className="empty-box">
                <img src={"/images/empty-chat.svg"} alt="Img" />
                <h6>You have no messages</h6>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EmptyChat;
