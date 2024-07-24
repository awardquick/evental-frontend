import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/eventee-service";
import { acceptOnlyNum } from "../../utils/commonFunction";

const Register = () => {
  const navigate = useNavigate();
  const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      photoID: "",
      terms: false,
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required().label("First name").trim(),
      lastName: yup.string().required().label("Last Name").trim(),
      mobileNumber: yup
        .string()
        .min(5, "Mobile number must be between 5–15 digits")
        .max(15, "Mobile number must be between 5–15 digits")
        .required()
        .trim()
        .label("Mobile Number"),
      email: yup.string().email().required().label("Email").trim(),
      photoID: yup
        .mixed()
        .test("type", "Please select jpg, png, jpeg format", function (value) {
          return (
            value &&
            (value.type === "image/jpg" ||
              value.type === "image/png" ||
              value.type === "image/jpeg")
          );
        }),
      terms: yup
        .boolean()
        .oneOf([true], "Accept Terms & Conditions to proceed"),
    }),
    onSubmit: async (values) => {
      const payload = new FormData();
      payload.append("first_name", values.firstName);
      payload.append("last_name", values.lastName);
      payload.append("email", values.email);
      payload.append("mobile_no", values.mobileNumber);
      payload.append("profile_pic", values.photoID);
      try {
        const response = await register(payload);
        if (response.status === 200) {
          navigate("/email-confirmation");
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
            <div className="register_main">
              <div className="register_heading">
                <h2 className="heading_h2">Create Account</h2>
              </div>
              <div className="register_form">
                <Form>
                  <Row>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          className="text-capitalize"
                          placeholder="First Name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          placeholder="Last Name"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
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
                          placeholder="Mobile Number"
                          name="mobileNumber"
                          value={values.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onKeyPress={acceptOnlyNum}
                        />
                        <p className="text-danger">
                          {touched.mobileNumber && errors.mobileNumber}
                        </p>
                      </Form.Group>
                    </Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <p className="text-danger">
                          {touched.email && errors.email}
                        </p>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col lg={12}>
                    <Form.Label>Photo ID</Form.Label>
                    <div className="upload-images-box">
                      <div className="label d-block text-center">
                        <img
                          className={values?.photoID && "uploaded-img"}
                          src={
                            values?.photoID
                              ? URL.createObjectURL(values?.photoID)
                              : "/images/file-upload.svg"
                          }
                          alt="Img"
                        />
                        <div>
                          <h6>Browse Image</h6>
                          <p>JPG and PNG files, 5 MB Maximum</p>
                        </div>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("photoID", e.target.files[0])
                        }
                      />
                    </div>
                    <p className="text-danger">
                      {touched.photoID && errors.photoID}
                    </p>
                  </Col>
                  <div className="d-flex gap-2">
                    <Form.Check
                      type="Checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.terms}
                      name="terms"
                      id="terms"
                      label={
                        <>
                          I agree to the{" "}
                          <Link
                            target="_blank"
                            className="text-red"
                            to="/term-condition"
                          >
                            Terms & Conditions
                          </Link>
                        </>
                      }
                    />
                  </div>
                  {touched.terms && errors.terms ? (
                    <div className="text-danger">{errors.terms}</div>
                  ) : null}
                </Form>
                <div className="register">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="d-inline-block text-center w-100 button"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Register;
