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
import { Card, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { categoryList } from "../../../services/eventer-service";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import { ImageEditIcon, ImageRemoveIcon } from "../../../SvgIcons/allIcons";
import { acceptOnlyNum } from "../../../utils/commonFunction";

const Step3 = ({
  prevStep,
  nextStep,
  progressPercent,
  steps,
  setThirdForm,
  thirdForm,
}) => {
  const [categoryData, setCategoryData] = useState([]);
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
    initialValues: thirdForm,
    validationSchema: yup.object().shape({
      product_type: yup.string().required().label("Product Type").trim(),
      product_name: yup
        .string()
        .max(50, "Must be 50 characters or less")
        .required()
        .label("Product Name")
        .trim(),
      discription: yup.string().required().label("Description"),
      disclaimer: yup.string().required().label("Disclaimer").trim(),
      breakdown_time: yup
        .number()
        .required()
        .label("Breakdown Time")
        .typeError("Invalid number")
        .min(1),
      electricity_needed: yup.string().required().label("Electricity Needed"),
      wifi_needed: yup.string().required().label("Wifi Needed"),
      printing_included: yup.string().required().label("Printing Included"),
      setup_time: yup
        .number()
        .required()
        .label("Setup Time")
        .typeError("Invalid number")
        .min(1),
      size: yup
        .number()
        .required()
        .label("Size")
        .typeError("Invalid number")
        .min(1),
      product_photo: yup
        .mixed()
        .test("required", "Minimum 3 images required", (value) => {
          if (value.length >= 3) {
            return true;
          } else {
            return false;
          }
        })
        .test("type", "Please select jpg, png, jpeg format", (value) => {
          if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (
                value[i].type != "image/jpg" &&
                value[i].type != "image/png" &&
                value[i].type != "image/jpeg"
              ) {
                return false;
              } else {
                continue;
              }
            }
            return true;
          }
        }),
    }),
    onSubmit: async (values) => {
      setThirdForm(values);
      nextStep();
    },
  });

  useEffect(() => {
    getAllCategoryData();
  }, []);

  /**
   * Get All category
   */
  const getAllCategoryData = () => {
    categoryList()
      .then((resp) => {
        if (resp?.data?.status === 200) {
          setCategoryData(resp?.data?.data ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Remove Image
   * @param {Number} index
   */
  const handleDeleteImage = (index) => {
    let tempArr = [...values.product_photo];

    if (index > -1) {
      // only splice array when item is found
      tempArr.splice(index, 1);
    }
    setFieldValue("product_photo", tempArr);
  };
  /**
   * Edit selected image
   * @param {Number} index
   */
  const handleEditImage = (index, file) => {
    let tempArr = [...values.product_photo];

    if (index > -1) {
      // only splice array when item is found
      tempArr.splice(index, 1, file);
    }
    setFieldValue("product_photo", tempArr);
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
                      <h2>Tell us about your product</h2>
                      <Form>
                        <Row>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Product Type</Form.Label>
                              <Form.Select
                                aria-label="product-type"
                                name="product_type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.product_type}
                              >
                                <option value="">Select Product Type</option>
                                {categoryData.map((data) => {
                                  return (
                                    <option key={data?.id} value={data?.id}>
                                      {data?.title}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              {touched.product_type && errors.product_type ? (
                                <div className="text-danger">
                                  {errors.product_type}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Product Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Product Name"
                                name="product_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.product_name}
                              />
                              {touched.product_name && errors.product_name ? (
                                <div className="text-danger">
                                  {errors.product_name}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Description</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter Description"
                                name="discription"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.discription}
                              />
                              {touched.discription && errors.discription ? (
                                <div className="text-danger">
                                  {errors.discription}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                General terms of service which include a limited
                                liability Disclaimer
                              </Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter Disclaimer"
                                name="disclaimer"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.disclaimer}
                              />
                              {touched.disclaimer && errors.disclaimer ? (
                                <div className="text-danger">
                                  {errors.disclaimer}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className="my-3">
                          <div className="title-sec mb-4">
                            <h4>Details</h4>
                          </div>
                          <Row>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Breakdown Time(Hourly)</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Breakdown Time"
                                  name="breakdown_time"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.breakdown_time}
                                  onKeyPress={acceptOnlyNum}
                                  maxLength={3}
                                />
                                {touched.breakdown_time &&
                                errors.breakdown_time ? (
                                  <div className="text-danger">
                                    {errors.breakdown_time}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Electricity Needed?</Form.Label>
                                <Form.Select
                                  aria-label="product-type"
                                  name="electricity_needed"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.electricity_needed}
                                >
                                  <option value="">Select Options</option>
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </Form.Select>
                                {touched.electricity_needed &&
                                errors.electricity_needed ? (
                                  <div className="text-danger">
                                    {errors.electricity_needed}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Wifi Needed?</Form.Label>
                                <Form.Select
                                  aria-label="product-type"
                                  name="wifi_needed"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.wifi_needed}
                                >
                                  <option value="">Select Options</option>
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </Form.Select>
                                {touched.wifi_needed && errors.wifi_needed ? (
                                  <div className="text-danger">
                                    {errors.wifi_needed}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>
                                  Printing Included (only for photo booths)?
                                </Form.Label>
                                <Form.Select
                                  aria-label="product-type"
                                  name="printing_included"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.printing_included}
                                >
                                  <option value="">Select Options</option>
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </Form.Select>
                                {touched.printing_included &&
                                errors.printing_included ? (
                                  <div className="text-danger">
                                    {errors.printing_included}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Setup Time(Hourly)</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Setup Time"
                                  name="setup_time"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.setup_time}
                                  onKeyPress={acceptOnlyNum}
                                  maxLength={3}
                                />
                                {touched.setup_time && errors.setup_time ? (
                                  <div className="text-danger">
                                    {errors.setup_time}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                            <Col lg={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Size</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Size"
                                  name="size"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.size}
                                  onKeyPress={acceptOnlyNum}
                                  maxLength={3}
                                />
                                {touched.size && errors.size ? (
                                  <div className="text-danger">
                                    {errors.size}
                                  </div>
                                ) : null}
                              </Form.Group>
                            </Col>
                          </Row>
                        </div>
                      </Form>
                      <Form>
                        <div
                          className="title-sec mb-4 d-flex align-items-center
                        justify-content-between flex-wrap"
                        >
                          <h4>Product Photos</h4>
                          <p>You can replace or delete uploaded photos</p>
                        </div>
                        <Col lg={12}>
                          <div className="upload-images-box">
                            <div className="label">
                              <img src={"/images/file-upload.svg"} alt="Img" />
                              <div>
                                <h6>Browse image</h6>
                                <p>JPG PNG files, 5 MB Maximum</p>
                              </div>
                            </div>
                            <input
                              type="file"
                              name="product_photo"
                              multiple
                              onChange={(e) => {
                                setFieldValue("product_photo", e.target.files);
                              }}
                            />
                          </div>
                          {touched.product_photo && errors.product_photo ? (
                            <div className="text-danger">
                              {errors.product_photo}
                            </div>
                          ) : null}
                          {/* <p className="img-limit">
                            Force at least 3 photo uploads
                          </p> */}
                          <Row>
                            {[...values.product_photo].map((data, index) => {
                              return (
                                <Col lg={6}>
                                  <div className="preview-img">
                                    <img
                                      src={URL.createObjectURL(data)}
                                      alt="Img"
                                    />
                                    <span>
                                      <div className="edit-images-box">
                                        <div className="label">
                                          <ImageEditIcon />
                                        </div>
                                        <input
                                          type="file"
                                          name="product_photo"
                                          onChange={(e) => {
                                            handleEditImage(
                                              index,
                                              e.target.files[0]
                                            );
                                          }}
                                        />
                                      </div>
                                      <Link
                                        to=""
                                        className="del-btn"
                                        onClick={() => handleDeleteImage(index)}
                                      >
                                        <ImageRemoveIcon />
                                      </Link>
                                    </span>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                        </Col>
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

export default Step3;
