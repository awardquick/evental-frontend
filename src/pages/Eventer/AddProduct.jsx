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
import React from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../../Css/_button.css";
import { addProduct } from "../../services/eventer-service";
import { toastAlert } from "../../utils/SweetAlert";
import Footer from "../Common/Footer";
import AuthHeader from "./AuthHeader";
import Availability from "./addProduct/Availability";
import PricingAndDeliveryFee from "./addProduct/PricingAndDeliveryFee";
import ProductInformation from "./addProduct/ProductInformation";
import "./eventer.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const addProductDetails = {
    product_type: "",
    product_name: "",
    discription: "",
    disclaimer: "",
    breakdown_time: "",
    electricity_needed: "",
    wifi_needed: "",
    printing_included: "",
    setup_time: "",
    size: "",
    product_photo: [],
    start_date: "",
    end_date: "",
    advance_notice_time: 24,
    is_custom_advance_notice: false,
    time_between_booking: 3,
    max_per_day_booking: 1,
    state: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    miles_you_will_deliver: 2,
    is_custom_delivery_distance: false,
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
  };

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
    initialValues: addProductDetails,
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
      start_date: yup.string().required().label("Start date").trim(),
      end_date: yup.string().required().label("End date").trim(),
      state: yup.string().required().label("State"),
      city: yup.string().required().label("City"),
      address: yup.string().required().label("Address"),
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
      const formData = new FormData();

      formData.append("product_type", values?.product_type);
      formData.append("name", values?.product_name);
      formData.append("description", values?.discription);
      formData.append("terms_of_service", values?.disclaimer);
      formData.append("breakdown_time", values?.breakdown_time);
      formData.append("electricity_needed", values?.electricity_needed);
      formData.append("wifi_needed", values?.wifi_needed);
      formData.append("printing_included", values?.printing_included);
      formData.append("setup_time", values?.setup_time);
      formData.append("size", values?.size);
      [...values?.product_photo].forEach((data) => {
        formData.append("product_images", data);
      });
      formData.append("start_date", values?.start_date);
      formData.append("end_date", values?.end_date);
      formData.append("advance_notice_in_hours", values?.advance_notice_time);
      formData.append("booking_in_between_time", values?.time_between_booking);
      formData.append("booking_per_day", values?.max_per_day_booking);
      formData.append("state", values?.state);
      formData.append("city", values?.city);
      formData.append("address", values?.address);
      formData.append("latitude", values?.latitude);
      formData.append("longitude", values?.longitude);
      formData.append("delivery_distance", values?.miles_you_will_deliver);
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
      formData.append(
        "is_custom_advance_notice",
        values?.is_custom_advance_notice
      );
      formData.append(
        "is_custom_delivery_distance",
        values?.is_custom_delivery_distance
      );

      formData.append("fixed_delivery_price", values?.upto_20_miles);
      formData.append("price_per_mile", values?.after_20_miles);
      formData.append(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      
      addProduct(formData).then((resp) => {
        if (resp?.status === 200) {
          toastAlert("success", resp?.data?.message);
          navigate("/eventer/my-product");
        }
      });
    },
  });

  return (
    <>
      <AuthHeader />
      <div className="ptb30">
        <Container>
          <Row>
            <Col lg={7} className="mx-auto">
              <div className="edit-product-form">
                <Accordion defaultActiveKey="0">
                  {/******************* Product Information*******************************/}
                  <ProductInformation
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                  />
                  {/******************* Availability*******************************/}
                  <Availability
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                  />
                  {/******************* Pricing And Delivery Fee *******************************/}
                  <PricingAndDeliveryFee
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    handleSubmit={handleSubmit}
                    resetForm={resetForm}
                  />
                </Accordion>
                <div className="mt-4 d-flex align-items-center gap-3">
                  <span
                    className="btn-theme-fill w-100"
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                  >
                    Save Changes
                  </span>
                  <Link
                    to="/eventer/my-product"
                    className="btn-theme-outline w-100"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddProduct;
