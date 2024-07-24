import React, { useEffect, useState } from "react";
import { CardBody, Col, Container, Nav, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate } from "react-router-dom";
import {
  cancelBooking,
  myBookingList,
  sendMessage,
} from "../../services/eventee-service";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import Header from "../Eventer/AuthHeader";
import "../Eventer/eventer.css";

import { useFormik } from "formik";
import moment from "moment";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import * as yup from "yup";
import { toastAlert } from "../../utils/SweetAlert";
import SendMessageModal from "../Common/SendMessageModal";

const MyBookings = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activetab, setActiveTab] = useState("active");
  const [bookingList, setBookingList] = useState({
    list: [],
    page: 1,
    totalCount: null,
  });

  const [receiverDetails, setReceiverDetails] = useState({
    product_id: "",
    receiver_id: "",
  });

  useEffect(() => {
    getMyBookingList();
  }, [activetab, bookingList?.page]);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: yup.object().shape({
      message: yup.string().required().trim().label("Message"),
    }),
    onSubmit: async (values) => {
      try {
        let payload = {
          message: values?.message,
          receiver_id: receiverDetails?.receiver_id,
          product_id: receiverDetails?.product_id,
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
        console.log("err", err);
      }
    },
  });

  /**
   * Get all product list
   */
  const getMyBookingList = () => {
    myBookingList(
      activetab == "active" ? constant.ACTIVE : constant.HISTORY,
      bookingList?.page
    ).then((resp) => {
      if (resp?.status === 200) {
        setBookingList({
          ...bookingList,
          list: resp?.data?.data ?? [],
          totalCount: resp?.data?.meta_data?.total_results,
        });
      }
    });
  };

  /**
   * Cancel Booking
   */
  const handleCancelBooking = (bookingId) => {
    const formData = new FormData();
    formData.append("booking_id", bookingId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          cancelBooking(formData).then((resp) => {
            if (resp?.status === 200) {
              Swal.fire({
                title: "Cancelled!",
                text: resp?.data?.message,
                icon: "success",
              });
              getMyBookingList();
            }
          });
        }
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <Header />
      <div className="ptb30">
        <Container>
          <Row>
            <Col lg={7} className="mx-auto">
              <Card className="border-0 request-tab card bg-transparent">
                <CardBody>
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="active"
                    activeKey={activetab}
                    onSelect={(k) => setActiveTab(k)}
                  >
                    <Row>
                      <Col sm={12}>
                        <Nav variant="pills justify-content-between pb-5">
                          <div>
                            <h2 className="heading_h2">My Bookings</h2>
                          </div>

                          <div className="d-flex request_tab ">
                            <Nav.Item>
                              <Nav.Link eventKey="active">Active</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="history">History</Nav.Link>
                            </Nav.Item>
                          </div>
                        </Nav>
                      </Col>
                      <Col sm={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="active">
                            {bookingList?.list?.length > 0 ? (
                              bookingList?.list?.map((data, index) => {
                                return (
                                  <div className="tabs_inner mb-4" key={index}>
                                    <div className="tabs_img">
                                      <img
                                        className="profile_img"
                                        src={
                                          data?.product?.product_images
                                            ?.length > 0
                                            ? data?.product?.product_images[0]
                                                ?.images
                                            : "/images/request_img.png"
                                        }
                                      />
                                    </div>
                                    <div className="tabs_text">
                                      <div className="tabs_heading">
                                        <h6 className="heading_h6 mb-0">
                                          {data?.product?.name}
                                        </h6>
                                      </div>
                                      <div className="request_date_inner">
                                        <div className="request_date d-flex justify-content-between">
                                          <p className="para">Start date</p>
                                          <p className="para">
                                            {moment(data?.start_date).format(
                                              "lll"
                                            )}
                                          </p>
                                        </div>

                                        <div className="request_date d-flex justify-content-between">
                                          <p className="para mb-0">End date</p>
                                          <p className="para mb-0">
                                            {moment(data?.end_date).format(
                                              "lll"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="request_location request_locatin_title">
                                        <h3 className="heading_h3">Location</h3>
                                        <div className="location_img d-flex align-items-center gap-2">
                                          <div className="location_img">
                                            <img
                                              className="profile_img"
                                              src={"/images/location.png"}
                                            />
                                          </div>
                                          <div className="location_para">
                                            <p className="para mb-0">
                                              {data?.address}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {data?.landmark && (
                                        <div className="request_location request_locatin_title">
                                          <h3 className="heading_h3">
                                            Landmark
                                          </h3>
                                          <div className="location_img d-flex align-items-center gap-2">
                                            <div className="location_img">
                                              <img
                                                className="profile_img"
                                                src={"/images/location.png"}
                                              />
                                            </div>
                                            <div className="location_para">
                                              <p className="para mb-0">
                                                {data?.landmark}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      <div className="request_message request_locatin_title">
                                        <h3 className="heading_h3">Eventer</h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="request_message_img_txt d-flex gap-2">
                                            <div className="request_message_img">
                                              <img
                                                className="profile_img"
                                                src={
                                                  data?.product?.created_by
                                                    ?.profile_pic
                                                    ? data?.product?.created_by
                                                        ?.profile_pic
                                                    : "/images/request_msg.png"
                                                }
                                              />
                                            </div>

                                            <div className="request_message_txt">
                                              <p className="para">
                                                {data?.product?.created_by
                                                  ?.full_name
                                                  ? data?.product?.created_by
                                                      ?.full_name
                                                  : data?.product?.created_by
                                                      ?.username}
                                              </p>
                                              {data?.product?.created_by
                                                ?.booking && (
                                                <p className="para para_2">
                                                  {
                                                    data?.product?.created_by
                                                      ?.booking
                                                  }
                                                  &nbsp; bookings
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <div className="d-flex gap-2">
                                            <div className="message_img">
                                              <img
                                                className="profile_img"
                                                src={"/images/message.png"}
                                              />
                                            </div>

                                            <span
                                              className="request_message_txt"
                                              onClick={() => {
                                                setReceiverDetails({
                                                  ...receiverDetails,
                                                  receiver_id:
                                                    data?.product?.created_by
                                                      ?.id,
                                                  product_id: data?.product?.id,
                                                });
                                                setShow(true);
                                              }}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <h3 className="heading_h3">
                                                Send message
                                              </h3>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="total_price d-flex justify-content-between">
                                        <div className="total_price_txt">
                                          <h3 className="heading_h3 mb-0">
                                            Total cost
                                          </h3>
                                        </div>
                                        <div className="price">
                                          <p className="price_amount mb-0">
                                            {Number(
                                              Number(
                                                data?.total_price
                                              )?.toFixed(2) ?? 0
                                            ).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                            })}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="request_btn">
                                        <span
                                          className="btn-theme-outline w-100"
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            handleCancelBooking(data?.id)
                                          }
                                        >
                                          Cancel Booking
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <h3>Booking not found</h3>
                              </>
                            )}
                          </Tab.Pane>
                          <Tab.Pane eventKey="history">
                            {bookingList?.list?.length > 0 ? (
                              bookingList?.list?.map((data, index) => {
                                return (
                                  <div className="tabs_inner mb-4" key={index}>
                                    <div className="tabs_img">
                                      <img
                                        className="profile_img"
                                        src={
                                          data?.product?.product_images
                                            ?.length > 0
                                            ? data?.product?.product_images[0]
                                                ?.images
                                            : "/images/request_img.png"
                                        }
                                      />
                                    </div>
                                    <div className="tabs_text">
                                      <div className="tabs_heading">
                                        <h6 className="heading_h6 mb-0">
                                          {data?.product?.name}
                                        </h6>
                                      </div>
                                      <div className="request_date_inner">
                                        <div className="request_date d-flex justify-content-between">
                                          <p className="para">Start date</p>
                                          <p className="para">
                                            {moment(data?.start_date).format(
                                              "lll"
                                            )}
                                          </p>
                                        </div>

                                        <div className="request_date d-flex justify-content-between">
                                          <p className="para mb-0">End date</p>
                                          <p className="para mb-0">
                                            {moment(data?.end_date).format(
                                              "lll"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="request_location request_locatin_title">
                                        <h3 className="heading_h3">Location</h3>
                                        <div className="location_img d-flex align-items-center gap-2">
                                          <div className="location_img">
                                            <img
                                              className="profile_img"
                                              src={"/images/location.png"}
                                            />
                                          </div>
                                          <div className="location_para">
                                            <p className="para mb-0">
                                              {`${data?.product?.address}, ${data?.product?.city}, ${data?.product?.state}`}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {data?.landmark && (
                                        <div className="request_location request_locatin_title">
                                          <h3 className="heading_h3">
                                            Landmark
                                          </h3>
                                          <div className="location_img d-flex align-items-center gap-2">
                                            <div className="location_img">
                                              <img
                                                className="profile_img"
                                                src={"/images/location.png"}
                                              />
                                            </div>
                                            <div className="location_para">
                                              <p className="para mb-0">
                                                {data?.landmark}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      <div className="request_message request_locatin_title">
                                        <h3 className="heading_h3">Eventer</h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="request_message_img_txt d-flex gap-2">
                                            <div className="request_message_img">
                                              <img
                                                className="profile_img"
                                                src={
                                                  data?.product?.created_by
                                                    ?.profile_pic
                                                    ? data?.product?.created_by
                                                        ?.profile_pic
                                                    : "/images/request_msg.png"
                                                }
                                              />
                                            </div>

                                            <div className="request_message_txt">
                                              <p className="para">
                                                {data?.product?.created_by
                                                  ?.full_name
                                                  ? data?.product?.created_by
                                                      ?.full_name
                                                  : data?.product?.created_by
                                                      ?.username}
                                              </p>
                                              {data?.product?.created_by
                                                ?.booking && (
                                                <p className="para para_2">
                                                  {
                                                    data?.product?.created_by
                                                      ?.booking
                                                  }
                                                  &nbsp; bookings
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <div className="d-flex gap-2">
                                            <div className="message_img">
                                              <img
                                                className="profile_img"
                                                src={"/images/message.png"}
                                              />
                                            </div>

                                            <span
                                              className="request_message_txt"
                                              onClick={() => {
                                                setReceiverDetails({
                                                  ...receiverDetails,
                                                  receiver_id:
                                                    data?.product?.created_by
                                                      ?.id,
                                                  product_id: data?.product?.id,
                                                });
                                                setShow(true);
                                              }}
                                              style={{ cursor: "pointer" }}
                                            >
                                              <h3 className="heading_h3">
                                                Send message
                                              </h3>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="total_price d-flex justify-content-between">
                                        <div className="total_price_txt">
                                          <h3 className="heading_h3 mb-0">
                                            Total cost
                                          </h3>
                                        </div>
                                        <div className="price">
                                          <p className="price_amount mb-0">
                                            {Number(
                                              Number(
                                                data?.total_price
                                              )?.toFixed(2) ?? 0
                                            ).toLocaleString("en-US", {
                                              style: "currency",
                                              currency: "USD",
                                            })}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <h3>Booking not found</h3>
                              </>
                            )}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </CardBody>
              </Card>
              <Card className="d-none border-0 bg-transparent">
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h2 className="heading_h2">Requests</h2>
                    </div>
                    <div className="request_tab">
                      <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                      >
                        <Tab eventKey="home" title="Requests (2)">
                          <div className="tabs_inner">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>

                              <div className="request_btn d-flex gap-3  w-100">
                                <Link to="/" className="btn-theme-fill  w-100">
                                  {" "}
                                  Accept
                                </Link>
                                <Link
                                  to="/"
                                  className="btn-theme-outline  w-100"
                                >
                                  {" "}
                                  Cancel
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="tabs_inner tabs_inner_2 d-flex align-items-center">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img_2.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>

                              <div className="request_btn  w-100 d-flex gap-3">
                                <Link to="/" className="btn-theme-fill w-100">
                                  Accept
                                </Link>
                                <Link
                                  to="/"
                                  className="btn-theme-outline w-100"
                                >
                                  Cancel
                                </Link>
                              </div>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="profile" title="Active (1)">
                          <div className="tabs_inner">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="History" title="History">
                          <div className="tabs_inner">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tabs_inner tabs_inner_2 d-flex align-items-center">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img_2.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="tabs_inner tabs_inner_2 d-flex align-items-center">
                            <div className="tabs_img">
                              <img
                                className="profile_img"
                                src={"/images/request_img_3.png"}
                              />
                            </div>

                            <div className="tabs_text">
                              <div className="tabs_heading">
                                <h6 className="heading_h6 mb-0">
                                  Photo booth regular
                                </h6>
                              </div>

                              <div className="request_date_inner">
                                <div className="request_date d-flex justify-content-between">
                                  <p className="para">Start date</p>
                                  <p className="para">Fri, 14 Jan 11:00 PM</p>
                                </div>

                                <div className="request_date d-flex justify-content-between">
                                  <p className="para mb-0">End date</p>
                                  <p className="para mb-0">
                                    Fri, 17 Jan 11:00 PM
                                  </p>
                                </div>
                              </div>

                              <div className="request_location request_locatin_title">
                                <h3 className="heading_h3">Location</h3>
                                <div className="location_img d-flex align-items-center gap-2">
                                  <div className="location_img">
                                    <img
                                      className="profile_img"
                                      src={"/images/location.png"}
                                    />
                                  </div>
                                  <div className="location_para">
                                    <p className="para mb-0">
                                      New York United States
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <div className="request_message request_locatin_title">
                                <h3 className="heading_h3">Suppliers</h3>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div className="request_message_img_txt d-flex gap-2">
                                    <div className="request_message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/request_msg.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <p className="para">Alex Balbus</p>
                                      <p className="para para_2">
                                        478 bookings
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-flex gap-2">
                                    <div className="message_img">
                                      <img
                                        className="profile_img"
                                        src={"/images/message.png"}
                                      />
                                    </div>

                                    <div className="request_message_txt">
                                      <h3 className="heading_h3">
                                        Send message
                                      </h3>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="total_price d-flex justify-content-between">
                                <div className="total_price_txt">
                                  <h3 className="heading_h3 mb-0">
                                    Total cost
                                  </h3>
                                </div>
                                <div className="price">
                                  <p className="price_amount mb-0">$310.00</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <div className="product_pagination mb-0 px-0">
                {Math.ceil(bookingList.totalCount / 10) > 1 && (
                  <div>
                    <ReactPaginate
                      containerClassName={
                        "pagination position-relative mt-5 pt-3"
                      }
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                      previousLabel={"Prev"}
                      nextLabel={"Next"}
                      onPageChange={(props) => {
                        setBookingList((prev) => ({
                          ...prev,
                          page: props.selected + 1,
                        }));
                      }}
                      pageCount={Math.ceil(bookingList.totalCount / 10)}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
      {/******************Send Message Modal***********************/}
      <SendMessageModal
        show={show}
        setShow={setShow}
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </>
  );
};

export default MyBookings;
