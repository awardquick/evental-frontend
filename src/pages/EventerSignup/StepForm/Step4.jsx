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
import Header from "../../Common/Header";
import { Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../Common/Footer";
import * as yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { acceptOnlyNum } from "../../../utils/commonFunction";
import Autocomplete from "react-google-autocomplete";

const Step4 = ({
  prevStep,
  nextStep,
  progressPercent,
  steps,
  forthForm,
  setForthForm,
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
    initialValues: forthForm,
    validationSchema: yup.object().shape({
      start_date: yup.string().required().label("Start date").trim(),
      end_date: yup.string().required().label("End date").trim(),
      state: yup.string().required().label("State"),
      city: yup.string().required().label("City"),
      address: yup.string().required().label("Address"),
      advance_notice_time: yup.string().when("is_custom_advance_notice", {
        is: true,
        then: () => yup.number().min(1).required().label("Advance notice time"),
      }),
      miles_you_will_deliver: yup.string().when("is_custom_delivery_distance", {
        is: true,
        then: () =>
          yup
            .number()
            .min(1)
            .required()
            .label("How many miles you will deliver"),
      }),
    }),
    onSubmit: async (values) => {
      setForthForm(values);
      nextStep();
    },
  });

  const handlePlaces = (place) => {
    place?.address_components?.map((item) => {
      if (item?.types?.includes("administrative_area_level_1")) {
        setFieldValue("state", item?.long_name);
      }
      if (item?.types?.includes("administrative_area_level_3")) {
        setFieldValue("city", item?.long_name);
      }
    });
    setFieldValue("address", place?.formatted_address);
    setFieldValue("latitude", place?.geometry?.location?.lat());
    setFieldValue("longitude", place?.geometry?.location?.lng());
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
                      <h2>Availability</h2>
                      <Form>
                        <Row>
                          <Col lg={12} className="mb-3">
                            <Form.Label>
                              When is your product available?
                            </Form.Label>
                            <Row>
                              <Col lg={6}>
                                <Form.Group className="mb-3">
                                  <Form.Control
                                    type="date"
                                    name="start_date"
                                    placeholder="07.01.23"
                                    onKeyDown={(e) => {
                                      e.preventDefault();
                                    }}
                                    value={values.start_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min={moment(
                                      new Date().getTime() + 1
                                    ).format("YYYY-MM-DD")}
                                  />
                                  {touched.start_date && errors.start_date ? (
                                    <div className="text-danger">
                                      {errors.start_date}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col lg={6}>
                                <Form.Group className="mb-3">
                                  <Form.Control
                                    type="date"
                                    placeholder="07.02.23"
                                    onKeyDown={(e) => {
                                      e.preventDefault();
                                    }}
                                    name="end_date"
                                    value={values.end_date}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    min={moment(
                                      new Date(values.start_date)
                                    ).format("YYYY-MM-DD")}
                                  />
                                  {touched.end_date && errors.end_date ? (
                                    <div className="text-danger">
                                      {errors.end_date}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={12} className="mb-3">
                            <Form.Label>
                              What is the minimum advanced notice you require
                              for booking with this product?
                            </Form.Label>
                            <Row>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.advance_notice_time == 24
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="one"
                                    name="advance_notice_time"
                                    value={24}
                                    checked={values?.advance_notice_time == 24}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_advance_notice",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="one">24 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.advance_notice_time == 48
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="two"
                                    name="advance_notice_time"
                                    value={48}
                                    checked={values?.advance_notice_time == 48}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_advance_notice",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="two">48 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.advance_notice_time == 72
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="three"
                                    name="advance_notice_time"
                                    value={72}
                                    checked={values?.advance_notice_time == 72}
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_advance_notice",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="three">72 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.is_custom_advance_notice
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="is_custom_advance_notice"
                                    name="advance_notice_time"
                                    value={values?.is_custom_advance_notice}
                                    checked={values?.is_custom_advance_notice}
                                    onChange={(e) => {
                                      setFieldValue(
                                        "is_custom_advance_notice",
                                        e.target.checked
                                      );
                                      setFieldValue("advance_notice_time", "");
                                    }}
                                  />
                                  <label htmlFor="is_custom_advance_notice">
                                    Custom
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          {values?.is_custom_advance_notice && (
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>
                                  Custom advance notice time
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter advance notice time"
                                  name="advance_notice_time"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.advance_notice_time}
                                  onKeyPress={acceptOnlyNum}
                                  maxLength={3}
                                />
                                {touched.advance_notice_time &&
                                errors.advance_notice_time ? (
                                  <div className="text-danger">
                                    {errors.advance_notice_time}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                          )}
                          <Col lg={12}>
                            <Form.Label>
                              How much time do you need in between bookings
                            </Form.Label>
                            <Row>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.time_between_booking == 3
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="four"
                                    name="time_between_booking"
                                    value={3}
                                    checked={values?.time_between_booking == 3}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="four">3 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.time_between_booking == 6
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="five"
                                    name="time_between_booking"
                                    value={6}
                                    checked={values?.time_between_booking == 6}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="five">6 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.time_between_booking == 12
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="six"
                                    name="time_between_booking"
                                    value={12}
                                    checked={values?.time_between_booking == 12}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="six">12 hours</label>
                                </div>
                              </Col>
                              <Col lg={3}>
                                <div
                                  className={
                                    values?.time_between_booking == 24
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="seven"
                                    name="time_between_booking"
                                    value={24}
                                    checked={values?.time_between_booking == 24}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="seven">24 hours</label>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={12} className="mb-3">
                            <Form.Label>
                              Max number of booking per day
                            </Form.Label>
                            <Row>
                              <Col lg={4}>
                                <div
                                  className={
                                    values?.max_per_day_booking == 1
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="max_per_day_booking_one"
                                    name="max_per_day_booking"
                                    value={1}
                                    checked={values?.max_per_day_booking == 1}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="max_per_day_booking_one">
                                    1 time
                                  </label>
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div
                                  className={
                                    values?.max_per_day_booking == 2
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="max_per_day_booking_two"
                                    name="max_per_day_booking"
                                    value={2}
                                    checked={values?.max_per_day_booking == 2}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="max_per_day_booking_two">
                                    2 times
                                  </label>
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div
                                  className={
                                    values?.max_per_day_booking == 3
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="max_per_day_booking_three"
                                    name="max_per_day_booking"
                                    value={3}
                                    checked={values?.max_per_day_booking == 3}
                                    onChange={handleChange}
                                  />
                                  <label htmlFor="max_per_day_booking_three">
                                    3 times
                                  </label>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <div className="title-sec my-4 ">
                            <h4>Location & Delivery</h4>
                          </div>
                          <Col lg={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Autocomplete
                                apiKey={import.meta.env.VITE_MAP_KEY}
                                placeholder="Address"
                                className="form-control"
                                name="address"
                                value={values?.address}
                                options={{
                                  types: [],
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onPlaceSelected={(place) => {
                                  handlePlaces(place);
                                }}
                              />
                              {touched.address && errors.address ? (
                                <div className="text-danger">
                                  {errors.address}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter State"
                                name="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.state}
                              />
                              {touched.state && errors.state ? (
                                <div className="text-danger">
                                  {errors.state}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter City"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.city}
                              />
                              {touched.city && errors.city ? (
                                <div className="text-danger">{errors.city}</div>
                              ) : null}
                            </Form.Group>
                          </Col>

                          <Col lg={12}>
                            <Form.Label>
                              How many miles you will deliver
                            </Form.Label>
                            <Row>
                              <Col lg={2}>
                                <div
                                  className={
                                    values?.miles_you_will_deliver == 2
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="feature1"
                                    name="miles_you_will_deliver"
                                    value={2}
                                    checked={
                                      values?.miles_you_will_deliver == 2
                                    }
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_delivery_distance",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="feature1">2 miles</label>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div
                                  className={
                                    values?.miles_you_will_deliver == 5
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="feature2"
                                    name="miles_you_will_deliver"
                                    value={5}
                                    checked={
                                      values?.miles_you_will_deliver == 5
                                    }
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_delivery_distance",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="feature2">5 miles</label>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div
                                  className={
                                    values?.miles_you_will_deliver == 10
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="feature3"
                                    name="miles_you_will_deliver"
                                    value={10}
                                    checked={
                                      values?.miles_you_will_deliver == 10
                                    }
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_delivery_distance",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="feature3">10 miles</label>
                                </div>
                              </Col>
                              <Col lg={2}>
                                <div
                                  className={
                                    values?.miles_you_will_deliver == 20
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="feature4"
                                    name="miles_you_will_deliver"
                                    value={20}
                                    checked={
                                      values?.miles_you_will_deliver == 20
                                    }
                                    onChange={(e) => {
                                      handleChange(e);
                                      setFieldValue(
                                        "is_custom_delivery_distance",
                                        false
                                      );
                                    }}
                                  />
                                  <label htmlFor="feature4">20 miles</label>
                                </div>
                              </Col>
                              <Col lg={4}>
                                <div
                                  className={
                                    values?.is_custom_delivery_distance
                                      ? "custom_radio active"
                                      : "custom_radio"
                                  }
                                >
                                  <input
                                    type="radio"
                                    id="is_custom_delivery_distance"
                                    name="miles_you_will_deliver"
                                    value={values?.is_custom_delivery_distance}
                                    checked={
                                      values?.is_custom_delivery_distance
                                    }
                                    onChange={(e) => {
                                      setFieldValue(
                                        "is_custom_delivery_distance",
                                        e.target.checked
                                      );
                                      setFieldValue(
                                        "miles_you_will_deliver",
                                        ""
                                      );
                                    }}
                                  />
                                  <label htmlFor="is_custom_delivery_distance">
                                    Custom
                                  </label>
                                </div>
                              </Col>
                              {values?.is_custom_delivery_distance && (
                                <Col lg={6}>
                                  <Form.Group className=" mt-3">
                                    <Form.Label>
                                      Custom how many miles you will deliver
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter how many miles you will deliver"
                                      name="miles_you_will_deliver"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.miles_you_will_deliver}
                                      onKeyPress={acceptOnlyNum}
                                      maxLength={3}
                                    />
                                    {touched.miles_you_will_deliver &&
                                    errors.miles_you_will_deliver ? (
                                      <div className="text-danger">
                                        {errors.miles_you_will_deliver}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                              )}
                            </Row>
                          </Col>
                        </Row>
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
                              handleSubmit();
                            }}
                            className="btn-theme-fill w-100"
                          >
                            Next Step
                          </Link>
                        </div>
                      </Form>
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

export default Step4;
