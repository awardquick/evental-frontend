/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../../Css/_common.css";
import useDetail from "../../hooks/useDetail";
import Footer from "../Common/Footer";
import Header from "./AuthHeader";

function EventerProfile() {
  const detail = useDetail();

  return (
    <>
      <Header />
      <div className="profile_view">
        <Container>
          <Row>
            <Col lg={6} md={6} className="mx-auto">
              <Card className="profile_main padding border-0">
                <Card.Body>
                  <div className="d-flex align-items-start justify-content-between">
                    <div className="profile_pic">
                      <img
                        className="profile_img"
                        src={
                          detail?.profile_pic
                            ? detail?.profile_pic
                            : "/images/view_profile.png"
                        }
                      />
                    </div>
                    <div className="text-end">
                      <Link
                        to="/eventer/edit-profile"
                        className="btn-theme-fill"
                      >
                        Edit profile
                      </Link>
                    </div>
                  </div>

                  <div className="profile_text">
                    <h2 className="heading_h2">{detail?.full_name}</h2>
                    <div className="d-flex align-items-start justify-content-between">
                      <h4 className="heading_h4">
                        Joined {moment(detail?.created_on).format("ll")}
                      </h4>
                      <h4 className="heading_h4">{detail?.booking} bookings</h4>
                    </div>
                  </div>

                  <div className="profile_form_main">
                    <h6 className="heading_h6">User Info</h6>
                    <div className="profile_form_inner">
                      <h6>Company Name - EIN</h6>
                      <p>{detail?.company_name}</p>
                    </div>
                    <div className="profile_form_inner">
                      <h6>Email address</h6>
                      <p>{detail?.email}</p>
                    </div>
                    <div className="profile_form_inner">
                      <h6>Phone number</h6>
                      <p>{detail?.mobile_no}</p>
                    </div>
                    <div className="photo_id d-flex align-items-center  justify-content-between">
                      <h5 className="heading_h5">Verify Status</h5>
                      <div className="photo_upload d-flex align-items-center">
                        <img
                          className="upload_tik"
                          src={"/images/profile_tik.png"}
                        />
                        <h5 className="heading_h5 mb-0">
                          {detail?.is_verified ? "Verified" : "Not Verified"}
                        </h5>
                      </div>
                    </div>
                  </div>

                  <div className="profile_payment">
                    <div className="d-flex justify-content-between payment_text">
                      <h6 className="heading_h6">Payment method</h6>
                      <Link
                        to={
                          detail?.card?.length > 0
                            ? "/eventer/update-payment-method"
                            : "/eventer/add-payment-method"
                        }
                        className="link"
                      >
                        {detail?.card?.length > 0 ? "Update" : "Add"}
                      </Link>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="heading_h5">Credit Card</h5>
                      <div className="credit_card">
                        <img className="credit_img" src={"/images/card.png"} />
                        <span>{detail?.card[0]?.card_no}</span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default EventerProfile;
