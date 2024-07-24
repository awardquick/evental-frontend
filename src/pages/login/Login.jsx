import { useFormik } from "formik";
import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { EyeIcon, EyeSlashIcon } from "../../SvgIcons/allIcons";
import { login } from "../../redux/features/authSlice";
import { userLogin } from "../../services/eventee-service";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location?.state;
  const navigate = useNavigate();
  const [passwordSeen, setPasswordSeen] = useState(false);
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object().shape({
        email: yup.string().email().required().label("Email").trim(),
        password: yup.string().required().label("Password").trim(),
      }),
      onSubmit: async (values) => {
        const payload = new FormData();
        payload.append("email", values.email);
        payload.append("password", values.password);
        try {
          const response = await userLogin(payload);
          if (response?.status === 200) {
            localStorage.setItem(
              "userDetails",
              JSON.stringify(response.data?.data)
            );
            dispatch(login(response.data?.data));

            if (pathName) {
              window.location.href = `/eventee${pathName}`;
            } else if (response?.data?.data?.role_id == constant.EVENTEE) {
              navigate(`/eventee`);
            } else if (response?.data?.data?.role_id == constant.EVENTER) {
              navigate(`/eventer`);
            }
          }
        } catch (error) {
          console.error(error);
        }
      },
    });

  return (
    <>
      <Header />
      <div className="py-5">
        <Container>
          <section className="d-flex align-items-center">
            <div className="login_main">
              <Row className="align-items-center">
                <Col lg={6} md={12}>
                  <div className="img_bg">
                    <img
                      className="banner-img d-none d-lg-block"
                      src={"/images/login_img.png"}
                    />
                    <img
                      className="banner-img d-block d-lg-none mx-auto pt-3"
                      src={"/images/login-mobile.png"}
                    />
                  </div>
                </Col>

                <Col lg={6} md={12}>
                  <div className="login_text">
                    <div className="login_heading">
                      <h2 className="heading_h2">Login</h2>
                      <h3 className="heading_h3">Welcome to Evental</h3>
                    </div>

                    <div className="login_form">
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Email address</Form.Label>
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
                        <Form.Group className="mb-3 position-relative">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type={passwordSeen ? "text" : "password"}
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyDown={() => {
                              if (event.keyCode === 13) {
                                handleSubmit();
                              }
                            }}
                          />
                          <p className="text-danger">
                            {touched.password && errors.password}
                          </p>
                          <span
                            className="eye-icon"
                            onClick={() => setPasswordSeen((prev) => !prev)}
                          >
                            {passwordSeen ? <EyeIcon /> : <EyeSlashIcon />}
                          </span>
                        </Form.Group>

                        <div className="d-flex align-items-center justify-content-between flex-wrap mt-3">
                          <div className="forget_link">
                            <Link
                              to="/forgot-password"
                              className="text-decoration-none"
                            >
                              <h4 className="heading-h4 mb-0">
                                Forgotten Password?
                              </h4>
                            </Link>
                          </div>
                        </div>

                        <div className="login_btn">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            className="d-inline-block text-center w-100 button"
                          >
                            Login
                          </button>
                        </div>

                        <div className="d-flex align-items-center gap-3">
                          <div className="no_register">
                            <h4 className="heading-h4 mb-0">
                              Not registered yet?
                            </h4>
                          </div>
                          <div className="sign_up">
                            <Link to="/register-as" className="sign_up_btn">
                              Sign Up
                            </Link>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Login;
