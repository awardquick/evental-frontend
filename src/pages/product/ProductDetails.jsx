/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React, { useEffect, useRef, useState } from "react";
import { Card, CardBody, Col, Container, Form, Row } from "react-bootstrap";
import {
  AddIcon,
  BreakdownBlueIcon,
  DollarIcon,
  DownArrowIcon,
  ElectricityBlueIcon,
  LocationIcon,
  PrinterBlueIcon,
  SettingBlueIcon,
  SizeBlueIcon,
  UPArrowIcon,
  WifiBlueIcon,
} from "../../SvgIcons/allIcons";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import "./product.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../Css/_button.css";

import useDetail from "../../hooks/useDetail";
import useToken from "../../hooks/useToken";
import {
  allProductsList,
  bookingAvailability,
  bookingPrice,
  createBooking,
  getSingleProductDetails,
  sendMessage,
  userCardList,
} from "../../services/eventee-service";
import AuthHeader from "../Eventer/AuthHeader";

import { useFormik } from "formik";
import moment from "moment";
import Autocomplete from "react-google-autocomplete";
import Swal from "sweetalert2";
import * as Yup from "yup";
import useRole from "../../hooks/useRole";
import { toastAlert } from "../../utils/SweetAlert";
import { filterPassedTime } from "../../utils/commonFunction";
import { constant } from "../../utils/constant";
import Loader from "../../utils/loader/Loader";
import StartCalendar from "../home/StartCalendar";

