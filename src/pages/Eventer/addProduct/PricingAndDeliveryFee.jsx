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
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { acceptOnlyNum } from "../../../utils/commonFunction";

const PricingAndDeliveryFee = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  handleSubmit,
  resetForm,
}) => {
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
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default PricingAndDeliveryFee;
