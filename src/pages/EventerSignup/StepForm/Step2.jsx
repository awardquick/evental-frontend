/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Common/Header";
import { Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import Footer from "../../Common/Footer";
import "./step.css";
import { acceptOnlyNum } from "../../../utils/commonFunction";
import * as yup from "yup";
import { useFormik } from "formik";
import { countryCode } from "../../../utils/CountryCode";

const Step2 = ({
  prevStep,
  progressPercent,
  nextStep,
  steps,
  secondForm,
  setSecondForm,
}) => {
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
    initialValues: secondForm,
    validationSchema: yup.object().shape({
      card_number: yup.string().required().label("Card Number"),
      expiry: yup.string().required().label("Expiry"),
      cvv: yup
        .string()
        .required()
        .label("CVC")
        .min(3, "Minimum 3 digit required"),
      zip: yup.string().required().label("ZIP").trim(),
      country: yup.string().required().label("Country"),
    }),
    onSubmit: async (values) => {
      setSecondForm(values);
      nextStep();
    },
  });

  const handleCardDisplay = () => {
    const rawText = [...values?.card_number.split(" ").join("")]; // Remove old space
    const creditCard = []; // Create card as array
    rawText.forEach((t, i) => {
      if (i % 4 === 0 && i !== 0) creditCard.push(" "); // Add space
      creditCard.push(t);
    });
    return creditCard.join(""); // Transform card array to string
  };

  const handleExpiryDate = (event) => {
    if (event.key == "Backspace") {
      setFieldValue("expiry", event.target.value);
    } else {
      setFieldValue(
        "expiry",
        event.target.value
          .replace(
            /^([1-9]\/|[2-9])$/g,
            "0$1/" // 3 > 03/
          )
          .replace(
            /^(0[1-9]|1[0-2])$/g,
            "$1/" // 11 > 11/
          )
          .replace(
            /^([0-1])([3-9])$/g,
            "0$1/$2" // 13 > 01/3
          )
          .replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
            "$1/$2" // 141 > 01/41
          )
          .replace(
            /^([0]+)\/|[0]+$/g,
            "0" // 0/ > 0 and 00 > 0
          )
          .replace(
            /[^\d\/]|^[\/]*$/g,
            "" // To allow only digits and `/`
          )
          .replace(
            /\/\//g,
            "/" // Prevent entering more than 1 `/`
          )
      );
    }
  };

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
                      {/* <h2>Stripe information</h2> */}

                      <h2> Where do you want us to send your $$</h2>
                      <Form>
                        <Row>
                          <Col lg={12}>
                            <Form.Group className="mb-3 position-relative">
                              <Form.Label>Card Number</Form.Label>
                              <Form.Control
                                className="card-nmbr"
                                type="text"
                                name="card_number"
                                placeholder="xxxx xxxx xxxx xxxx"
                                onChange={handleChange}
                                value={handleCardDisplay()}
                                onBlur={handleBlur}
                                maxLength={19}
                                onKeyDown={acceptOnlyNum}
                              />
                              <div className="card-logo">
                                <img src={"images/visa-logo.png"} alt="Img" />
                                <img src={"images/mastercard.png"} alt="Img" />
                              </div>
                              {touched.card_number && errors.card_number ? (
                                <div className="text-danger">
                                  {errors.card_number}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expiry</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="MM/YY"
                                name="expiry"
                                onChange={handleChange}
                                onKeyUp={handleExpiryDate}
                                value={values?.expiry}
                                onBlur={handleBlur}
                                maxLength={5}
                              />
                              {touched.expiry && errors.expiry ? (
                                <div className="text-danger">
                                  {errors.expiry}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>CVC</Form.Label>
                              <Form.Control
                                type="password"
                                placeholder="CVC"
                                name="cvv"
                                onChange={handleChange}
                                value={values?.cvv}
                                onBlur={handleBlur}
                                maxLength={4}
                                min={3}
                                onKeyDown={acceptOnlyNum}
                              />
                              {touched.cvv && errors.cvv ? (
                                <div className="text-danger">{errors.cvv}</div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Country</Form.Label>
                              <Form.Select
                                aria-label="product-type"
                                name="country"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.country}
                              >
                                <option value="">Select Country</option>
                                {countryCode.map((data) => {
                                  return (
                                    <option value={data?.country}>
                                      {data?.country}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              {touched.country && errors.country ? (
                                <div className="text-danger">
                                  {errors.country}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>ZIP</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Zip Code"
                                name="zip"
                                onChange={handleChange}
                                value={values?.zip}
                                onBlur={handleBlur}
                                onKeyDown={acceptOnlyNum}
                                maxLength={6}
                              />
                              {touched.zip && errors.zip ? (
                                <div className="text-danger">{errors.zip}</div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <p>
                              By providing your card information, you allow
                              Techtolia to change your card for future payemnts
                              in accordance with their terms.
                            </p>
                          </Col>
                        </Row>
                      </Form>
                      <div className="mt-4 d-flex align-items-center gap-3">
                        <Link
                          onClick={() => {
                            prevStep();
                          }}
                          className="btn-theme-outline w-100"
                        >
                          Previous Step
                        </Link>
                        <Link
                          onClick={() => {
                            // nextStep();
                            handleSubmit();
                          }}
                          className="btn-theme-fill w-100"
                        >
                          Next Step
                        </Link>
                      </div>
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

export default Step2;
