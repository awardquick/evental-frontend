import React, { useState } from "react";
import { Col, Container, Offcanvas, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../Css/_responsive.css";
import { MobileMenuIcon } from "../../SvgIcons/allIcons";
import "./headerfooter.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="header-card d-none d-lg-block">
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg={2}>
              <Link to="/">
                <div className="header-logo-new">
                <img src={"logo.png"} />
                </div>
                
              </Link>
            </Col>
            <Col lg={10}>
              <div className="header-rt d-flex align-items-center justify-content-between">
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
                <Link className="login-link" to="/login">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.707 13.4013L13.0537 11.0547L10.707 8.70801"
                      stroke="#5271FF"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.66699 11.0547H12.9895"
                      stroke="#5271FF"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11 3.66699C15.0517 3.66699 18.3333 6.41699 18.3333 11.0003C18.3333 15.5837 15.0517 18.3337 11 18.3337"
                      stroke="#5271FF"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Log In
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="mobile-header d-block d-lg-none">
        <div className="d-flex align-items-center justify-content-between">
          <Link to="/">
            <img src={"/images/logo.png"} />
          </Link>
          <div onClick={handleShow} className="menu-icon">
            <MobileMenuIcon />
          </div>
        </div>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <h4>Menu</h4>

            <div className="mobile-head-links">
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
          </Offcanvas.Body>
          <div className="offcanvas-footer">
            <Link className="login-btn" to="/login">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.707 13.4013L13.0537 11.0547L10.707 8.70801"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.66699 11.0547H12.9895"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 3.66699C15.0517 3.66699 18.3333 6.41699 18.3333 11.0003C18.3333 15.5837 15.0517 18.3337 11 18.3337"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Log In
            </Link>
          </div>
        </Offcanvas>
      </div>
    </>
  );
};

export default Header;
