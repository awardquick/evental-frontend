import moment from "moment";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../../Css/_common.css";
import useDetail from "../../hooks/useDetail";
import Footer from "../Common/Footer";
import AuthHeader from "../Eventer/AuthHeader";

function ViewProfile() {
  const details = useDetail();
  return (
    <>
      <AuthHeader />
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
                          details?.profile_pic
                            ? details?.profile_pic
                            : "/images/view_profile.png"
                        }
                      />
                    </div>
                    <div className="text-end">
                      <Link
                        to="/eventee/edit-profile"
                        className="btn-theme-fill"
                      >
                        Edit profile
                      </Link>
                    </div>
                  </div>
                  <div className="profile_text">
                    <h2 className="heading_h2">{details?.full_name}</h2>
                    <div className="d-flex align-items-start justify-content-between">
                      <h4 className="heading_h4">
                        Joined {moment(details?.created_on).format("ll")}
                      </h4>
                      <h4 className="heading_h4">
                        {details?.booking} bookings
                      </h4>
                    </div>
                  </div>
                  <div className="profile_form_main">
                    <h6 className="heading_h6">User Info</h6>
                    <div className="profile_form_inner">
                      <h6>Email address</h6>
                      <p>{details?.email}</p>
                    </div>
                    <div className="profile_form_inner">
                      <h6>Phone number</h6>
                      <p>{details?.mobile_no}</p>
                    </div>
                    <div className="photo_id d-flex align-items-center  justify-content-between">
                      <h5 className="heading_h5">Verify Status</h5>
                      <div className="photo_upload d-flex align-items-center">
                        <img
                          className="upload_tik"
                          src={"/images/profile_tik.png"}
                        />
                        <h5 className="heading_h5 mb-0">
                          {details?.is_verified ? "Verified" : "Not Verified"}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="profile_payment">
                    <div className="d-flex justify-content-between payment_text">
                      <h6 className="heading_h6">Payment method</h6>
                      <Link
                        to={
                          details?.card?.length > 0
                            ? `/eventee/update-payment-method`
                            : `/eventee/add-payment-method`
                        }
                        className="link"
                      >
                        {details?.card?.length > 0 ? "Update" : "Add"}
                      </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="heading_h5">Credit Card</h5>
                      <div className="credit_card">
                        <img className="credit_img" src={"/images/card.png"} />
                        <span>
                          {details?.card.length > 0 &&
                            details?.card[0]?.card_no}
                        </span>
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

export default ViewProfile;
