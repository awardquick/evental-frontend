import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormControl,
  Row,
} from "react-bootstrap";
import Footer from "../Common/Footer";
import "./HowWork.css";

import moment from "moment";
import DatePicker from "react-datepicker";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { categoryList } from "../../services/eventer-service";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";
import EndCalendar from "../home/EndCalendar";
import StartCalendar from "../home/StartCalendar";

function HowWork() {
  const navigate = useNavigate();
  const token = useToken();
  const [currentCategoryId, setCurrentCategoryId] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date(startDate).setDate(startDate.getDate() + 1))
  );
  const [location, setLocation] = useState("");

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
          setCurrentCategoryId(resp?.data?.data[0]?.id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };
  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <div className="how_work_main ptb-60">
        <Container>
          <Row>
            <Col lg={12} className="mx-auto">
              <Card className="border-0 bg-transparent">
                <CardBody>
                  <div className="how_work_heading">
                    <h2 className="mb-0">
                      How <span>Evental</span> Works
                    </h2>
                  </div>
                  <Row>
                    <Col lg={4}>
                      <div className="count_dash position-relative">
                        <div className="text-center how_wrok_count">
                          <span>1</span>
                        </div>
                        <Card className="border-0 mb-0 border-radius">
                          <CardBody className="pt-4 pb-0">
                            <div className="box_card">
                              <div className="card_box_txt text-center">
                                <h6 className="heading_h6">
                                  Find Your Event Rental
                                </h6>
                                <p>
                                  Enter your location and <br /> browse event
                                  supplies
                                </p>
                              </div>

                              <div className="card_box_img card_box_img_1">
                                <img
                                  className="w-100"
                                  src={"/images/how_work_1.png"}
                                />
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="count_dash position-relative">
                        <div className="text-center how_wrok_count">
                          <span>2</span>
                        </div>
                        <Card className="border-0 mb-0 border-radius">
                          <CardBody className="pt-4 pb-0">
                            <div className="box_card">
                              <div className="card_box_txt text-center">
                                <h6 className="heading_h6">
                                  Book Your Event Rental
                                </h6>
                                <p>
                                  Select the time and date that works best for
                                  you. Cancel for free up to 48 hours from your
                                  event date.
                                </p>
                              </div>

                              <div className="card_box_img">
                                <img
                                  className="w-100"
                                  src={"/images/how_work_2.png"}
                                />
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="text-center how_wrok_count">
                        <span>3</span>
                      </div>
                      <Card className="border-0 mb-0 border-radius">
                        <CardBody className="pt-4 pb-0">
                          <div className="box_card">
                            <div className="card_box_txt text-center">
                              <h6 className="heading_h6">
                                Get ready to party!
                              </h6>
                              <p>
                                Have your event rental delivered to your door
                                andget ready to party like a rock star!
                              </p>
                            </div>

                            <div className="card_box_img">
                              <img
                                className="w-100"
                                src={"/images/how_work_3.png"}
                              />
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <div className="text-center">
                <Link to="/" className="btn-theme-fill">
                  Browse Event Rentals
                </Link>
              </div>

              <div className="ptb-100">
                <Card className="border-0 border-radius mb-0">
                  <CardBody>
                    <Row className="align-items-center">
                      <Col lg={6}>
                        <img
                          className="w-100"
                          src={"/images/how_work_img.png"}
                        />
                      </Col>
                      <Col lg={6}>
                        <div className="work_why_text plr-60">
                          <h2 className="heading_h2 mb-0">Why Evental?</h2>
                          <p>
                            Evental makes planning your event seamless! No more
                            reaching out to countless suppliers for quotes and
                            never hearing back. Easily compare pricing and find
                            the perfect option foryour event!
                          </p>
                          <Link to="/" className="btn-theme-fill">
                            Rent Now!
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </div>
              <div className="banner-filter">
                <Container>
                  <div className="rent_heading text-center pb-4">
                    <h2 className="heading_h2">
                      Want to rent?<span>Try now! </span>
                    </h2>
                  </div>
                  <div className="banner-fltr-inner m-0">
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
                              <FormControl
                                type="text"
                                placeholder="New York"
                                onChange={(e) => setLocation(e.target.value)}
                                value={location}
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
                                <img
                                  src={"/images/calendar.svg"}
                                  className="icon"
                                />
                              </div>
                              <div className="cal-control d-flex align-items-center justify-content-between">
                                <Link
                                  onClick={(e) => {
                                    e.preventDefault();
                                    let date = new Date(startDate);
                                    if (new Date() <= new Date(startDate)) {
                                      setStartDate(
                                        new Date(
                                          date.setDate(date.getDate() - 1)
                                        )
                                      );
                                      let end_Date = new Date(endDate);
                                      if (
                                        new Date(startDate).setDate(
                                          startDate.getDate() + 1
                                        ) > endDate
                                      ) {
                                        setEndDate(
                                          new Date(
                                            end_Date.setDate(
                                              end_Date.getDate() - 1
                                            )
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
                                <img
                                  src={"/images/clock.svg"}
                                  className="icon"
                                />
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
                                    minDate={new Date(startDate).setDate(
                                      startDate.getDate() + 1
                                    )}
                                  />
                                </div>
                                <img
                                  src={"/images/calendar.svg"}
                                  className="icon"
                                />
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
                                        new Date(
                                          date.setDate(date.getDate() - 1)
                                        )
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
                                <img
                                  src={"/images/clock.svg"}
                                  className="icon"
                                />
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
                              start_date:
                                moment(startDate).format("YYYY-MM-DD HH:MM"),
                              end_date:
                                moment(endDate).format("YYYY-MM-DD HH:MM"),
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
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default HowWork;
