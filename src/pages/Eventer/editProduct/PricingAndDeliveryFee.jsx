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
import React, { useEffect } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import * as yup from "yup";
import { updateMyProductDetails } from "../../../services/eventer-service";
import { toastAlert } from "../../../utils/SweetAlert";
import { acceptOnlyNum } from "../../../utils/commonFunction";

const PricingAndDeliveryFee = ({ productDetail }) => {
  const { id } = useParams();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: {
      is_pricing_2_hours: true,
      pricing_2_hours: "",
      is_pricing_4_hours: false,
      pricing_4_hours: "",
      is_pricing_8_hours: false,
      pricing_8_hours: "",
      is_pricing_12_hours: false,
      pricing_12_hours: "",
      is_pricing_1_day: false,
      pricing_1_day: "",
      is_additional_fee: false,
      additional_fee: "",
      upto_20_miles: "",
      after_20_miles: "",
    },
    validationSchema: yup.object().shape({
      upto_20_miles: yup
        .number()
        .min(1)
        .required()
        .label("Up to 20 miles")
        ,
      after_20_miles: yup
        .number()
        .min(1)
        .required()
        .label("After 20 miles")
        ,
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
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("product_id", id);

      if (values?.is_pricing_2_hours) {
        formData.append("price_for_two_hour", values?.pricing_2_hours);
      } else {
        formData.append("price_for_two_hour", "");
      }
      if (values?.is_pricing_4_hours) {
        formData.append("price_for_four_hour", values?.pricing_4_hours);
      } else {
        formData.append("price_for_four_hour", "");
      }

      if (values?.is_pricing_8_hours) {
        formData.append("price_for_eight_hour", values?.pricing_8_hours);
      } else {
        formData.append("price_for_eight_hour", "");
      }
      if (values?.is_pricing_12_hours) {
        formData.append("price_for_twelve_hour", values?.pricing_12_hours);
      } else {
        formData.append("price_for_twelve_hour", "");
      }

      if (values?.is_pricing_1_day) {
        formData.append("price_for_one_day", values?.pricing_1_day);
      } else {
        formData.append("price_for_one_day", "");
      }

      if (values?.is_additional_fee) {
        formData.append("additional_fees", values?.additional_fee);
      } else {
        formData.append("additional_fees", "");
      }
      formData.append("fixed_delivery_price", values?.upto_20_miles);
      formData.append("price_per_mile", values?.after_20_miles);
      updateMyProductDetails(formData)
        .then((resp) => {
          if (resp?.status === 200) {
            toastAlert("success", resp?.data?.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });
  useEffect(() => {
    setValues({
      ...values,
      is_pricing_2_hours: productDetail?.price_for_two_hour ? true : false,
      pricing_2_hours: productDetail?.price_for_two_hour ?? "",
      is_pricing_4_hours: productDetail?.price_for_four_hour ? true : false,
      pricing_4_hours: productDetail?.price_for_four_hour ?? "",
      is_pricing_8_hours: productDetail?.price_for_eight_hour ? true : false,
      pricing_8_hours: productDetail?.price_for_eight_hour ?? "",
      is_pricing_12_hours: productDetail?.price_for_twelve_hour ? true : false,
      pricing_12_hours: productDetail?.price_for_twelve_hour ?? "",
      is_pricing_1_day: productDetail?.price_for_one_day ? true : false,
      pricing_1_day: productDetail?.price_for_one_day ?? "",
      is_additional_fee: productDetail?.additional_fees ? true : false,
      additional_fee: productDetail?.additional_fees ?? "",
      upto_20_miles: productDetail?.fixed_delivery_price ?? "",
      after_20_miles: productDetail?.price_per_mile ?? "",
    });
  }, []);

  return (
    <Accordion.Item eventKey="2">
      <Accordion.Header>
        Pricing
        <span className="heading_two ms-auto">Delivery Fee</span>
      </Accordion.Header>
      <Accordion.Body>
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.pricing_2_hours && errors.pricing_2_hours ? (
                      <div className="text-danger">
                        {errors.pricing_2_hours}
                      </div>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs={2} lg={4}>
                  <div className="custom_check_box">
                    <input
                      style={{
                        backgroundColor: "#d1d4d7",
                        opacity: "1",
                      }}
                      type="checkbox"
                      checked={values?.is_pricing_2_hours}
                      value={!values?.is_pricing_2_hours}
                      name="is_pricing_2_hours"
                      onChange={handleChange}
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.pricing_4_hours && errors.pricing_4_hours ? (
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.pricing_8_hours && errors.pricing_8_hours ? (
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.pricing_12_hours && errors.pricing_12_hours ? (
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.pricing_1_day && errors.pricing_1_day ? (
                      <div className="text-danger">{errors.pricing_1_day}</div>
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.additional_fee && errors.additional_fee ? (
                      <div className="text-danger">{errors.additional_fee}</div>
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.upto_20_miles && errors.upto_20_miles ? (
                      <div className="text-danger">{errors.upto_20_miles}</div>
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
                      onKeyPress={acceptOnlyNum}
                      maxLength={5}
                    />
                    {touched.after_20_miles && errors.after_20_miles ? (
                      <div className="text-danger">{errors.after_20_miles}</div>
                    ) : null}

                    <span className="mile_count">/per mile</span>
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="mt-4 d-flex align-items-center gap-3">
          <span className="btn-theme-fill w-100" onClick={handleSubmit}>
            Save Changes
          </span>
          <Link className="btn-theme-outline w-100">Cancel</Link>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PricingAndDeliveryFee;
