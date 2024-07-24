/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React, { useEffect, useState } from "react";
import { Accordion, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImageEditIcon, ImageRemoveIcon } from "../../../SvgIcons/allIcons";
import { categoryList } from "../../../services/eventer-service";
import { acceptOnlyNum } from "../../../utils/commonFunction";

const ProductInformation = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  handleSubmit,
  resetForm,
}) => {
  const [categoryData, setCategoryData] = useState([]);

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
    <Accordion.Item eventKey="0">
      <Accordion.Header>Add product information</Accordion.Header>
      <Accordion.Body>
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
                  <div className="text-danger">{errors.product_type}</div>
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
                  <div className="text-danger">{errors.product_name}</div>
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
                  <div className="text-danger">{errors.discription}</div>
                ) : null}
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>
                  General terms of service which include a limited liability
                  Disclaimer
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
                  <div className="text-danger">{errors.disclaimer}</div>
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
                    onChange={(e) => {
                      if (e.target.value?.charCodeAt(0) == 69) {
                        e.preventDefault();
                      } else {
                        handleChange(e);
                      }
                    }}
                    onBlur={handleBlur}
                    value={values.breakdown_time}
                    onKeyPress={acceptOnlyNum}
                    maxLength={3}
                  />
                  {touched.breakdown_time && errors.breakdown_time ? (
                    <div className="text-danger">{errors.breakdown_time}</div>
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
                  {touched.electricity_needed && errors.electricity_needed ? (
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
                    <div className="text-danger">{errors.wifi_needed}</div>
                  ) : null}
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Printing Included (Only for photo booths)?</Form.Label>
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
                  {touched.printing_included && errors.printing_included ? (
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
                    <div className="text-danger">{errors.setup_time}</div>
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
                    <div className="text-danger">{errors.size}</div>
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
                accept=".png, .jpg, .jpeg"
              />
            </div>
            {touched.product_photo && errors.product_photo ? (
              <div className="text-danger">{errors.product_photo}</div>
            ) : null}
            <p className="img-limit">Force at least 3 photo uploads</p>
            <Row>
              {[...values.product_photo].map((data, index) => {
                return (
                  <Col lg={6} key={index}>
                    <div className="preview-img">
                      <img src={URL.createObjectURL(data)} alt="Img" />
                      <span>
                        <div className="edit-images-box">
                          <div className="label">
                            <ImageEditIcon />
                          </div>
                          <input
                            type="file"
                            name="product_photo"
                            onChange={(e) => {
                              handleEditImage(index, e.target.files[0]);
                            }}
                            accept=".png, .jpg, .jpeg"
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
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default ProductInformation;
