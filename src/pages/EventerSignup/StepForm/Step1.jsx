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
import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import "./step.css";
import { EyeIcon, EyeSlashIcon } from "../../../SvgIcons/allIcons";
import { acceptOnlyNum } from "../../../utils/commonFunction";

const Step1 = ({
  nextStep,
  progressPercent,
  steps,
  firstForm,
  setFirstForm,
}) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: firstForm,
    validationSchema: yup.object().shape({
      firstName: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required()
        .label("First Name")
        .trim(),
      lastName: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required()
        .label("Last Name")
        .trim(),
      phone: yup
        .string()
        .min(5, "Mobile number must be between 5–15 digits")
        .max(15, "Mobile number must be between 5–15 digits")
        .required()
        .label("Mobile Number"),
      email: yup.string().email().required().label("Email").trim(),
      company_name: yup.string().required().label("Company Name").trim(),
      eni: yup.string().required().label("EIN").trim(),
      password: yup
        .string()
        .required()
        .label("Create Password")
        .matches(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
          "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character."
        )
        .trim(),
      confirm_password: yup
        .string()
        .required()
        .label("Repeat Password")
        .trim()
        .oneOf(
          [yup.ref("password"), null],
          "Passwords and confirm password must match"
        ),
      driving_licence: yup
        .mixed()
        .test("type", "Please select jpg, png, jpeg format", function (value) {
          return (
            value &&
            (value.type === "image/jpg" ||
              value.type === "image/png" ||
              value.type === "image/jpeg")
          );
        }),
      your_selfie: yup
        .mixed()
        .test("type", "Please select jpg, png, jpeg format", function (value) {
          return (
            value &&
            (value.type === "image/jpg" ||
              value.type === "image/png" ||
              value.type === "image/jpeg")
          );
        }),
    }),
    onSubmit: async (values) => {
      setFirstForm(values);
      nextStep();
    },
  });

  const [passwordSeen, setPasswordSeen] = useState(false);
  const [confirmPasswordSeen, setConfirmPasswordSeen] = useState(false);

  return (
    <>
      <Header />
      <div className="Stepform_area">
        <Container>
          <Row>
            <Col lg={7} className="mx-auto">
              <div className="step_inner">
                <div className="mb-5">
                  <div className="step-head">
                    <h4>List your Product</h4>
                    <h5>Step {steps} of 5</h5>
                  </div>
                  <ProgressBar now={progressPercent} />
                </div>
                <Card className="padding border-0">
                  <Card.Body className="p-0">
                    <div className="step-form">
                      <h2>Verification of Identity</h2>
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                type="text"
                                className="text-capitalize"
                                placeholder="Enter First Name"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                maxLength={255}
                              />
                              {touched.firstName && errors.firstName ? (
                                <div className="text-danger">
                                  {errors.firstName}
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
                                placeholder="Enter Last Name"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                maxLength={255}
                              />
                              {touched.lastName && errors.lastName ? (
                                <div className="text-danger">
                                  {errors.lastName}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Mobile Number</Form.Label>
                              <Form.Control
                                type="tel"
                                placeholder="Enter Mobile Number"
                                name="phone"
                                onChange={(e) => {
                                  if (e.target.value?.charCodeAt(0) == 69) {
                                    e.preventDefault();
                                  } else {
                                    handleChange(e);
                                  }
                                }}
                                onBlur={handleBlur}
                                value={values.phone}
                                onKeyPress={acceptOnlyNum}
                              />
                              {touched.phone && errors.phone ? (
                                <div className="text-danger">
                                  {errors.phone}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Company Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Company Name"
                                name="company_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.company_name}
                                maxLength={255}
                              />
                              {touched.company_name && errors.company_name ? (
                                <div className="text-danger">
                                  {errors.company_name}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>

                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>EIN</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter EIN"
                                name="eni"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.eni}
                                maxLength={255}
                              />
                              {touched.eni && errors.eni ? (
                                <div className="text-danger">
                                  {errors.eni}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                              />
                              {touched.email && errors.email ? (
                                <div className="text-danger">
                                  {errors.email}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <div className="image_upload">
                              <h4 className="heading-h4 mb-1">
                                Driver License
                              </h4>
                              <div className="upload-images-box">
                                <div className="label">
                                  {values?.driving_licence?.type?.includes(
                                    "image"
                                  ) && values?.driving_licence ? (
                                    <img
                                      src={URL.createObjectURL(
                                        values?.driving_licence
                                      )}
                                      alt="Img"
                                    />
                                  ) : (
                                    <img
                                      src={"/images/file-upload.svg"}
                                      alt="Img"
                                    />
                                  )}
                                </div>
                                <input
                                  type="file"
                                  name="driving_licence"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "driving_licence",
                                      e.target.files[0]
                                    );
                                  }}
                                  accept=".png, .jpg, .jpeg"
                                />
                              </div>
                              {touched.driving_licence &&
                              errors.driving_licence ? (
                                <div className="text-danger">
                                  {errors.driving_licence}
                                </div>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="image_upload">
                              <h4 className="heading-h4 mb-1">Please upload a recent picture that matches your ID</h4>
                              <div className="upload-images-box">
                                <div className="label">
                                  {values?.your_selfie?.type?.includes(
                                    "image"
                                  ) && values?.your_selfie ? (
                                    <img
                                      src={URL.createObjectURL(
                                        values?.your_selfie
                                      )}
                                      alt="Img"
                                    />
                                  ) : (
                                    <img
                                      src={"/images/file-upload.svg"}
                                      alt="Img"
                                    />
                                  )}
                                </div>
                                <input
                                  type="file"
                                  name="your_selfie"
                                  accept=".png, .jpg, .jpeg"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "your_selfie",
                                      e.target.files[0]
                                    );
                                  }}
                                />
                              </div>
                              {touched.your_selfie && errors.your_selfie ? (
                                <div className="text-danger">
                                  {errors.your_selfie}
                                </div>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="change_password">
                              <h6 className="heading_h6">Create password</h6>
                              <Row>
                                <Col lg={6}>
                                  <FormGroup className="position-relative">
                                    <Form.Label htmlFor="oldpass">
                                      Create Password
                                    </Form.Label>
                                    <Form.Control
                                      type={passwordSeen ? "text" : "password"}
                                      id="oldpass"
                                      placeholder="Enter Password"
                                      name="password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password}
                                    />
                                    {touched.password && errors.password ? (
                                      <div className="text-danger">
                                        {errors.password}
                                      </div>
                                    ) : null}
                                    <span
                                      className="eye-icon"
                                      onClick={() =>
                                        setPasswordSeen((prev) => !prev)
                                      }
                                    >
                                      {passwordSeen ? (
                                        <EyeIcon />
                                      ) : (
                                        <EyeSlashIcon />
                                      )}
                                    </span>
                                  </FormGroup>
                                </Col>

                                <Col lg={6}>
                                  <FormGroup className="position-relative">
                                    <Form.Label htmlFor="newpass">
                                      Repeat Password
                                    </Form.Label>
                                    <Form.Control
                                      type={
                                        confirmPasswordSeen
                                          ? "text"
                                          : "password"
                                      }
                                      id="newpass"
                                      placeholder="Enter Repeat Password"
                                      name="confirm_password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.confirm_password}
                                    />
                                    {touched.confirm_password &&
                                    errors.confirm_password ? (
                                      <div className="text-danger">
                                        {errors.confirm_password}
                                      </div>
                                    ) : null}
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
                                  </FormGroup>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </Form>

                      <Link
                        onClick={() => {
                          handleSubmit();
                          // nextStep();
                        }}
                        className="btn-theme-fill w-100"
                      >
                        Next Step
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Step1;
