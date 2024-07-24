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
import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../Css/_common.css";
import { EyeIcon, EyeSlashIcon } from "../../SvgIcons/allIcons";
import useDetail from "../../hooks/useDetail";
import { login } from "../../redux/features/authSlice";
import { updateProfile } from "../../services/eventee-service";
import Footer from "../Common/Footer";
import Header from "./AuthHeader";
import { acceptOnlyNum } from "../../utils/commonFunction";

function EventerEditProfile() {
  const [oldPasswordSeen, setOldPasswordSeen] = useState(false);
  const [newPasswordSeen, setNewPasswordSeen] = useState(false);
  const dispatch = useDispatch();
  const details = useDetail();
  const navigate = useNavigate();
  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      selfie: "",
      selfiePicked: "",
      driver_license: "",
      driver_license_picked: "",
      oldPassword: "",
      newPassword: "",
      company_name: "",
      eni:""
    },
    validationSchema: yup.object().shape(
      {
        firstName: yup.string().required().label("First name").trim(),
        lastName: yup.string().required().label("Last name").trim(),
        company_name: yup.string().required().label("Company Name").trim(),
        eni: yup.string().required().label("EIN").trim(),
        mobileNumber: yup
          .string()
          .min(5, "Mobile number must be between 5–15 digits")
          .max(15, "Mobile number must be between 5–15 digits")
          .required()
          .trim()
          .label("Mobile Number"),
        oldPassword: yup
          .string()
          .when("newPassword", {
            is: (newPassword) => newPassword?.length,
            then: () => yup.string().required().label("Old password"),
          })
          .trim(),
        newPassword: yup
          .string()
          .when("oldPassword", {
            is: (oldPassword) => oldPassword?.length,
            then: () =>
              yup
                .string()
                .required()
                .label("New password")
                .matches(
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
                  "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character."
                ),
          })
          .trim(),
        selfiePicked: yup.mixed().when(([selfiePicked], schema) => {
          if (selfiePicked) {
            return yup
              .mixed()
              .test(
                "type",
                "Please select jpg, png, jpeg format",
                function (value) {
                  return (
                    value &&
                    (value.type === "image/jpg" ||
                      value.type === "image/png" ||
                      value.type === "image/jpeg")
                  );
                }
              );
          }
          return schema;
        }),
        driver_license_picked: yup
          .mixed()
          .when(([driver_license_picked], schema) => {
            if (driver_license_picked) {
              return yup
                .mixed()
                .test(
                  "type",
                  "Please select jpg, png, jpeg format",
                  function (value) {
                    return (
                      value &&
                      (value.type === "image/jpg" ||
                        value.type === "image/png" ||
                        value.type === "image/jpeg")
                    );
                  }
                );
            }
            return schema;
          }),
      },
      ["newPassword", "oldPassword"]
    ),
    onSubmit: async (values) => {
      const payload = new FormData();
      payload.append("first_name", values.firstName);
      payload.append("last_name", values.lastName);
      payload.append("mobile_no", values.mobileNumber);
      payload.append("old_password", values.oldPassword);
      payload.append("new_password", values.newPassword);
      payload.append("company_name", values.company_name);
      payload.append("eni", values.eni);
      if (values.selfiePicked) {
        payload.append("profile_pic", values.selfiePicked);
      }
      if (values.driver_license_picked) {
        payload.append("driver_license", values.driver_license_picked);
      }
      try {
        const response = await updateProfile(payload);
        if (response.status === 200) {
          navigate("/eventer/view-profile");
          dispatch(login(response.data?.data));
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data?.data)
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    setValues({
      ...values,
      firstName: details?.first_name,
      lastName: details?.last_name,
      mobileNumber: details?.mobile_no,
      email: details?.email,
      selfie: details?.profile_pic,
      driver_license: details?.driver_license,
      company_name: details?.company_name,
      eni: details?.eni,
    });
  }, []);
  

  return (
    <>
      <Header />
      <div className="profile_view">
        <Container>
          <Row>
            <Col lg={6} md={6} className="mx-auto">
              <Card className="padding border-0">
                <Card.Body className="p-0">
                  <div className="edit-profile_main">
                    <h2 className="heading_h2">Edit profile details</h2>

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
                              value={values?.firstName}
                            />
                            <p className="text-danger">
                              {touched.firstName && errors.firstName}
                            </p>
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
                              value={values?.lastName}
                            />
                            <p className="text-danger">
                              {touched.lastName && errors.lastName}
                            </p>
                          </Form.Group>
                        </Col>
                        <Col lg={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="Enter Mobile Number"
                              name="mobileNumber"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values?.mobileNumber}
                              onKeyPress={acceptOnlyNum}
                            />
                            <p className="text-danger">
                              {touched.mobileNumber && errors.mobileNumber}
                            </p>
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
                              value={values?.company_name}
                            />
                            <p className="text-danger">
                              {touched.company_name && errors.company_name}
                            </p>
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
                              value={values?.email}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <div className="image_upload">
                            <h4 className="heading-h4 mb-1">Drivers License</h4>
                            <div className="upload-images-box">
                              <div className="label">
                                <img
                                  src={
                                    values?.driver_license_picked
                                      ? URL.createObjectURL(
                                          values?.driver_license_picked
                                        )
                                      : values?.driver_license
                                      ? values?.driver_license
                                      : "/images/file-upload.svg"
                                  }
                                  alt="Img"
                                />
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  setFieldValue(
                                    "driver_license_picked",
                                    e.target.files[0]
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col lg={12}>
                          <div className="image_upload">
                            <h4 className="heading-h4 mb-1">Please upload a recent picture that matches your ID</h4>
                            <div className="upload-images-box">
                              <div className="label">
                                <img
                                  src={
                                    values?.selfiePicked
                                      ? URL.createObjectURL(
                                          values?.selfiePicked
                                        )
                                      : values?.selfie
                                      ? values?.selfie
                                      : "/images/file-upload.svg"
                                  }
                                  alt="Img"
                                />
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  setFieldValue(
                                    "selfiePicked",
                                    e.target.files[0]
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </Col>

                        <Col lg={12}>
                          <div className="change_password">
                            <h6 className="heading_h6">Change password</h6>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="position-relative">
                                  <Form.Label htmlFor="oldpass">
                                    Old Password
                                  </Form.Label>
                                  <Form.Control
                                    type={oldPasswordSeen ? "text" : "password"}
                                    id="oldpass"
                                    placeholder="Old Password"
                                    name="oldPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.oldPassword}
                                  />
                                  <div className="text-danger">
                                    {touched?.oldPassword &&
                                      errors?.oldPassword}
                                  </div>
                                  <span
                                    className="eye-icon"
                                    onClick={() =>
                                      setOldPasswordSeen((prev) => !prev)
                                    }
                                  >
                                    {oldPasswordSeen ? (
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
                                    New Password
                                  </Form.Label>
                                  <Form.Control
                                    type={newPasswordSeen ? "text" : "password"}
                                    id="newpass"
                                    placeholder="New Password"
                                    name="newPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values?.newPassword}
                                  />
                                  <div className="text-danger">
                                    {touched?.newPassword &&
                                      errors?.newPassword}
                                  </div>
                                  <span
                                    className="eye-icon"
                                    onClick={() =>
                                      setNewPasswordSeen((prev) => !prev)
                                    }
                                  >
                                    {newPasswordSeen ? (
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

                    <div className="edit_button d-flex align-items-center">
                      <span
                        className="btn-theme-fill w-100"
                        style={{ cursor: "pointer" }}
                        onClick={handleSubmit}
                      >
                        Save Changes
                      </span>
                      <Link
                        to="/eventer/view-profile"
                        className="btn-theme-outline w-100"
                      >
                        Cancel
                      </Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default EventerEditProfile;
