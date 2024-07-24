import { useFormik } from "formik";
import React from "react";
import { Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userForgetPassword } from "../../services/eventer-service";
import { toastAlert } from "../../utils/SweetAlert";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./account.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: Yup.object({
        email: Yup.string().email().required().label("Email").trim(),
      }),
      onSubmit: async (values) => {
        let payload = new FormData();
        payload.append("email", values?.email);

        try {
          const response = await userForgetPassword(payload);
          if (response.status === 200) {
            toastAlert("success", response?.data?.message);
            navigate("/login");
          }
        } catch (error) {
          console.error(error);
        }
      },
    });

  return (
    <>
      <Header />
      <div className="create_password_main">
        <Container>
          <Row>
            <Col lg={4} className="mx-auto">
              <Card className="border-0">
                <CardBody>
                  <div className="create_password_inner">
                    <div className="create_password_img">
                      <img
                        className="banner-img"
                        src={"/images/create_password.png"}
                      />
                    </div>
                    <div className="create_password_txt">
                      <h4 className="heading_h4 mb-0">Forgot Password</h4>

                      <Form className="mt-3 create_pasword_form">
                        <Form.Group
                          className="mb-3 w-100 position-relative"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="text-danger">
                            {touched.email && errors.email}
                          </p>
                        </Form.Group>

                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="btn-theme-fill w-100 mt-4"
                        >
                          Confirm
                        </button>
                      </Form>
                    </div>
                  </div>
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

export default ForgotPassword;
