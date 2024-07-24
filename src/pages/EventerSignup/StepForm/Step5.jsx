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
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Common/Footer";
import * as yup from "yup";
import { useFormik } from "formik";
import { eventerSignup } from "../../../services/eventer-service";
import { toastAlert } from "../../../utils/SweetAlert";

const Step5 = ({
  prevStep,
  progressPercent,
  steps,
  fifthForm,
  setFifthForm,
  allValues,
}) => {
  const navigate = useNavigate();
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
    initialValues: fifthForm,
    validationSchema: yup.object().shape({
      upto_20_miles: yup.number().min(1).required().label("Up to 20 miles"),
      after_20_miles: yup.number().min(1).required().label("After 20 miles"),
      pricing_2_hours: yup.string().when("is_pricing_2_hours", {
        is: true,
        then: () => yup.number().min(1).required().label("Price for 2 hours"),
      }),
      pricing_4_hours: yup.string().when("is_pricing_4_hours", {
        is: true,
        then: () => yup.number().min(1).required().label("Price for 4 hours"),
      }),
      pricing_8_hours: yup.string().when("is_pricing_8_hours", {
        is: true,
        then: () => yup.number().min(1).required().label("Price for 8 hours"),
      }),
      pricing_12_hours: yup.string().when("is_pricing_12_hours", {
        is: true,
        then: () => yup.number().min(1).required().label("Price for 12 hours"),
      }),
      pricing_1_day: yup.string().when("is_pricing_1_day", {
        is: true,
        then: () => yup.number().min(1).required().label("Price for 1 day"),
      }),
      additional_fee: yup.string().when("is_additional_fee", {
        is: true,
        then: () => yup.number().min(1).required().label("Additional fee"),
      }),
      terms: yup
        .boolean()
        .oneOf([true], "Accept Terms & Conditions to proceed"),
    }),
    onSubmit: async (values) => {
      setFifthForm(values);
      const formData = new FormData();
      formData.append("first_name", allValues?.firstName);
      formData.append("last_name", allValues?.lastName);
      formData.append("mobile_no", allValues?.phone);
      formData.append("company_name", allValues?.company_name);
      formData.append("driver_license", allValues?.driving_licence);
      formData.append("selfie", allValues?.your_selfie);
      formData.append("email", allValues?.email);
      formData.append("password", allValues?.password);
      formData.append("confirm_password", allValues?.confirm_password);
      formData.append("card_number", allValues?.card_number);
      formData.append("expiry_date", allValues?.expiry);
      formData.append("cvv", allValues?.cvv);
      formData.append("country", allValues?.country);
      formData.append("zip_code", allValues?.zip);
      formData.append("product_type", allValues?.product_type);
      formData.append("name", allValues?.product_name);
      formData.append("description", allValues?.discription);
      formData.append("terms_of_service", allValues?.disclaimer);
      formData.append("breakdown_time", allValues?.breakdown_time);
      formData.append("electricity_needed", allValues?.electricity_needed);
      formData.append("wifi_needed", allValues?.wifi_needed);
      formData.append("printing_included", allValues?.printing_included);
      formData.append("setup_time", allValues?.setup_time);
      formData.append("size", allValues?.size);
      [...allValues?.product_photo].forEach((data) => {
        formData.append("product_images", data);
      });
      formData.append("start_date", allValues?.start_date);
      formData.append("end_date", allValues?.end_date);
      formData.append(
        "advance_notice_in_hours",
        allValues?.advance_notice_time
      );
      formData.append(
        "booking_in_between_time",
        allValues?.time_between_booking
      );
      formData.append("booking_per_day", allValues?.max_per_day_booking);
      formData.append("state", allValues?.state);
      formData.append("city", allValues?.city);
      formData.append("address", allValues?.address);
      formData.append("latitude", allValues?.latitude);
      formData.append("longitude", allValues?.longitude);
      formData.append("delivery_distance", allValues?.miles_you_will_deliver);
      formData.append(
        "is_custom_advance_notice",
        allValues?.is_custom_advance_notice
      );
      formData.append(
        "is_custom_delivery_distance",
        allValues?.is_custom_delivery_distance
      );
      if (values?.is_pricing_2_hours) {
        formData.append("price_for_two_hour", values?.pricing_2_hours);
      }
      if (values?.is_pricing_4_hours) {
        formData.append("price_for_four_hour", values?.pricing_4_hours);
      }

      if (values?.is_pricing_8_hours) {
        formData.append("price_for_eight_hour", values?.pricing_8_hours);
      }
      if (values?.is_pricing_12_hours) {
        formData.append("price_for_twelve_hour", values?.pricing_12_hours);
      }

      if (values?.is_pricing_1_day) {
        formData.append("price_for_one_day", values?.pricing_1_day);
      }

      if (values?.is_additional_fee) {
        formData.append("additional_fees", values?.additional_fee);
      }

      formData.append("fixed_delivery_price", values?.upto_20_miles);
      formData.append("price_per_mile", values?.after_20_miles);

      eventerSignup(formData).then((resp) => {
        if (resp?.status === 200) {
          toastAlert("success", resp?.data?.message);
          navigate("/login");
        }
      });
    },
  });

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
                      <Row>
                        <Col lg={6}>
                          <div className="pricing_left">
                            <Row className="align-items-center mb-3">
                              <Form.Label>Price for 2 hours</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="pricing_2_hours"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pricing_2_hours}
                                    disabled={!values?.is_pricing_2_hours}
                                  />
                                  {touched.pricing_2_hours &&
                                  errors.pricing_2_hours ? (
                                    <div className="text-danger">
                                      {errors.pricing_2_hours}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_pricing_2_hours}
                                    value={!values?.is_pricing_2_hours}
                                    name="is_pricing_2_hours"
                                    onChange={handleChange}
                                    style={{
                                      backgroundColor: "#d1d4d7",
                                      opacity: "1",
                                    }}
                                    disabled
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                              <Form.Label>Price for 4 hours</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="pricing_4_hours"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pricing_4_hours}
                                    disabled={!values?.is_pricing_4_hours}
                                  />
                                  {touched.pricing_4_hours &&
                                  errors.pricing_4_hours ? (
                                    <div className="text-danger">
                                      {errors.pricing_4_hours}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_pricing_4_hours}
                                    value={!values?.is_pricing_4_hours}
                                    onChange={handleChange}
                                    name="is_pricing_4_hours"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                              <Form.Label>Price for 8 hours</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="pricing_8_hours"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pricing_8_hours}
                                    disabled={!values?.is_pricing_8_hours}
                                  />
                                  {touched.pricing_8_hours &&
                                  errors.pricing_8_hours ? (
                                    <div className="text-danger">
                                      {errors.pricing_8_hours}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_pricing_8_hours}
                                    value={!values?.is_pricing_8_hours}
                                    onChange={handleChange}
                                    name="is_pricing_8_hours"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                              <Form.Label>Price for 12 hours</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="pricing_12_hours"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pricing_12_hours}
                                    disabled={!values?.is_pricing_12_hours}
                                  />
                                  {touched.pricing_12_hours &&
                                  errors.pricing_12_hours ? (
                                    <div className="text-danger">
                                      {errors.pricing_12_hours}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_pricing_12_hours}
                                    value={!values?.is_pricing_12_hours}
                                    onChange={handleChange}
                                    name="is_pricing_12_hours"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                              <Form.Label>Price for 1 day</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="pricing_1_day"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.pricing_1_day}
                                    disabled={!values?.is_pricing_1_day}
                                  />
                                  {touched.pricing_1_day &&
                                  errors.pricing_1_day ? (
                                    <div className="text-danger">
                                      {errors.pricing_1_day}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_pricing_1_day}
                                    value={!values?.is_pricing_1_day}
                                    onChange={handleChange}
                                    name="is_pricing_1_day"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="align-items-center mb-3">
                              <Form.Label>Additional Fees</Form.Label>
                              <Col xs={10} lg={8}>
                                <Form.Group className="mb-0">
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="additional_fee"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.additional_fee}
                                    disabled={!values?.is_additional_fee}
                                  />
                                  {touched.additional_fee &&
                                  errors.additional_fee ? (
                                    <div className="text-danger">
                                      {errors.additional_fee}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={2} lg={4}>
                                <div className="custom_check_box">
                                  <input
                                    type="checkbox"
                                    checked={values?.is_additional_fee}
                                    value={!values?.is_additional_fee}
                                    onChange={handleChange}
                                    name="is_additional_fee"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="pricing_right">
                            <Row>
                              <Col xs={12}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Up to 20 miles</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="upto_20_miles"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.upto_20_miles}
                                  />
                                  {touched.upto_20_miles &&
                                  errors.upto_20_miles ? (
                                    <div className="text-danger">
                                      {errors.upto_20_miles}
                                    </div>
                                  ) : null}
                                </Form.Group>
                              </Col>
                              <Col xs={12}>
                                <Form.Group className="mb-3 position-relative">
                                  <Form.Label>After 20 miles</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Price"
                                    name="after_20_miles"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.after_20_miles}
                                  />
                                  {touched.after_20_miles &&
                                  errors.after_20_miles ? (
                                    <div className="text-danger">
                                      {errors.after_20_miles}
                                    </div>
                                  ) : null}

                                  <span className="mile_count">/per mile</span>
                                </Form.Group>
                              </Col>
                            </Row>
                          </div>
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
                        <div className="mt-4 d-flex align-items-center gap-3">
                          <Link
                            onClick={() => {
                              setFifthForm(values);
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
                            Complete
                          </Link>
                        </div>
                      </Row>
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

export default Step5;