const ProductDetails = () => {
  const role = useRole();
  const startDateRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useToken();
  const [allreadyBookedDates, setAllReadyBookedDates] = useState([]);
  const [productStartDate, setProductStartDate] = useState();
  let availabilityDate = moment(productStartDate).format("LLL");
  const [productEndDate, setProductEndDate] = useState();
  let availabilityEndDate = moment(productEndDate).format("LLL");
  const loggedUserDetails = useDetail();
  const [isOpened, setIsOpened] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0))
  );
  const [endDate, setEndDate] = useState();
  const [errorState, setErrorState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // SELECTED DAYS PRICE
  const [calculatePrice, setCalculatePrice] = useState({
    total_price: "",
    no_of_days: "",
    hours: "",
    delivery_price: "",
    additional_fees: "",
    service_fee: "",
    booking_price: "",
  });

  const [addressField, setAddressField] = useState({
    address: "",
    landmark: "",
    latitute: "",
    longitude: "",
    addresserror: null,
  });

  const validationSchema = Yup.object({
    address: Yup.string().required().trim().label("Address"),
    state: Yup.string().required().trim().label("State"),
    city: Yup.string().required().trim().label("City"),
    country: Yup.string().required().trim().label("Country"),
    mobile_no: Yup.string()
      .min(5, "Mobile number must be between 5–15 digits")
      .max(15, "Mobile number must be between 5–15 digits")
      .required()
      .label("Mobile Number"),
    zipcode: Yup.string()
      .max(10, "Maximum 10 characters")
      .required()
      .trim()
      .label("Zipcode"),
  });

  const addressFormik = useFormik({
    initialValues: {
      address: "",
      landmark: "",
      state: "",
      city: "",
      country: "",
      zipcode: "",
      latitude: "",
      longitude: "",
    },
    validationSchema,
    onSubmit(values, { resetForm }) {},
  });

  const [productListByType, setProductListByType] = useState({
    list: [],
    page: 1,
    totalCount: null,
  });
  const [showMore, setShowMore] = useState(false);
  const [showMoreService, setShowMoreService] = useState(false);
  const [isShowCheckoutScreen, setIsShowCheckoutScreen] = useState(false);
  const [myCards, setMyCards] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  function toggle() {
    setIsOpened((wasOpened) => !wasOpened);
  }

  useEffect(() => {
    getProductDetails();
    getProductAvailability();
    if (token) {
      getSavedMyCard();
    }
  }, [id]);

  /** Card List */
  const getSavedMyCard = () => {
    userCardList()
      .then((resp) => {
        if (resp?.status == 200) {
          setMyCards(resp?.data?.data ?? []);
        }
      })
      .catch((err) => console.error(err));
  };

  /**
   * Get single product details
   */
  const getProductDetails = () => {
    getSingleProductDetails(id)
      .then((resp) => {
        if (resp?.status === 200) {
          setProductDetails(resp?.data?.data);
          getProductList(resp?.data?.data?.product_type?.id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * product availability
   */
  const getProductAvailability = () => {
    const formData = new FormData();
    formData.append("product_id", id);
    bookingAvailability(formData)
      .then((resp) => {
        if (resp?.status === 200) {
          setProductStartDate(resp?.data?.data[0]?.selected_dates);
          setProductEndDate(
            resp?.data?.data[resp?.data?.data?.length - 1]?.selected_dates
          );
          setAllReadyBookedDates(
            resp?.data?.data
              ?.filter((data) => {
                return data?.is_available == false;
              })
              ?.map((data) => {
                return new Date(data?.selected_dates);
              })
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * rent now functionality
   */
  const createBookingEventee = () => {
    if (!endDate && addressField?.address == "") {
      setErrorState("Please select end date and time");
      setAddressField({
        ...addressField,
        addresserror: "Address is a required field",
      });
    } else if (!endDate) {
      setErrorState("Please select end date and time");
    } else if (addressField?.address == "") {
      setAddressField({
        ...addressField,
        addresserror: "Address is a required field",
      });
    } else {
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append(
        "start_date",
        moment(startDate).format("YYYY-MM-DD HH:mm")
      );
      formData.append("end_date", moment(endDate).format("YYYY-MM-DD HH:mm"));
      formData.append("latitude", addressField?.latitute);
      formData.append("longitude", addressField?.longitude);
      formData.append("address", addressField?.address);
      formData.append("landmark", addressField?.landmark);
      formData.append(
        "timezone",
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      setIsLoading(true);
      createBooking(formData)
        .then((resp) => {
          setIsLoading(false);
          if (resp?.status === 200) {
            toastAlert("success", resp?.data?.message);
            navigate("/eventee/my-bookings");
          }
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
      setErrorState(null);
      // setIsShowCheckoutScreen(true);
    }
  };

  function SplitTime(numberOfHours) {
    let days = Math.floor(numberOfHours / 24);
    let remainder = numberOfHours % 24;
    let hours = Math.floor(remainder);
    if (days > 1) {
      return (
        <p className="mb-0">{`Price for ${days} Days ${
          hours > 0 ? `${hours} Hours` : ""
        }`}</p>
      );
    } else if (days == 1) {
      return (
        <p className="mb-0">{`Price for ${days} Day ${
          hours > 0 ? `${hours} Hours` : ""
        }`}</p>
      );
    } else if (hours == 1) {
      return (
        <p className="mb-0">{`Price for ${days} Day ${
          hours > 0 ? `${hours} Hours` : ""
        }`}</p>
      );
    } else {
      return <p className="mb-0">Price for {hours} Hours</p>;
    }
  }

  function actualTimeCalculationForPrice(numberOfHours) {
    let days = Math.floor(numberOfHours / 24);
    let remainder = numberOfHours % 24;
    let hours = Math.floor(remainder);
    if (hours <= 2) {
      hours = 2;
    } else if (hours <= 4) {
      hours = 4;
    } else if (hours <= 8) {
      hours = 8;
    } else if (hours <= 12) {
      hours = 12;
    } else if (hours > 12) {
      days += 1;
      hours = 0;
    }
    if (days > 1) {
      return (
        <p>{`Price for ${days} Days ${hours > 0 ? `${hours} Hours` : ""} `}</p>
      );
    } else if (days == 1) {
      return (
        <p>{`Price for ${days} Day ${hours > 0 ? `${hours} Hours:` : ""}`}</p>
      );
    } else if (hours == 1) {
      return (
        <p>
          Price for {days} Day {hours} Hour
        </p>
      );
    } else {
      return <p>Price for {hours} Hours</p>;
    }
  }

  /**
   * Check booking price
   * @param {Date} start_date
   * @param {Date} end_date
   * @returns
   */
  const checkBookingPrice = (start_date, end_date) => {
    if (!endDate && addressField?.address == "") {
      setErrorState("Please select end date and time");
      setAddressField({
        ...addressField,
        addresserror: "Address is a required field",
      });
    } else if (!endDate) {
      setErrorState("Please select end date and time");
    } else if (addressField?.address == "") {
      setAddressField({
        ...addressField,
        addresserror: "Address is a required field",
      });
    } else {
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append(
        "start_date",
        moment(start_date).format("YYYY-MM-DD HH:mm")
      );
      formData.append("end_date", moment(end_date).format("YYYY-MM-DD HH:mm"));
      formData.append("latitude", addressField?.latitute);
      formData.append("longitude", addressField?.longitude);

      bookingPrice(formData)
        .then((resp) => {
          if (resp?.status === 200) {
            setCalculatePrice({
              total_price: resp?.data?.total_price,
              no_of_days: resp?.data?.no_of_days,
              hours: resp?.data?.hours,
              delivery_price: resp?.data?.delivery_price,
              additional_fees: resp?.data?.additional_fees,
              service_fee: resp?.data?.service_fee,
              booking_price: resp?.data?.booking_price,
            });
            setErrorState(null);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        message: "",
      },
      validationSchema: Yup.object().shape({
        message: Yup.string().required().trim().label("Message"),
      }),
      onSubmit: async (values) => {
        try {
          let payload = {
            message: values?.message,
            receiver_id: productDetails?.created_by?.id,
            product_id: productDetails?.id,
          };
          const formData = new FormData();
          Object.keys(payload).forEach((i) => {
            formData.append(i, payload[i]);
          });
          const resp = await sendMessage(formData);
          if (resp?.status == 200) {
            toastAlert("success", resp?.data?.message);
            navigate(`/eventee/chat`);
          }
        } catch (err) {
          console.error("err", err);
        }
      },
    });

  const getProductList = (product_type) => {
    allProductsList(productListByType?.page, product_type).then((resp) => {
      if (resp?.status === 200) {
        setProductListByType({
          ...productListByType,
          list: resp?.data?.data ?? [],
          totalCount: resp?.data?.meta_data?.total_results,
        });
      }
    });
  };

  const handlePlaces = (place) => {
    place?.address_components?.map((item) => {
      if (item?.types?.includes("country")) {
        addressFormik?.setFieldValue("country", item?.long_name);
      }
      if (item?.types?.includes("administrative_area_level_1")) {
        addressFormik?.setFieldValue("state", item?.long_name);
      }
      if (item?.types?.includes("administrative_area_level_3")) {
        addressFormik?.setFieldValue("city", item?.long_name);
      }
      if (item?.types?.includes("postal_code")) {
        addressFormik?.setFieldValue("zipcode", item?.long_name);
      }
    });
    addressFormik?.setFieldValue("address", place?.formatted_address);
    addressFormik?.setFieldValue("latitude", place?.geometry?.location?.lat());
    addressFormik?.setFieldValue("longitude", place?.geometry?.location?.lng());
  };

  /**
   * Trigger when change location and end date
   */
  useEffect(() => {
    if (endDate) {
      checkBookingPrice(startDate, endDate);
    }
  }, [addressField?.latitute, addressField?.longitude, endDate]);

  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <div className={isOpened ? "main_outer_box" : "main_outer"}>
        <Container>
          <Row>
            <Col lg={8}>
              <Card className="border-0">
                <CardBody>
                  <div className="product_images">
                    <div className="big_box">
                      <img
                        src={
                          productDetails?.product_images[0]?.images
                            ? productDetails?.product_images[0]?.images
                            : "/images/booth-big.png"
                        }
                        alt="BigImg"
                      />
                    </div>
                    <div className="small_box_one">
                      <img
                        src={
                          productDetails?.product_images[1]?.images
                            ? productDetails?.product_images[1]?.images
                            : "/images/booth-sm1.png"
                        }
                        alt="SmallImg"
                      />
                    </div>
                    <div className="small_box_two">
                      <img
                        src={
                          productDetails?.product_images[2]?.images
                            ? productDetails?.product_images[2]?.images
                            : "/images/booth-sm2.png"
                        }
                        alt="SmallImg"
                      />
                    </div>
                  </div>
                  <div className="product_detail">
                    <Row>
                      <Col lg={8}>
                        <h4>{productDetails?.name}</h4>

                        <p
                          className="mb-4"
                          dangerouslySetInnerHTML={{
                            __html: showMore
                              ? productDetails?.description
                              : `${productDetails?.description.substring(
                                  0,
                                  300
                                )}`,
                          }}
                        />

                        <span
                          style={{ cursor: "pointer" }}
                          className="link"
                          onClick={() => setShowMore((prev) => !prev)}
                        >
                          &nbsp;
                          {productDetails?.description?.length > 300
                            ? showMore
                              ? "Show less"
                              : "...Show more"
                            : ""}
                        </span>
                        <Row>
                          <h5>Details</h5>
                          <Col lg={6}>
                            <ul className="features-box">
                              <li>
                                <span className="icon_box">
                                  <SizeBlueIcon />
                                </span>
                                <p>
                                  Size <span> {productDetails?.size}</span>
                                </p>
                              </li>
                              <li>
                                <span className="icon_box">
                                  <ElectricityBlueIcon />
                                </span>
                                <p>
                                  Electricity need
                                  <span>
                                    &nbsp;
                                    {productDetails?.electricity_needed
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </p>
                              </li>
                              <li>
                                <span className="icon_box">
                                  <PrinterBlueIcon />
                                </span>
                                <p>
                                  Printing included
                                  <span>
                                    &nbsp;
                                    {productDetails?.electricity_needed
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </p>
                              </li>
                            </ul>
                          </Col>
                          <Col lg={6}>
                            <ul className="features-box">
                              <li>
                                <span className="icon_box">
                                  <WifiBlueIcon />
                                </span>
                                <p>
                                  Wifi need
                                  <span>
                                    &nbsp;
                                    {productDetails?.wifi_needed ? "Yes" : "No"}
                                  </span>
                                </p>
                              </li>
                              <li>
                                <span className="icon_box">
                                  <SettingBlueIcon />
                                </span>
                                <p>
                                  Setup Time
                                  <span>
                                    &nbsp; {productDetails?.setup_time}h
                                  </span>
                                </p>
                              </li>
                              <li>
                                <span className="icon_box">
                                  <BreakdownBlueIcon />
                                </span>
                                <p>
                                  Breakdown Time
                                  <span>
                                    &nbsp; {productDetails?.breakdown_time}h
                                  </span>
                                </p>
                              </li>
                            </ul>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6}>
                            <ul className="features-box">
                              {productDetails?.price_for_eight_hour && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Price for 8 hours{" "}
                                    <span>
                                      ${productDetails?.price_for_eight_hour}
                                    </span>
                                  </p>
                                </li>
                              )}
                              {productDetails?.price_for_four_hour && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Price for 4 hours{" "}
                                    <span>
                                      ${productDetails?.price_for_four_hour}
                                    </span>
                                  </p>
                                </li>
                              )}
                              {productDetails?.price_for_one_day && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Price for 1 day{" "}
                                    <span>
                                      ${productDetails?.price_for_one_day}
                                    </span>
                                  </p>
                                </li>
                              )}
                            </ul>
                          </Col>
                          <Col lg={6}>
                            <ul className="features-box">
                              {productDetails?.price_for_twelve_hour && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Price for 12 hours{" "}
                                    <span>
                                      ${productDetails?.price_for_twelve_hour}
                                    </span>
                                  </p>
                                </li>
                              )}
                              {productDetails?.price_for_two_hour && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Price for 2 hours{" "}
                                    <span>
                                      ${productDetails?.price_for_two_hour}
                                    </span>
                                  </p>
                                </li>
                              )}

                              {productDetails?.additional_fees && (
                                <li>
                                  <span className="icon_box">
                                    <DollarIcon />
                                  </span>
                                  <p>
                                    Additional fees{" "}
                                    <span>
                                      ${productDetails?.additional_fees}
                                    </span>
                                  </p>
                                </li>
                              )}
                            </ul>
                          </Col>
                        </Row>
                        <h5>Terms of service</h5>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: showMoreService
                              ? productDetails?.terms_of_service
                              : `${productDetails?.terms_of_service.substring(
                                  0,
                                  300
                                )}`,
                          }}
                        />

                        <span
                          style={{ cursor: "pointer" }}
                          className="link"
                          onClick={() => setShowMoreService((prev) => !prev)}
                        >
                          &nbsp;
                          {productDetails?.terms_of_service?.length > 300
                            ? showMoreService
                              ? "Show less"
                              : "...Show more"
                            : ""}
                        </span>
                      </Col>
                      <Col lg={4}>
                        <h4>Location</h4>
                        <p>
                          <span>
                            <LocationIcon /> {productDetails?.address} &nbsp;
                            <b>{productDetails?.city}</b>
                            <b>
                              {productDetails?.state
                                ? `, ${productDetails?.state}`
                                : ""}
                            </b>
                          </span>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>

              <Card className="border-0 map-card">
                <CardBody>
                  <Row>
                    <Col lg={5}>
                      <h5>Delivery location</h5>
                      <ul className="address-list">
                        <li>
                          <p>${productDetails?.fixed_delivery_price}</p>
                          <p className="text-dark text-end">Up to 20 miles</p>
                        </li>
                        <li>
                          <p>${productDetails?.price_per_mile} </p>
                          <p className="text-dark text-end">
                            per mile
                            <span className="d-block">
                              (outside the free <br /> delivery area)
                            </span>
                          </p>
                        </li>
                      </ul>
                    </Col>
                    <Col lg={7}>
                      <div className="">
                        <iframe
                          name="gMap"
                          width={"100%"}
                          height="400"
                          style={{ marginTop: 20 }}
                          src={`https://www.google.com/maps/embed/v1/place?q=${
                            addressField?.latitute
                          },${addressField?.longitude}&key=${
                            import.meta.env.VITE_MAP_KEY
                          }`}
                        ></iframe>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              {role == constant.EVENTEE && (
                <Card className="card border-0 chat-card">
                  <CardBody>
                    <h5 className="mb-4">Chat with Eventer</h5>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Control
                          as="textarea"
                          rows={4}
                          placeholder="Your message"
                          name="message"
                          onChange={handleChange}
                          value={values?.message}
                          onBlur={handleBlur}
                        />
                        {touched.message && errors.message ? (
                          <div className="text-danger">{errors.message}</div>
                        ) : null}
                      </Form.Group>
                    </Form>
                    <span
                      style={{ cursor: "pointer" }}
                      className="btn btn-theme-outline w-100"
                      onClick={handleSubmit}
                    >
                      Send
                    </span>
                  </CardBody>
                </Card>
              )}

              <div className="photo-bhooth-sec py-5">
                <Container>
                  <div className="title-sec mb-4 d-flex align-items-center justify-content-between">
                    <h4>{productDetails?.product_type?.title}</h4>
                  </div>
                  <Row>
                    {productListByType?.list?.filter(
                      (data) => data?.id != productDetails?.id
                    )?.length !== 0 ? (
                      productListByType?.list
                        ?.filter((data) => data?.id != productDetails?.id)
                        ?.map((data, index) => {
                          return (
                            <Col lg={4} key={index}>
                              <Link
                                key={index}
                                className="bhooth-card"
                                to={"#"}
                                onClick={(e) => {
                                  e.preventDefault();
                                  token
                                    ? role == constant.EVENTER
                                      ? navigate(
                                          `/eventer/product-detail/${data?.id}`
                                        )
                                      : navigate(
                                          `/eventee/product-detail/${data?.id}`
                                        )
                                    : navigate(`/product-detail/${data?.id}`);
                                }}
                              >
                                <div className="bhooth-img">
                                  <img
                                    src={
                                      data?.product_images[0]?.images
                                        ? data?.product_images[0]?.images
                                        : "/images/bhooth-img-1.png"
                                    }
                                  />
                                </div>
                                <div className="bhooth-dis">
                                  <h3>{data?.name}</h3>
                                  <div className="d-flex align-items-center justify-content-between">
                                    <span>
                                      $
                                      {data?.price_for_two_hour
                                        ? data?.price_for_two_hour + "/ 2h"
                                        : data?.price_for_four_hour
                                        ? data?.price_for_four_hour + "/ 4h"
                                        : data?.price_for_eight_hour
                                        ? data?.price_for_eight_hour + "/ 8h"
                                        : data?.price_for_twelve_hour
                                        ? data?.price_for_twelve_hour + "/ 12h"
                                        : data?.price_for_one_day
                                        ? data?.price_for_one_day + "/ 1-day"
                                        : ""}
                                    </span>
                                    <p>1 day</p>
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          );
                        })
                    ) : (
                      <>
                        <h3>No Product found</h3>
                      </>
                    )}
                  </Row>
                </Container>
              </div>
            </Col>

            {/*******************************Rent Details **********************************/}

            {role != constant.EVENTER && !isShowCheckoutScreen && (
              <Col lg={4} className="d-none d-lg-block">
                <Card className="border-0 payment_box">
                  <CardBody>
                    <div className="title-sec mb-4 ">
                      <h4>Rent Details</h4>
                    </div>

                    <div className="date-box date-card">
                      <ul className="date-list">
                        <li>
                          <div className="title-sec mb-0 ">
                            <h5 className="mb-0">Delivery Addresss</h5>
                          </div>
                        </li>

                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Autocomplete
                              apiKey={import.meta.env.VITE_MAP_KEY}
                              placeholder="Enter Address"
                              className="form-control"
                              name="address"
                              value={addressField?.address}
                              options={{
                                types: [],
                              }}
                              onChange={(e) => {
                                setAddressField({
                                  ...addressField,
                                  address: e.target.value,
                                });
                              }}
                              onPlaceSelected={(place) => {
                                // handlePlaces(place);

                                setAddressField({
                                  ...addressField,
                                  latitute: place?.geometry?.location?.lat(),
                                  longitude: place?.geometry?.location?.lng(),
                                  address: place?.formatted_address,
                                  addresserror: null,
                                });
                              }}
                            />
                            {addressField?.addresserror ? (
                              <div className="text-danger">
                                {addressField?.addresserror}
                              </div>
                            ) : null}
                          </Form.Group>
                        </Col>
                        <Col lg={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Landmark</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your landmark"
                              name="landmark"
                              onChange={(e) =>
                                setAddressField({
                                  ...addressField,
                                  landmark: e.target.value,
                                })
                              }
                              value={addressField?.landmark}
                            />
                          </Form.Group>
                        </Col>
                      </ul>
                    </div>

                    <div className="date-box date-card">
                      <ul className="date-list">
                        <li>
                          <div className=" d-flex align-items-center justify-content-between">
                            <div>
                              <p className="mb-0">Start Date</p>
                              <div className="calendar">
                                <DatePicker
                                  ref={startDateRef}
                                  selected={startDate}
                                  onChange={(date) => {
                                    setStartDate(date);
                                    if (endDate) {
                                      checkBookingPrice(date, endDate);
                                    }
                                  }}
                                  className="custom-calendar"
                                  calendarContainer={StartCalendar}
                                  dateFormat={"dd, MMM"}
                                  dateFormatCalendar="dd, MMM yy"
                                  filterTime={filterPassedTime}
                                  minDate={
                                    new Date(availabilityDate) > new Date()
                                      ? new Date(availabilityDate)
                                      : new Date()
                                  }
                                  maxDate={new Date(availabilityEndDate)}
                                  excludeDates={allreadyBookedDates}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="filter-lft-date filter-rt-time ">
                            <div className=" d-flex align-items-center justify-content-between  flex-wrap">
                              <div className="clock">
                                <p className="mb-0"> Start Time</p>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => {
                                    setStartDate(date);
                                    if (endDate) {
                                      checkBookingPrice(date, endDate);
                                    }
                                  }}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={60}
                                  timeCaption="Time"
                                  dateFormat="h:mm aa"
                                  filterTime={filterPassedTime}
                                  className="custom-time-select"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex align-items-center justify-content-between flex-wrap">
                            <div>
                              <p>End Date</p>
                              <div className="calendar">
                                <DatePicker
                                  selected={endDate}
                                  onChange={(date) => {
                                    setEndDate(date);
                                    checkBookingPrice(startDate, date);
                                    setErrorState(null);
                                  }}
                                  placeholderText="-- --"
                                  filterTime={filterPassedTime}
                                  className="custom-calendar"
                                  dateFormat={"dd, MMM"}
                                  dateFormatCalendar="dd, MMM yy"
                                  minDate={startDate}
                                  maxDate={new Date(availabilityEndDate)}
                                  excludeDates={allreadyBookedDates}
                                />
                              </div>
                            </div>
                            <div className="clock">
                              <p>End Time</p>
                              <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                  setErrorState(null);
                                  setEndDate(date);
                                  checkBookingPrice(startDate, date);
                                }}
                                placeholderText="-- --"
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                filterTime={filterPassedTime}
                                className="custom-time-select"
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                      <p className="text-danger">{errorState && errorState}</p>
                    </div>

                    {calculatePrice?.total_price && (
                      <ul className="price-list">
                        <li>
                          <span className="d-flex align-items-center gap-2">
                            {SplitTime(calculatePrice?.hours)}

                            {/* <Dropdown className="info-drop">
                              <Dropdown.Toggle>
                                <ExclamationIcon />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <p className="mb-0">
                                  {actualTimeCalculationForPrice(
                                    calculatePrice?.hours
                                  )}
                                </p>
                              </Dropdown.Menu>
                            </Dropdown> */}
                          </span>
                          <p className="amount">
                            ${calculatePrice?.booking_price}
                          </p>
                        </li>
                        <li>
                          <p>Delivery</p>
                          <p className="amount">
                            ${calculatePrice?.delivery_price ?? "0.00"}
                          </p>
                        </li>
                        <li>
                          <p>Service Fee</p>
                          <p className="amount">
                            ${calculatePrice?.service_fee ?? "0.00"}
                          </p>
                        </li>
                        <li>
                          <p>Additional Fee</p>
                          <p className="amount">
                            ${calculatePrice?.additional_fees ?? "0.00"}
                          </p>
                        </li>
                      </ul>
                    )}

                    {calculatePrice?.total_price && (
                      <div className="total mb-4 d-flex align-items-center justify-content-between">
                        <h5>Total</h5>
                        <h3 className="total-amt">
                          ${calculatePrice?.total_price ?? "0.00"}
                        </h3>
                      </div>
                    )}

                    <Link
                      className="btn-theme-fill w-100"
                      to={"#"}
                      onClick={async (e) => {
                        e.preventDefault();
                        if (
                          loggedUserDetails == undefined ||
                          loggedUserDetails == null
                        ) {
                          Swal.fire({
                            title: "You need to login",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Log in!",
                            cancelButtonText: "Cancel",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              navigate(`/login`, {
                                state: window.location.pathname,
                              });
                            }
                          });
                        } else {
                          createBookingEventee();
                        }
                      }}
                    >
                      {/* Proceed Now */}
                      Rent Now
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            )}

            {/*******************************Rent Details end**********************************/}

            {/*************************************Checkout Details******************************************/}
            {role != constant.EVENTER && isShowCheckoutScreen && (
              <Col lg={4} className="d-none d-lg-block">
                <Card className="border-0 payment_box">
                  <CardBody>
                    <div className="title-sec mb-4 ">
                      <h4>Delivery Addresss</h4>
                    </div>

                    <div className="date-box date-card">
                      <ul className="date-list">
                        <li>
                          <div className=" d-flex align-items-center justify-content-between">
                            <div>
                              <Row>
                                <div className="title-sec">
                                  <h5>Location & Delivery</h5>
                                </div>

                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Autocomplete
                                      apiKey={import.meta.env.VITE_MAP_KEY}
                                      placeholder="Address"
                                      className="form-control"
                                      name="address"
                                      value={addressFormik?.values?.address}
                                      options={{
                                        types: [],
                                      }}
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      onPlaceSelected={(place) => {
                                        handlePlaces(place);
                                      }}
                                    />
                                    {addressFormik?.touched.address &&
                                    addressFormik?.errors.address ? (
                                      <div className="text-danger">
                                        {addressFormik?.errors.address}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Landmark</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter your landmark"
                                      name="landmark"
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      value={addressFormik?.values.landmark}
                                    />
                                  </Form.Group>
                                </Col>
                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter City"
                                      name="city"
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      value={addressFormik?.values.city}
                                    />
                                    {addressFormik?.touched.city &&
                                    addressFormik?.errors.city ? (
                                      <div className="text-danger">
                                        {addressFormik?.errors.city}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter State"
                                      name="state"
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      value={addressFormik?.values.state}
                                    />
                                    {addressFormik?.touched.state &&
                                    addressFormik?.errors.state ? (
                                      <div className="text-danger">
                                        {addressFormik?.errors.state}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Country"
                                      name="country"
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      value={addressFormik?.values.country}
                                    />
                                    {addressFormik?.touched.country &&
                                    addressFormik?.errors.country ? (
                                      <div className="text-danger">
                                        {addressFormik?.errors.country}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                                <Col lg={12}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Zip code</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter City"
                                      name="zipcode"
                                      onChange={addressFormik?.handleChange}
                                      onBlur={addressFormik?.handleBlur}
                                      value={addressFormik?.values.zipcode}
                                    />
                                    {addressFormik?.touched.zipcode &&
                                    addressFormik?.errors.zipcode ? (
                                      <div className="text-danger">
                                        {addressFormik?.errors.zipcode}
                                      </div>
                                    ) : null}
                                  </Form.Group>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="w-100 d-flex align-items-center justify-content-between">
                            <h5 className="mb-0">Card Details</h5>
                            <div
                              className="icon"
                              style={{ cursor: "pointer" }}
                              onClick={() => setShowAddCardModal(true)}
                            >
                              <AddIcon />
                            </div>
                          </div>
                          <div className=" d-flex align-items-center justify-content-between flex-wrap">
                            <div>
                              <div className="title-sec">
                                <Row>
                                  {myCards.map((data, index) => {
                                    return (
                                      <Col className="my-2" md={6} key={index}>
                                        <Card>
                                          <CardBody>
                                            <div className="d-flex justify-content-between align-items-center">
                                              <div className="d-flex">
                                                {/* <input
                                                  type="radio"
                                                  name="cardId"
                                                  value={data?.id}
                                                  checked={
                                                    data?.id == ids.cardId
                                                  }
                                                  onChange={handleRadioChange}
                                                  id={`card-${data?.id}`}
                                                /> */}
                                                &nbsp;&nbsp;
                                              </div>
                                              <div>
                                                <label
                                                  htmlFor={`card-${data?.id}`}
                                                >
                                                  <span>
                                                    <b>Card Holder Name: </b>
                                                    <span>
                                                      {data?.card_holder_name}
                                                    </span>
                                                  </span>
                                                  <div>
                                                    <span>
                                                      <b>Card Number: </b>
                                                    </span>
                                                    <span>
                                                      XXXX-XXXX-XXXX-
                                                      {data?.card_no?.substr(
                                                        data?.card_no?.length -
                                                          4
                                                      )}
                                                    </span>
                                                  </div>
                                                  <div>
                                                    <span>
                                                      <b>Expiry Date: </b>
                                                    </span>
                                                    <span>
                                                      {data?.expire_date}
                                                    </span>
                                                  </div>
                                                  {/* {data?.is_default && (
                                                    <span>
                                                      <FaCheckCircle /> Default
                                                    </span>
                                                  )} */}
                                                </label>
                                              </div>
                                              {/* <div className="d-flex">
                                                <Dropdown className="p-0">
                                                  <Dropdown.Toggle
                                                    className="nav-link p-0"
                                                    id="dropdown-basic"
                                                  >
                                                    <BsThreeDotsVertical />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleEditCard(data)
                                                      }
                                                    >
                                                      Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleDefaultCard(
                                                          data?.id
                                                        )
                                                      }
                                                    >
                                                      Set as Default
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleDeleteCard(
                                                          data?.id
                                                        )
                                                      }
                                                    >
                                                      Delete
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div> */}
                                            </div>
                                          </CardBody>
                                        </Card>
                                      </Col>
                                    );
                                  })}
                                </Row>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <Row>
                      <Col lg={6}>
                        <Link
                          className="btn-theme-fill w-100"
                          to={"#"}
                          onClick={async (e) => {
                            setIsShowCheckoutScreen(false);
                          }}
                        >
                          Back
                        </Link>
                      </Col>
                      <Col lg={6}>
                        <Link
                          className="btn-theme-fill w-100"
                          to={"#"}
                          onClick={addressFormik.handleSubmit}
                        >
                          Rent Now
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            )}

            {/*************************************Checkout Details end******************************************/}

            {/*************************Rent Details for mobile screen**********************************/}
            {role != constant.EVENTER && (
              <Col lg={12} className="d-block d-lg-none mobile-payemnt">
                <Link className="detail-btn" onClick={toggle}>
                  <h5 className="mb-0 text-white">Rent Details</h5>
                  <div className="arrow-icon">
                    <UPArrowIcon />
                  </div>
                </Link>
                {isOpened && (
                  <Card className="border-0 payment_box">
                    <CardBody className="p-0">
                      <div
                        onClick={toggle}
                        className="title-sec d-flex align-items-center justify-content-between mb-4"
                      >
                        <h5>Rent Details</h5>
                        <div className="arrow-icon">
                          <DownArrowIcon />
                        </div>
                      </div>

                      <div className="date-box date-card">
                        <ul className="date-list">
                          <li>
                            <div className="title-sec mb-3 ">
                              <h5 className="mb-0">Delivery Addresss</h5>
                            </div>
                          </li>
                          <Col lg={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Autocomplete
                                apiKey={import.meta.env.VITE_MAP_KEY}
                                placeholder="Enter Address"
                                className="form-control"
                                name="address"
                                value={addressField?.address}
                                options={{
                                  types: [],
                                }}
                                onChange={(e) => {
                                  setAddressField({
                                    ...addressField,
                                    address: e.target.value,
                                  });
                                }}
                                onPlaceSelected={(place) => {
                                  handlePlaces(place);
                                  setAddressField({
                                    ...addressField,
                                    latitute: place?.geometry?.location?.lat(),
                                    longitude: place?.geometry?.location?.lng(),
                                    address: place?.formatted_address,
                                    addresserror: null,
                                  });
                                  checkBookingPrice(startDate, endDate);
                                }}
                              />
                              {addressField?.addresserror ? (
                                <div className="text-danger">
                                  {addressField?.addresserror}
                                </div>
                              ) : null}
                            </Form.Group>
                          </Col>
                          <Col lg={12}>
                            <Form.Group className="mb-3">
                              <Form.Label>Landmark</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter your landmark"
                                name="landmark"
                                onChange={(e) =>
                                  setAddressField({
                                    ...addressField,
                                    landmark: e.target.value,
                                  })
                                }
                                value={addressField?.landmark}
                              />
                            </Form.Group>
                          </Col>
                        </ul>
                      </div>

                      <div className="date-box date-card">
                        <ul className="date-list">
                          <li>
                            <div className=" d-flex align-items-center justify-content-between">
                              <div>
                                <p className="mb-0">Start Date</p>
                                <div className="calendar">
                                  <DatePicker
                                    ref={startDateRef}
                                    selected={startDate}
                                    onChange={(date) => {
                                      setStartDate(date);
                                      if (endDate) {
                                        checkBookingPrice(date, endDate);
                                      }
                                    }}
                                    className="custom-calendar"
                                    calendarContainer={StartCalendar}
                                    dateFormat={"dd, MMM"}
                                    dateFormatCalendar="dd, MMM yy"
                                    filterTime={filterPassedTime}
                                    minDate={
                                      new Date(availabilityDate) > new Date()
                                        ? new Date(availabilityDate)
                                        : new Date()
                                    }
                                    maxDate={new Date(availabilityEndDate)}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="filter-lft-date filter-rt-time">
                              <div className=" d-flex align-items-center justify-content-between  flex-wrap">
                                <div className="clock">
                                  <p className="mb-0">Start Time</p>
                                  <DatePicker
                                    selected={startDate}
                                    onChange={(date) => {
                                      setStartDate(date);
                                      if (endDate) {
                                        checkBookingPrice(date, endDate);
                                      }
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={60}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    filterTime={filterPassedTime}
                                    className="custom-time-select"
                                  />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className=" d-flex align-items-center justify-content-between">
                              <div>
                                <p>End Date</p>
                                <div className="calendar">
                                  <DatePicker
                                    selected={endDate}
                                    onChange={(date) => {
                                      setEndDate(date);
                                      checkBookingPrice(startDate, date);
                                    }}
                                    placeholderText="-- --"
                                    filterTime={filterPassedTime}
                                    className="custom-calendar"
                                    dateFormat={"dd, MMM"}
                                    dateFormatCalendar="dd, MMM yy"
                                    minDate={startDate}
                                    maxDate={new Date(availabilityEndDate)}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="clock">
                              <p>End Time</p>
                              <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                  setEndDate(date);
                                  checkBookingPrice(startDate, date);
                                  setErrorState(null);
                                }}
                                placeholderText="-- --"
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                filterTime={filterPassedTime}
                                className="custom-time-select"
                              />
                            </div>
                          </li>
                          <p className="text-danger">
                            {errorState && errorState}
                          </p>
                        </ul>
                      </div>
                      {calculatePrice?.total_price && (
                        <ul className="price-list">
                          <li>
                            {SplitTime(calculatePrice?.hours)}
                            <p className="amount">
                              ${calculatePrice?.booking_price}
                            </p>
                          </li>

                          <li>
                            <p>Delivery</p>
                            <p className="amount">
                              ${calculatePrice?.delivery_price ?? "0.00"}
                            </p>
                          </li>
                          <li>
                            <p>Service Fee</p>
                            <p className="amount">
                              ${calculatePrice?.service_fee ?? "0.00"}
                            </p>
                          </li>
                          <li>
                            <p>Additional Fee</p>
                            <p className="amount">
                              ${calculatePrice?.additional_fees ?? "0.00"}
                            </p>
                          </li>
                        </ul>
                      )}

                      {calculatePrice?.total_price && (
                        <div className="total mb-4 d-flex align-items-center justify-content-between">
                          <h5>Total</h5>
                          <h3 className="total-amt">
                            ${calculatePrice?.total_price ?? "0.00"}
                          </h3>
                        </div>
                      )}
                      <Link
                        className="btn-theme-fill w-100"
                        to={"#"}
                        onClick={async (e) => {
                          e.preventDefault();
                          if (
                            loggedUserDetails == undefined ||
                            loggedUserDetails == null
                          ) {
                            Swal.fire({
                              title: "You need to login",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#3085d6",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, Log in!",
                              cancelButtonText: "Cancel",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                navigate(`/login`, {
                                  state: window.location.pathname,
                                });
                              }
                            });
                          } else {
                            createBookingEventee();
                          }
                        }}
                      >
                        {/* Proceed Now */}
                        Rent Now
                      </Link>
                    </CardBody>
                  </Card>
                )}
              </Col>
            )}

            {/*************************Rent Details for mobile screen end**********************************/}
            {/*************************Checkout for mobile screen**********************************/}
            {role != constant.EVENTER && isShowCheckoutScreen && (
              <Col lg={12} className="d-block d-lg-none mobile-payemnt">
                <Link className="detail-btn" onClick={toggle}>
                  <h5 className="mb-0 text-white">Rent Details</h5>
                  <div className="arrow-icon">
                    <UPArrowIcon />
                  </div>
                </Link>
                {isOpened && (
                  <Card className="border-0 payment_box">
                    <CardBody className="p-0">
                      <div
                        onClick={toggle}
                        className="title-sec d-flex align-items-center justify-content-between mb-4"
                      >
                        <h5>Rent Details</h5>
                        <div className="arrow-icon">
                          <DownArrowIcon />
                        </div>
                      </div>

                      <div className="date-box date-card">
                        <ul className="date-list">
                          <li>
                            <div className=" d-flex align-items-center justify-content-between">
                              <div>
                                <Row>
                                  <div className="title-sec">
                                    <h5>Location & Delivery</h5>
                                  </div>

                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Address</Form.Label>
                                      <Autocomplete
                                        apiKey={import.meta.env.VITE_MAP_KEY}
                                        placeholder="Address"
                                        className="form-control"
                                        name="address"
                                        value={addressFormik?.values?.address}
                                        options={{
                                          types: [],
                                        }}
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        onPlaceSelected={(place) => {
                                          handlePlaces(place);
                                        }}
                                      />
                                      {addressFormik?.touched.address &&
                                      addressFormik?.errors.address ? (
                                        <div className="text-danger">
                                          {addressFormik?.errors.address}
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Landmark</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter your landmark"
                                        name="landmark"
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        value={addressFormik?.values.landmark}
                                      />
                                    </Form.Group>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>City</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        name="city"
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        value={addressFormik?.values.city}
                                      />
                                      {addressFormik?.touched.city &&
                                      addressFormik?.errors.city ? (
                                        <div className="text-danger">
                                          {addressFormik?.errors.city}
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>State</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter State"
                                        name="state"
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        value={addressFormik?.values.state}
                                      />
                                      {addressFormik?.touched.state &&
                                      addressFormik?.errors.state ? (
                                        <div className="text-danger">
                                          {addressFormik?.errors.state}
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Country</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter Country"
                                        name="country"
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        value={addressFormik?.values.country}
                                      />
                                      {addressFormik?.touched.country &&
                                      addressFormik?.errors.country ? (
                                        <div className="text-danger">
                                          {addressFormik?.errors.country}
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                  <Col lg={12}>
                                    <Form.Group className="mb-3">
                                      <Form.Label>Zip code</Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        name="zipcode"
                                        onChange={addressFormik?.handleChange}
                                        onBlur={addressFormik?.handleBlur}
                                        value={addressFormik?.values.zipcode}
                                      />
                                      {addressFormik?.touched.zipcode &&
                                      addressFormik?.errors.zipcode ? (
                                        <div className="text-danger">
                                          {addressFormik?.errors.zipcode}
                                        </div>
                                      ) : null}
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="w-100 d-flex align-items-center justify-content-between">
                              <h4 className="mb-0">Card Details</h4>
                              <div
                                className="icon"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShowAddCardModal(true)}
                              >
                                <AddIcon />
                              </div>
                            </div>
                            <div className=" d-flex align-items-center justify-content-between flex-wrap">
                              <div>
                                <div className="title-sec">
                                  <Row>
                                    {myCards.map((data, index) => {
                                      return (
                                        <Col
                                          className="my-2"
                                          md={6}
                                          key={index}
                                        >
                                          <Card>
                                            <CardBody>
                                              <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex">
                                                  {/* <input
                                                  type="radio"
                                                  name="cardId"
                                                  value={data?.id}
                                                  checked={
                                                    data?.id == ids.cardId
                                                  }
                                                  onChange={handleRadioChange}
                                                  id={`card-${data?.id}`}
                                                /> */}
                                                  &nbsp;&nbsp;
                                                </div>
                                                <div>
                                                  <label
                                                    htmlFor={`card-${data?.id}`}
                                                  >
                                                    <span>
                                                      <b>Card Holder Name: </b>
                                                      <span>
                                                        {data?.card_holder_name}
                                                      </span>
                                                    </span>
                                                    <div>
                                                      <span>
                                                        <b>Card Number: </b>
                                                      </span>
                                                      <span>
                                                        XXXX-XXXX-XXXX-
                                                        {data?.card_no?.substr(
                                                          data?.card_no
                                                            ?.length - 4
                                                        )}
                                                      </span>
                                                    </div>
                                                    <div>
                                                      <span>
                                                        <b>Expiry Date: </b>
                                                      </span>
                                                      <span>
                                                        {data?.expire_date}
                                                      </span>
                                                    </div>
                                                    {/* {data?.is_default && (
                                                    <span>
                                                      <FaCheckCircle /> Default
                                                    </span>
                                                  )} */}
                                                  </label>
                                                </div>
                                                {/* <div className="d-flex">
                                                <Dropdown className="p-0">
                                                  <Dropdown.Toggle
                                                    className="nav-link p-0"
                                                    id="dropdown-basic"
                                                  >
                                                    <BsThreeDotsVertical />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleEditCard(data)
                                                      }
                                                    >
                                                      Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleDefaultCard(
                                                          data?.id
                                                        )
                                                      }
                                                    >
                                                      Set as Default
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        handleDeleteCard(
                                                          data?.id
                                                        )
                                                      }
                                                    >
                                                      Delete
                                                    </Dropdown.Item>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div> */}
                                              </div>
                                            </CardBody>
                                          </Card>
                                        </Col>
                                      );
                                    })}
                                  </Row>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <Row>
                        <Col xs={6}>
                          <Link
                            className="btn-theme-fill w-100"
                            to={"#"}
                            onClick={async (e) => {
                              setIsShowCheckoutScreen(false);
                            }}
                          >
                            Back
                          </Link>
                        </Col>
                        <Col xs={6}>
                          <Link
                            className="btn-theme-fill w-100"
                            to={"#"}
                            onClick={addressFormik.handleSubmit}
                          >
                            Rent Now
                          </Link>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                )}
              </Col>
            )}
            {/*************************Checkout for mobile screen end**********************************/}
          </Row>
        </Container>
        {isLoading ? <Loader /> : null}
        <Footer />
      </div>

      {/*********************** Add Card Modal********************************/}
      {
        // <WrapperAddCard
        //   show={showAddCardModal}
        //   setShow={setShowAddCardModal}
        //   getSavedMyCard={getSavedMyCard}
        // />
      }
    </>
  );
};

export default ProductDetails;
