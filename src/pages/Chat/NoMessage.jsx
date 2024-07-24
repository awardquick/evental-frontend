import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Common/Footer";
import Header from "../Eventer/AuthHeader";
import "./chat.css";

const NoMessage = () => {
  return (
    <>
      <Header />
      <div className="chat_screen">
        <Container>
          <Row>
            <Col lg={5} xl={5} xxl={6}>
              <div className="title-sec mb-4">
                <h2>Messages</h2>
              </div>
              <div className="message_list">
                <ul>
                  <li>
                    <img src={"/images/bhooth-img-1.png"} alt="Img" />
                    <div className="w-100">
                      <span className="d-flex align-items-center justify-content-between">
                        <h5 className="name">Alex </h5>
                        <p className="date">10,09.2023</p>
                      </span>
                      <h4 className="booth_name">Photo booth regular</h4>
                      <p className="msg">Hi mate! How are you?</p>
                    </div>
                  </li>
                  <li>
                    <img src={"/images/bhooth-img-2.png"} alt="Img" />
                    <div className="w-100">
                      <span className="d-flex align-items-center justify-content-between">
                        <h5 className="name">Alex </h5>
                        <p className="date">10,09.2023</p>
                      </span>
                      <span className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4 className="booth_name">Photo booth regular</h4>
                          <p className="msg">Hi mate! How are you?</p>
                        </div>
                        <div className="pending_count">2</div>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={7} xl={7} xxl={6}>
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

export default NoMessage;
