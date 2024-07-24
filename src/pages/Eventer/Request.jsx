import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CardBody, Col, Container, Nav, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import { sendMessage } from "../../services/eventee-service";
import {
  acceptRejectBooking,
  myRequestList,
} from "../../services/eventer-service";
import { toastAlert } from "../../utils/SweetAlert";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import SendMessageModal from "../Common/SendMessageModal";
import Header from "./AuthHeader";
import "./eventer.css";

function Request() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [activetab, setActiveTab] = useState("request");
  const [requestList, setRequestList] = useState({
    list: [],
    page: 1,
    totalCount: null,
  });
  const [receiverDetails, setReceiverDetails] = useState({
    product_id: "",
    receiver_id: "",
  });

  useEffect(() => {
    getMyRequestList();
  }, [activetab, requestList?.page]);

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
          navigate(`/eventer/chat`);
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  });

  /**
   * Get all product list
   */
  const getMyRequestList = () => {
    myRequestList(
      activetab == "request"
        ? constant.BOOKING_REQUEST
        : activetab == "active"
        ? constant.BOOKING_REQUEST_ACTIVE
        : constant.BOOKING_REQUEST_HISTORY,
      requestList?.page
    ).then((resp) => {
      if (resp?.status === 200) {
        setRequestList({
          ...requestList,
          list: resp?.data?.data ?? [],
          totalCount: resp?.data?.meta_data?.total_results,
        });
      }
    });
  };
  /**
   * Accept Reject Booking
   */
  const handleAcceptRejectBooking = (bookingId, bookingState) => {
    const formData = new FormData();
    formData.append("booking_id", bookingId);
    formData.append("booking_state", bookingState);
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${
          bookingState == constant.ACCEPT_BOOKING
            ? "Yes, Accept it!"
            : "Yes, Cancel it!"
        }`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          acceptRejectBooking(formData).then((resp) => {
            if (resp?.status === 200) {
              Swal.fire({
                title: `${
                  bookingState == constant.ACCEPT_BOOKING
                    ? "Accepted"
                    : "Cancelled"
                }`,
                text: resp?.data?.message,
                icon: "success",
              });
              getMyRequestList();
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
                    defaultActiveKey="request"
                    activeKey={activetab}
                    onSelect={(k) => setActiveTab(k)}
                  >
                    <Row>
                      <Col sm={12}>
                        <Nav variant="pills justify-content-between pb-5">
                          <div>
                            <h2 className="heading_h2">Request</h2>
                          </div>
                          <div className="d-flex request_tab ">
                            <Nav.Item>
                              <Nav.Link eventKey="request">Requests</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="active">Active </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="history">History</Nav.Link>
                            </Nav.Item>
                          </div>
                        </Nav>
                      </Col>
                      <Col sm={12}>
                        <Tab.Content>
                          <Tab.Pane eventKey="request">
                            {requestList?.list?.length > 0 ? (
                              requestList?.list?.map((data, index) => {
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
                                      <div className="request_message request_locatin_title">
                                        <h3 className="heading_h3">Suppliers</h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="request_message_img_txt d-flex gap-2">
                                            <div className="request_message_img">
                                              <img
                                                className="profile_img"
                                                src={
                                                  data?.created_by?.profile_pic
                                                    ? data?.created_by
                                                        ?.profile_pic
                                                    : "/images/request_msg.png"
                                                }
                                              />
                                            </div>

                                            <div className="request_message_txt">
                                              <p className="para">
                                                {data?.created_by?.full_name}
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

                                            <span
                                              className="request_message_txt"
                                              onClick={() => {
                                                setReceiverDetails({
                                                  ...receiverDetails,
                                                  receiver_id:
                                                    data?.created_by?.id,
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
                                      <div className="request_btn d-flex gap-3 w-100">
                                        <span
                                          style={{ cursor: "pointer" }}
                                          className="btn-theme-fill  w-100"
                                          onClick={() =>
                                            handleAcceptRejectBooking(
                                              data?.id,
                                              constant.ACCEPT_BOOKING
                                            )
                                          }
                                        >
                                          Accept
                                        </span>
                                        <span
                                          style={{ cursor: "pointer" }}
                                          className="btn-theme-outline  w-100"
                                          onClick={() =>
                                            handleAcceptRejectBooking(
                                              data?.id,
                                              constant.REJECT_BOOKING
                                            )
                                          }
                                        >
                                          Cancel
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <>
                                <h3>Request not found</h3>
                              </>
                            )}
                          </Tab.Pane>
                          <Tab.Pane eventKey="active">
                            {requestList?.list?.length > 0 ? (
                              requestList?.list?.map((data, index) => {
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
                                      <div className="request_message request_locatin_title">
                                        <h3 className="heading_h3">Suppliers</h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="request_message_img_txt d-flex gap-2">
                                            <div className="request_message_img">
                                              <img
                                                className="profile_img"
                                                src={
                                                  data?.created_by?.profile_pic
                                                    ? data?.created_by
                                                        ?.profile_pic
                                                    : "/images/request_msg.png"
                                                }
                                              />
                                            </div>

                                            <div className="request_message_txt">
                                              <p className="para">
                                                {data?.created_by?.full_name}
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

                                            <span
                                              className="request_message_txt"
                                              onClick={() => {
                                                setReceiverDetails({
                                                  ...receiverDetails,
                                                  receiver_id:
                                                    data?.created_by?.id,
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
                                <h3>Request not found</h3>
                              </>
                            )}
                          </Tab.Pane>
                          <Tab.Pane eventKey="history">
                            {requestList?.list?.length > 0 ? (
                              requestList?.list?.map((data, index) => {
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
                                      <div className="request_message request_locatin_title">
                                        <h3 className="heading_h3">Suppliers</h3>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="request_message_img_txt d-flex gap-2">
                                            <div className="request_message_img">
                                              <img
                                                className="profile_img"
                                                src={
                                                  data?.created_by?.profile_pic
                                                    ? data?.created_by
                                                        ?.profile_pic
                                                    : "/images/request_msg.png"
                                                }
                                              />
                                            </div>

                                            <div className="request_message_txt">
                                              <p className="para">
                                                {data?.created_by?.full_name}
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

                                            <span
                                              className="request_message_txt"
                                              onClick={() => {
                                                setReceiverDetails({
                                                  ...receiverDetails,
                                                  receiver_id:
                                                    data?.created_by?.id,
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
                                <h3>Request not found</h3>
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

                                    <div
                                      className="request_message_txt"
                                      onClick={() => setShow(true)}
                                    >
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
                {Math.ceil(requestList.totalCount / 10) > 1 && (
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
                        setRequestList((prev) => ({
                          ...prev,
                          page: props.selected + 1,
                        }));
                      }}
                      pageCount={Math.ceil(requestList.totalCount / 10)}
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
}

export default Request;
