/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import { useFormik } from "formik";
import React from "react";
import { CardBody, Col, Container, Form, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import * as yup from "yup";
import useToken from "../../hooks/useToken";
import { contactUs } from "../../services/eventee-service";
import { toastAlert } from "../../utils/SweetAlert";
import { acceptOnlyNum } from "../../utils/commonFunction";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";
import "./Contact.css";

function Contact() {
  const token = useToken();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      mobile_no: "",
      email: "",
      message: "",
      mail_alert: false,
    },
    validationSchema: yup.object().shape({
      first_name: yup.string().required().label("First Name"),
      last_name: yup.string().required().label("Last Name"),
      mobile_no: yup
        .string()
        .min(5, "Mobile number must be between 5–15 digits")
        .max(15, "Mobile number must be between 5–15 digits")
        .required()
        .label("Mobile Number"),
      email: yup.string().email().required().label("Email").trim(),
      message: yup.string().required().trim().label("Message"),
    }),
    onSubmit: async (values) => {
      try {
        let payload = {
          first_name: values?.first_name,
          last_name: values?.last_name,
          mobile_no: values?.mobile_no,
          email: values?.email,
          message: values?.message,
          mail_alert: values?.mail_alert ? 1 : 0,
        };
        const formData = new FormData();
        Object.keys(payload).forEach((i) => {
          formData.append(i, payload[i]);
        });
        const resp = await contactUs(formData);
        if (resp?.data?.status == 200) {
          toastAlert("success", resp?.data?.message);
          resetForm();
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  });
  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <div className="Contact_main">
        <Container>
          <Row>
            <Col lg={6} md={12}>
              <div className="Contact_top_txt">
                <h2 className="heading_h2 mb-0">
                  <span> Help Center</span> How can we help you?
                </h2>
               
              </div>

              <div className="Contact_bottom_txt">
                <h3 className="mb-0">Something Urgent?</h3>
                <p className="mb-0">
                  Email us directly at{" "}
                  <a
                    href="mailto:Help@eventalHQ.com;"
                    className="text-decoration-underline"
                  >
              Help@eventalHQ.com
                  </a>
                </p>
              </div>
            </Col>

            <Col lg={6} md={12}>
              <Card className="border-0">
                <CardBody>
                  <h2 className="heading_h2">Fill the form</h2>
                  <Form className="contact_form">
                    <Row>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="text-capitalize"
                            placeholder="First Name"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            maxLength={255}
                          />
                          {touched.first_name && errors.first_name ? (
                            <div className="text-danger">
                              {errors.first_name}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            className="text-capitalize"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            maxLength={255}
                          />
                          {touched.last_name && errors.last_name ? (
                            <div className="text-danger">
                              {errors.last_name}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            placeholder="Phone"
                            name="mobile_no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.mobile_no}
                            onKeyPress={acceptOnlyNum}
                          />
                          {touched.mobile_no && errors.mobile_no ? (
                            <div className="text-danger">
                              {errors.mobile_no}
                            </div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col lg={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          {touched.email && errors.email ? (
                            <div className="text-danger">{errors.email}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <Form.Group className="form_textarea ">
                          <Form.Label>Type your message</Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Type your message"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                          />
                          {touched.message && errors.message ? (
                            <div className="text-danger">{errors.message}</div>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col lg={12}>
                        <div className="rember_check">
                          {["checkbox"].map((type) => (
                            <div key={`default-${type}`}>
                              <Form.Check
                                type={type}
                                id={`default-${type}`}
                                label={`Call/text me future opportunities`}
                                name="mail_alert"
                                value={values?.mail_alert}
                                onChange={handleChange}
                              />
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Row>
                    <div className="form_span">
                      <span className="mb-0">
                        Yes, I agree to receive job alerts from Midpoint
                        Logistics LLC and those acting on its behalf.
                      </span>
                    </div>

                    <div className="contact_btn">
                      <span
                        className="btn-theme-fill"
                        style={{ cursor: "pointer" }}
                        onClick={handleSubmit}
                      >
                        Send
                      </span>
                    </div>
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

export default Contact;
