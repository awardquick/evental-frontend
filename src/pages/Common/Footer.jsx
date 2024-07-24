import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./headerfooter.css";

const Footer = () => {
  return (
    <>
      <div className="footer-card pt-5">
        <div className="ftr-top pb-3">
          <Container>
            <Row className="d-flex align-item-center">
              <Col lg={5}>
                <div className="footer-lft">
                  <div className="footer-logo">
                    <img src={"../logo.png"} />
                  </div>
                  <div className="footer-dis">
                    <p>
                      Evental is the premier hub for all your event needs. We
                      connect passionate event supply providers with individuals
                      looking to create unforgettable moments. With a diverse
                      selection of high-quality supplies, from photo booths to
                      inflatable houses, chairs, fans, and more, Evental
                      empowers both renters and suppliers to make every event
                      extraordinary.
                    </p>
                  </div>
                </div>
              </Col>
              <Col lg={7}>
                <div className="footer-rt">
                  <h4>Menu</h4>
                  <div className="head-links">
                    <ul>
                      <li>
                        <Link to="/">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.765 2.12963L2.7225 5.27963C2.0475 5.80463 1.5 6.92213 1.5 7.76963V13.3271C1.5 15.0671 2.9175 16.4921 4.6575 16.4921H13.3425C15.0825 16.4921 16.5 15.0671 16.5 13.3346V7.87463C16.5 6.96713 15.8925 5.80463 15.15 5.28713L10.515 2.03963C9.465 1.30463 7.7775 1.34213 6.765 2.12963Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 13.4922V11.2422"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Rent
                        </Link>
                      </li>
                      <li>
                        <Link to="/how-it-work">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.18654 13.2732V12.3858C4.43737 11.3225 3 9.24944 3 7.04634C3 3.25977 6.46032 0.291705 10.3693 1.14847C12.0881 1.53095 13.5939 2.67839 14.3772 4.26187C15.9667 7.47472 14.2936 10.8865 11.8371 12.3781V13.2655C11.8371 13.4873 11.9208 13.9999 11.107 13.9999H6.91663C6.08007 14.0075 6.18654 13.6786 6.18654 13.2732Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.02539 17.0002C7.97152 16.4478 10.0281 16.4478 11.9743 17.0002"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          How it Works
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact-us">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_0_749)">
                              <path
                                d="M4.78125 11.6719C4.78125 12.4485 4.15164 13.0781 3.375 13.0781C2.59836 13.0781 1.96875 12.4485 1.96875 11.6719V9.14062C1.96875 8.36399 2.59836 7.73438 3.375 7.73438C4.15164 7.73438 4.78125 8.36399 4.78125 9.14062V11.6719Z"
                                stroke="#262831"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.0312 11.6719C16.0312 12.4485 15.4016 13.0781 14.625 13.0781C13.8484 13.0781 13.2188 12.4485 13.2188 11.6719V9.14062C13.2188 8.36399 13.8484 7.73438 14.625 7.73438C15.4016 7.73438 16.0312 8.36399 16.0312 9.14062V11.6719Z"
                                stroke="#262831"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M1.96875 9.14062V7.73438C1.96875 3.85112 5.11675 0.703125 9 0.703125C12.8833 0.703125 16.0312 3.85112 16.0312 7.73438V9.14062"
                                stroke="#262831"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.0312 11.6719V13.0781C16.0312 14.6314 14.7721 15.8906 13.2188 15.8906H10.4062"
                                stroke="#262831"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M9 17.2969C9.77665 17.2969 10.4062 16.6673 10.4062 15.8906C10.4062 15.114 9.77665 14.4844 9 14.4844C8.22335 14.4844 7.59375 15.114 7.59375 15.8906C7.59375 16.6673 8.22335 17.2969 9 17.2969Z"
                                stroke="#262831"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_0_749">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          Help Center
                        </Link>
                      </li>
                      <li>
                        <Link to="/term-condition">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 7.5V11.25C16.5 15 15 16.5 11.25 16.5H6.75C3 16.5 1.5 15 1.5 11.25V6.75C1.5 3 3 1.5 6.75 1.5H10.5"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.5 7.5H13.5C11.25 7.5 10.5 6.75 10.5 4.5V1.5L16.5 7.5Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.00625 9.99986C5.02139 9.44778 5.47694 9 6.02923 9H8.11541C8.63287 9 9.06349 9.39549 9.05766 9.91291C9.04884 10.6959 8.95236 11.8046 8.52905 12.5C8.26703 12.9305 7.8759 13.3162 7.55876 13.5887C7.25084 13.8532 6.80759 13.8533 6.49963 13.5887C6.1824 13.3163 5.79115 12.9305 5.52911 12.5C5.00409 11.6375 4.98198 10.8852 5.00625 9.99986Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link to="/disclaimer">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.75 10.05V12.3C12.75 15.3 11.55 16.5 8.55 16.5H5.7C2.7 16.5 1.5 15.3 1.5 12.3V9.45C1.5 6.45 2.7 5.25 5.7 5.25H7.95"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.7502 10.05H10.3502C8.5502 10.05 7.9502 9.45 7.9502 7.65V5.25L12.7502 10.05Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M8.7002 1.5H11.7002"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.25 3.75C5.25 2.505 6.255 1.5 7.5 1.5H9.465"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.5001 6V10.6425C16.5001 11.805 15.5551 12.75 14.3926 12.75"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.5 6H14.25C12.5625 6 12 5.4375 12 3.75V1.5L16.5 6Z"
                              stroke="#292D32"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Legal Disclaimer
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="ftr-bottom-rt d-flex align-items-top mt-5">
                  <div className="card-sec me-5">
                    <h4>Methods of payment</h4>
                    <ul className="pay-list">
                      <li>
                        <img src={"/images/pay-1.png"} />
                      </li>
                      <li>
                        <img src={"/images/pay-2.png"} />
                      </li>
                      <li>
                        <img src={"/images/pay-3.png"} />
                      </li>
                      <li>
                        <img src={"/images/pay-4.png"} />
                      </li>
                      <li>
                        <img src={"/images/pay-5.png"} />
                      </li>
                    </ul>
                  </div>
                  <div className="ftr-contact">
                    <h4>Contacts</h4>
                    <p>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_0_648)">
                          <path
                            d="M18.125 2.5H1.87501C0.841067 2.5 0 3.34107 0 4.37501V15.625C0 16.659 0.841067 17.5 1.87501 17.5H18.125C19.1589 17.5 20 16.659 20 15.625V4.37501C20 3.34107 19.1589 2.5 18.125 2.5ZM18.125 3.74999C18.2099 3.74999 18.2907 3.76761 18.3645 3.79838L10 11.048L1.63542 3.79838C1.70927 3.76765 1.79005 3.74999 1.87497 3.74999H18.125ZM18.125 16.25H1.87501C1.53017 16.25 1.24999 15.9699 1.24999 15.625V5.11901L9.59045 12.3474C9.70826 12.4493 9.85413 12.5 10 12.5C10.1459 12.5 10.2917 12.4494 10.4096 12.3474L18.75 5.11901V15.625C18.75 15.9699 18.4698 16.25 18.125 16.25Z"
                            fill="#262831"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_648">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      Help@eventalHQ.com
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="ftr-bottom-card">
          <Container>
            <Row>
              <Col lg={6} className="mb-1 mb-lg-0">
                <p>{`${new Date().getFullYear()} Evental. @${new Date().getFullYear()}. All Right Reserved`}</p>
              </Col>
              <Col lg={6}>
                <p className="text-start text-lg-end mb-0">
                  Powered by{" "}
                  <Link to="https://ozvid.com/">Ozvid Technologies</Link>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Footer;
