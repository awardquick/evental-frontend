import { useFormik } from "formik";
import React, { useState } from "react";
import { Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { EyeIcon, EyeSlashIcon } from "../../SvgIcons/allIcons";
import { createPassword } from "../../services/eventee-service";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./account.css";

function CreatePassword() {
  const [passwordSeen, setPasswordSeen] = useState(false);
  const [confirmPasswordSeen, setConfirmPasswordSeen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object({
        newPassword: Yup.string()
          .matches(
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
            "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character."
          )
          .required()
          .label("New password")
          .trim(),
        confirmPassword: Yup.string()
          .required()
          .label("Repeat password")
          .oneOf(
            [Yup.ref("newPassword"), null],
            "Passwords and confirm password must match"
          )
          .trim(),
      }),
      onSubmit: async (values) => {
        let payload = new FormData();
        payload.append("user_id", id);
        payload.append("password", values.newPassword);
        payload.append("confirm_password", values.confirmPassword);
        try {
          const response = await createPassword(payload);
          if (response.status === 200) {
            navigate("/login");
          }
        } catch (error) {}
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
                      <h4 className="heading_h4 mb-0">
                        Create Your New Password
                      </h4>

                      <Form className="mt-3 create_pasword_form">
                        <Form.Group
                          className="mb-3 w-100 position-relative"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Your New Password</Form.Label>
                          <Form.Control
                            className="text-capitalize"
                            type={passwordSeen ? "text" : "password"}
                            placeholder="Password"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="text-danger">
                            {touched.newPassword && errors.newPassword}
                          </p>
                          <span
                            className="eye-icon"
                            onClick={() => setPasswordSeen((prev) => !prev)}
                          >
                            {passwordSeen ? <EyeIcon /> : <EyeSlashIcon />}
                          </span>
                        </Form.Group>
                        <Form.Group
                          className="mb-0 w-100 position-relative"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Repeat New Password</Form.Label>
                          <Form.Control
                            className="text-capitalize"
                            type={confirmPasswordSeen ? "text" : "password"}
                            placeholder="Repeat New Password"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <p className="text-danger">
                            {touched.confirmPassword && errors.confirmPassword}
                          </p>
                          <span
                            className="eye-icon"
                            onClick={() =>
                              setConfirmPasswordSeen((prev) => !prev)
                            }
                          >
                            {confirmPasswordSeen ? (
                              <EyeIcon />
                            ) : (
                              <EyeSlashIcon />
                            )}
                          </span>
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

export default CreatePassword;
