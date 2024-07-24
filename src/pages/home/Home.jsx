/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */

import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from "react-google-autocomplete";
import ReactPaginate from "react-paginate";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useRole from "../../hooks/useRole";
import useToken from "../../hooks/useToken";
import { allProductsList, visitorDetail } from "../../services/eventee-service";
import { categoryList, myProductList } from "../../services/eventer-service";
import { toastAlert } from "../../utils/SweetAlert";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import GuestUserModal from "../Common/GuestUserModal";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";
import EndCalendar from "./EndCalendar";
import StartCalendar from "./StartCalendar";
import "./home.css";

let timerId = 0;
const Home = () => {
  const navigate = useNavigate();
  const role = useRole();
  const token = useToken();
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1, 0, 0, 0))
  );
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [location, setLocation] = useState("");
  const [latitude, setLatitute] = useState(null);
  const [longitute, setLongitute] = useState(null);

  const [endDate, setEndDate] = useState(
    new Date(
      new Date(startDate).setHours(new Date(startDate).getHours() + 1, 0, 0, 0)
    )
  );
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const [productList, setProductList] = useState({
    list: [],
    page: 1,
    totalCount: null,
  });

  useEffect(() => {
    getProductList();
    getAllCategoryData();
  }, [productList?.page]);

  /**
   * Get all product list
   */
  const getProductList = () => {
    if (role == constant.EVENTER) {
      myProductList(productList?.page).then((resp) => {
        if (resp?.status === 200) {
          setProductList({
            ...productList,
            list: resp?.data?.data ?? [],
            totalCount: resp?.data?.meta_data?.total_results,
          });
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          allProductsList(
            productList?.page,
            "",
            "",
            "",
            "",
            position.coords.latitude,
            position.coords.longitude
          ).then((resp) => {
            if (resp?.status === 200) {
              setProductList({
                ...productList,
                list: resp?.data?.data ?? [],
                totalCount: resp?.data?.meta_data?.total_results,
              });
            }
          });
        },
        (error) => {
          // User denied the request for geolocation
          console.error("User denied geolocation request");
          // Handle the scenario where location services are turned off
          allProductsList(productList?.page, "", "", "", "", "", "").then(
            (resp) => {
              if (resp?.status === 200) {
                setProductList({
                  ...productList,
                  list: resp?.data?.data ?? [],
                  totalCount: resp?.data?.meta_data?.total_results,
                });
              }
            }
          );
        }
      );
    }
  };

  /**
   * Get All category
   */
  const getAllCategoryData = () => {
    categoryList()
      .then((resp) => {
        if (resp?.data?.status === 200) {
          setCategoryData(resp?.data?.data ?? []);
          setCurrentCategoryId(resp?.data?.data[0]?.id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //**********************Guest User Modal for submit basic details****************************/
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (token == undefined) {
      timerId = setInterval(() => {
        setShow(true);
      }, 3000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, []);

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
      full_name: "",
      email: "",
      mobile_no: "",
    },
    validationSchema: yup.object().shape({
      full_name: yup.string().required().trim().label("Full Name"),
      email: yup.string().email()?.required().trim().label("Email"),
      mobile_no: yup
        .string()
        .min(5, "Mobile number must be between 5–15 digits")
        .max(15, "Mobile number must be between 5–15 digits")
        .required()
        .label("Mobile Number"),
    }),

    onSubmit: async (values) => {
      try {
        let payload = {
          full_name: values?.full_name,
          email: values?.email,
          mobile_no: values?.mobile_no,
        };
        const formData = new FormData();
        Object.keys(payload).forEach((i) => {
          formData.append(i, payload[i]);
        });
        const resp = await visitorDetail(formData);
        if (resp?.status == 200) {
          toastAlert("success", resp?.data?.message);
          setShow(false);
          clearInterval(timerId);
          resetForm();
        }
      } catch (err) {
        console.error("err", err);
      }
    },
  });

  //**********************Guest User Modal for submit basic details****************************/

  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <div className="banner-card">
        <Container>
          <div className="banner-inr">
            <Row>
              <Col lg={9}>
                <div className="banner-dis">
                  <h4>Evental</h4>
                  <h1>Event Rentals Made Easy</h1>
                  <p>
                    Connect with ease: Find the perfect event rentals for your
                    next gathering Rent what you need, when you need it: Eventer
                    & Suppliers unite!"
                  </p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="banner-rt-img">
                  <img src={"/images/banner-rt.png"} />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {role != constant.EVENTER && (
        <div className="banner-filter">
          <Container>
            <div className="banner-fltr-inner">
              <div className="banner-filter-top">
                <h4>What do you want to rent?</h4>

                <div className="custom-radio mb-4">
                  {categoryData?.map((data, index) => {
                    return (
                      <div className="radio-item" key={index}>
                        <input
                          type="radio"
                          value={data?.id}
                          name="radio"
                          id={`radio-one_${data?.id}`}
                          checked={currentCategoryId == data?.id}
                          onChange={() => setCurrentCategoryId(data?.id)}
                        />
                        <label
                          className="label-icon"
                          htmlFor={`radio-one_${data?.id}`}
                        >
                          {data?.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="banner-filter-bottom">
                <h4>Set rent details</h4>
                <Row>
                  <Col lg={4}>
                    <div className="filter-loc-card h-100">
                      <span>Location</span>
                      <div className=" d-flex align-items-center">
                        <Autocomplete
                          apiKey={import.meta.env.VITE_MAP_KEY}
                          placeholder="Address"
                          className="form-control"
                          name="address"
                          value={location}
                          options={{
                            types: [],
                          }}
                          onChange={(e) => setLocation(e.target.value)}
                          onBlur={handleBlur}
                          onPlaceSelected={(place) => {
                            setLocation(place?.formatted_address);
                            setLatitute(place?.geometry?.location?.lat());
                            setLongitute(place?.geometry?.location?.lng());
                          }}
                        />

                        <img src={"images/location1.svg"} alt="IMG" />
                      </div>
                    </div>
                  </Col>
                  <Col lg={4} className="my-lg-0 my-3">
                    <div className="filter-date-card d-flex align-items-start justify-content-between h-100  flex-wrap">
                      <div className="filter-lft-date">
                        <span>Start Date</span>
                        <div className=" d-flex align-items-center justify-content-between">
                          <div className="calendar">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => {
                                setStartDate(date);
                                let endDate = new Date(date);
                                setEndDate(
                                  endDate.setDate(endDate.getDate() + 1)
                                );
                              }}
                              className="custom-calendar"
                              calendarContainer={StartCalendar}
                              dateFormat={"dd, MMM"}
                              dateFormatCalendar="dd, MMM yy"
                              minDate={new Date()}
                            />
                          </div>
                          <img src={"/images/calendar.svg"} className="icon" />
                        </div>
                        <div className="cal-control d-flex align-items-center justify-content-between">
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              let date = new Date(startDate);
                              if (
                                new Date() <=
                                new Date(startDate).setDate(date.getDate() - 1)
                              ) {
                                setStartDate(
                                  new Date(date.setDate(date.getDate() - 1))
                                );
                                let end_Date = new Date(endDate);
                                if (
                                  new Date(startDate).setDate(
                                    startDate.getDate() + 1
                                  ) > endDate
                                ) {
                                  setEndDate(
                                    new Date(
                                      end_Date.setDate(end_Date.getDate() - 1)
                                    )
                                  );
                                }
                              }
                            }}
                          >
                            Prev
                          </Link>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              let date = new Date(startDate);
                              let end_Date = new Date(endDate);
                              setStartDate(
                                new Date(date.setDate(date.getDate() + 1))
                              );

                              setEndDate(
                                new Date(
                                  end_Date.setDate(end_Date.getDate() + 1)
                                )
                              );
                            }}
                          >
                            Next
                          </Link>
                        </div>
                      </div>
                      <div className="filter-lft-date filter-rt-time">
                        <span>Time</span>
                        <div className=" d-flex align-items-center justify-content-between">
                          <div className="clock">
                            <DatePicker
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              filterTime={filterPassedTime}
                              className="custom-time-select"
                            />
                          </div>
                          <img src={"/images/clock.svg"} className="icon" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="filter-date-card d-flex align-items-start justify-content-between h-100  flex-wrap">
                      <div className="filter-lft-date">
                        <span>End Date</span>
                        <div className=" d-flex align-items-center justify-content-between">
                          <div className="calendar">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => {
                                setEndDate(date);
                              }}
                              className="custom-calendar"
                              calendarContainer={EndCalendar}
                              dateFormat={"dd, MMM"}
                              dateFormatCalendar="dd, MMM yy"
                              minDate={new Date(startDate)}
                            />
                          </div>
                          <img src={"/images/calendar.svg"} className="icon" />
                        </div>
                        <div className="cal-control d-flex align-items-center justify-content-between">
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              let date = new Date(endDate);
                              if (
                                new Date(startDate).setDate(
                                  startDate.getDate() + 1
                                ) < endDate
                              ) {
                                setEndDate(
                                  new Date(date.setDate(date.getDate() - 1))
                                );
                              }
                            }}
                          >
                            Prev
                          </Link>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              let date = new Date(endDate);
                              setEndDate(
                                new Date(date.setDate(date.getDate() + 1))
                              );
                            }}
                          >
                            Next
                          </Link>
                        </div>
                      </div>
                      <div className="filter-lft-date filter-rt-time">
                        <span>Time</span>
                        <div className=" d-flex align-items-center justify-content-between">
                          <div className="clock">
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={15}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              filterTime={filterPassedTime}
                              className="custom-time-select"
                            />
                          </div>
                          <img src={"/images/clock.svg"} className="icon" />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <button
                  className="w-100 find-btn mt-3 border-0"
                  onClick={() =>
                    navigate({
                      pathname: "/product-list",
                      search: createSearchParams({
                        product_type: currentCategoryId,
                        address: location,
                        latitude: latitude,
                        longitude: longitute,
                        start_date: moment(new Date(startDate)).format(
                          "YYYY-MM-DD hh:mm"
                        ),
                        end_date: moment(new Date(endDate)).format(
                          "YYYY-MM-DD hh:mm"
                        ),
                      }).toString(),
                    })
                  }
                >
                  Find
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5H12M12 5.5L7.64151 1M12 5.5L7.64151 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Container>
        </div>
      )}
      <div className="photo-bhooth-sec py-5">
        <Container>
          <div className="title-sec mb-4 d-flex align-items-center justify-content-between">
            <h2>
              {role != constant.EVENTER ? "Rentals Near You" : "My Products"}
            </h2>
            {/* {role != constant.EVENTER && (
              <Link className="loc-link" to="/">
                <img className="me-2" src={"/images/location.svg"} />
                New York
              </Link>
            )} */}
          </div>
          <Row>
            {productList?.list?.length > 0 ? (
              productList?.list?.map((data, index) => {
                return (
                  <Col lg={4} key={index}>
                    <Link
                      to={
                        token
                          ? role == constant.EVENTER
                            ? `/eventer/product-detail/${data?.id}`
                            : `/eventee/product-detail/${data?.id}`
                          : `/product-detail/${data?.id}`
                      }
                      className="bhooth-card"
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

            <div className="product_pagination mb-0 px-0">
              {Math.ceil(productList.totalCount / 10) > 1 && (
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
                      setProductList((prev) => ({
                        ...prev,
                        page: props.selected + 1,
                      }));
                    }}
                    pageCount={Math.ceil(productList.totalCount / 10)}
                  />
                </div>
              )}
            </div>
          </Row>
        </Container>
      </div>

      {!token && (
        <div className="event-sec py-5">
          <Container>
            <Row>
              <Col lg={6}>
                <div className="event-card blue h-100">
                  <h3>Create your first listing</h3>
                  <p>
                    Embrace the entrepreneurial spirit and become a driving
                    force in the event industry with Evental, the go-to platform
                    for renting event supplies.
                  </p>

                  <p>
                    Evental empowers you with the essential tools and support to
                    curate an impressive collection of party essentials – from
                    photo booths to inflatable houses and beyond.
                  </p>

                  <p>
                    Discover the potential to significantly boost your annual
                    earnings while adding a touch of magic to unforgettable
                    celebrations.
                  </p>

                  <p>
                    Start your journey today by listing your first rental today!
                    Evental is your trusted partner in turning your passion for
                    events into a thriving enterprise. Join us now!
                  </p>

                  <Link className="wht-btn mt-3" to="/eventer-register">
                    Register
                  </Link>

                  <div className="event-img">
                    <img src={"/images/event-1.png"} />
                  </div>
                </div>
              </Col>

              <Col lg={6}>
                <div className="event-card h-100 mt-lg-0 mt-4">
                  <h3>Rent with Evental</h3>
                  <p>
                    Transform your event dreams into reality with Evental, the
                    ultimate destination for renting top-quality event
                    supplies.At Evental we understand the importance of creating
                    unforgettable moments, and that's why we offer a vast
                    selection of event essentials.
                  </p>

                  <p>
                    You now have the power to elevate your gatherings, making
                    them truly special and memorable.
                  </p>

                  <p>
                    Browse our extensive inventory and choose from a wide range
                    of supplies to suit your event's unique needs. Whether it's
                    a birthday bash, a wedding celebration, or any special
                    occasion in between, Evental has you covered!
                  </p>

                  <Link className="blue-btn mt-3" to="/eventee-register">
                    Register
                  </Link>

                  <div className="event-img">
                    <img src={"/images/mask.png"} />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      <Footer />

      {/******************Guest User Modal***********************/}
      <GuestUserModal
        show={show}
        setShow={setShow}
        values={values}
        errors={errors}
        touched={touched}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        timerId={timerId}
      />
    </>
  );
};

export default Home;
