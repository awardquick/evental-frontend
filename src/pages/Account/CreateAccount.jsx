import React from "react";
import { Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./account.css";

function CreateAccount() {
  return (
    <>
      <Header />
      <div className="created_account_main">
        <Container>
          <Row className="ptb-30">
            <Col lg={6} className="mx-auto">
              <Card className="border-0">
                <CardBody>
                  <div className="created_account_heading">
                    <h2 className="heading_h2 mb-0 ">Create Account</h2>
                  </div>

                  <Form className="created_account_form">
                    <Row>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            className="text-capitalize"
                            type="text"
                            placeholder="First Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            className="text-capitalize"
                            type="type"
                            placeholder="Last Name"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile Number</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Mobile Number"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email" placeholder="Email" />
                        </Form.Group>{" "}
                      </Col>
                    </Row>
                    <Link
                      to="/EmailConformation"
                      className="btn-theme-fill mt-4 w-100"
                    >
                      Register
                    </Link>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default CreateAccount;
