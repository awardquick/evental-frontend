import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { myNotifications } from "../../services/eventee-service";
import { convertUTCToLocal } from "../../utils/commonFunction";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import AuthHeader from "../Eventer/AuthHeader";
import "./notification.css";

const Notification = () => {
  const [notificationList, setNotificationList] = useState([]);
  const role = useRole();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    totalCount: null,
    page: 1,
  });
  useEffect(() => {
    getAllNotification;
  }, []);
  /**
   * All notifications list
   */

  const getAllNotification = useMemo(
    () =>
      myNotifications(pagination?.page)
        .then((resp) => {
          if (resp?.data?.status === 200) {
            setNotificationList(resp?.data?.data ?? []);
            setPagination({
              ...pagination,
              totalCount: resp?.data?.meta?.total_results,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        }),
    [pagination?.page]
  );

  return (
    <>
      <AuthHeader />
      <div className="notify-area">
        <Container>
          <Row>
            <Col lg={12}>
              <h3 className="mb-3 heading-line">Notifications</h3>
              <div className="notification-ui">
                {notificationList?.length > 0 ? (
                  notificationList?.map((data, index) => {
                    return (
                      <div
                        className={
                          data?.is_read == true
                            ? "notification-list "
                            : " notification-list notification-list-unread"
                        }
                        style={{ cursor: "pointer" }}
                        key={index}
                        onClick={() => {
                          if (
                            data?.notification_type ==
                            constant?.BOOKING_NOTIFICATION
                          ) {
                            navigate(
                              role == constant.EVENTEE
                                ? `/eventee/product-detail/${data?.product_id}`
                                : `/eventer/product-detail/${data?.product_id}`
                            );
                          } else if (
                            data?.notification_type ==
                            constant?.PRODUCT_NOTIFICATION
                          ) {
                            navigate(
                              role == constant.EVENTEE
                                ? `/eventee/product-detail/${data?.product_id}`
                                : `/eventer/product-detail/${data?.product_id}`
                            );
                          }
                        }}
                      >
                        <div className="notification-list_content">
                          {/* <div className="notification-list_img">
                          <img src={"/images/how_work_img.png"} alt="user" />
                        </div> */}
                          <div className="notification-list_detail">
                            <p>
                              <b>{data?.title}</b>
                            </p>
                            <p className="text-muted">{data?.description}</p>
                            <p className="text-muted">
                              <small>
                                {moment(
                                  convertUTCToLocal(data?.created_on)
                                ).fromNow()}
                              </small>
                            </p>
                          </div>
                        </div>
                        {/* <div className="notification-list_feature-img">
                        <img src={"/images/how_work_img.png"} alt="user" />
                      </div> */}
                      </div>
                    );
                  })
                ) : (
                  <h5>Notification not found</h5>
                )}
              </div>

              <div className="product_pagination mb-0 px-0">
                {Math.ceil(pagination.totalCount / 10) > 1 && (
                  <div>
                    <ReactPaginate
                      containerClassName={"pagination position-relative"}
                      previousLinkClassName={"pagination__link"}
                      nextLinkClassName={"pagination__link"}
                      disabledClassName={"pagination__link--disabled"}
                      activeClassName={"pagination__link--active"}
                      previousLabel={"Prev"}
                      nextLabel={"Next"}
                      onPageChange={(props) => {
                        setPagination((prev) => ({
                          ...prev,
                          page: props.selected + 1,
                        }));
                      }}
                      pageCount={Math.ceil(pagination.totalCount / 10)}
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Notification;
