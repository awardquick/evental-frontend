import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import * as yup from "yup";
import { LocationIcon, SendBtnBlackIcon } from "../../SvgIcons/allIcons";
import useDetail from "../../hooks/useDetail";
import {
  chatDetails,
  chatList,
  loadMessage,
  sendMessage,
} from "../../services/eventee-service";
import { convertUTCToLocal } from "../../utils/commonFunction";
import Footer from "../Common/Footer";
import AuthHeader from "../Eventer/AuthHeader";
import "./chat.css";

const MainChat = () => {
  const [allChatList, setAllChatList] = useState();
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatDetail, setChatDetail] = useState();
  const loggedUserDetails = useDetail();
  const messagesRef = useRef(null);

  useEffect(() => {
    getChatList();
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
      message: "",
    },
    validationSchema: yup.object().shape({
      message: yup.string().required().trim().label("Message"),
    }),
    onSubmit: async (values) => {
      try {
        let payload = {
          message: values?.message,
          receiver_id:
            loggedUserDetails?.id == currentChatId?.sender
              ? currentChatId?.receiver
              : currentChatId?.sender,
          product_id: currentChatId?.product_id?.id,
        };
        const formData = new FormData();
        Object.keys(payload).forEach((i) => {
          formData.append(i, payload[i]);
        });
        const resp = await sendMessage(formData);
        if (resp?.status == 200) {
          resetForm();
          messagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      } catch (err) {
        console.log("err", err);
      }
    },
  });

 
  /**
   * Get chat list
   */
  const getChatList = () => {
    chatList()
      .then((resp) => {
        if (resp?.status === 200) {
          setAllChatList(resp?.data?.data ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  /**
   * Get chat details
   */
  const getChatDetails = (chatId) => {
    const formData = new FormData();
    formData.append("chat_id", chatId);
    chatDetails(formData)
      .then((resp) => {
        if (resp?.status === 200) {
          setChatDetail(resp?.data?.data?.reverse() ?? []);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (currentChatId) {
      const formData = new FormData();
      formData.append("receiver_id", currentChatId?.receiver);
      formData.append("product_id", currentChatId?.product_id?.id);
      let interval = setInterval(() => {
        loadMessage(formData).then((resp) => {
          if (resp?.status === 200) {
            getChatDetails(currentChatId?.id);
          }
        });
      }, 2000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentChatId?.id]);

  return (
    <>
      <AuthHeader />
      <div className="chat_screen">
        <Container>
          <Row>
            <Col lg={5} xl={5} xxl={5}>
              <div className="title-sec mb-4">
                <h2>Messages</h2>
              </div>
              <div className="message_list">
                <ul>
                  {allChatList?.length > 0 ? (
                    allChatList?.map((data) => {
                      return (
                        <li
                          className={
                            currentChatId?.id == data?.id ? "active" : ""
                          }
                          onClick={() => {
                            setCurrentChatId(data);
                            getChatDetails(data?.id);
                            setTimeout(() => {
                              messagesRef.current.scrollIntoView({
                                behavior: "smooth",
                                block: "end",
                              });
                            }, 1000);
                          }}
                          key={data?.id}
                        >
                          <img
                            src={
                              data?.product_id?.product_images
                                ? data?.product_id?.product_images
                                : "/images/bhooth-img-1.png"
                            }
                            alt="Img"
                          />
                          <div className="w-100">
                            <span className="d-flex align-items-center justify-content-between">
                              <h5 className="name">
                                {data?.product_id?.created_by}
                              </h5>
                              <p className="date">
                                {moment(
                                  convertUTCToLocal(
                                    data?.last_message?.created_on
                                  )
                                ).format("lll")}
                              </p>
                            </span>
                            <h4 className="booth_name">
                              {data?.product_id?.name}
                            </h4>
                            <p className="msg">{data?.last_message?.message}</p>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <>
                      <h4>ChatList not found</h4>
                    </>
                  )}
                </ul>
              </div>
            </Col>
            <Col lg={7} xl={7} xxl={7}>
              {currentChatId ? (
                <div className="chat-view">
                  <div className="chat-head">
                    <img
                      src={
                        currentChatId?.product_id?.product_images
                          ? currentChatId?.product_id?.product_images
                          : "/images/bhooth-img-1.png"
                      }
                      alt="Img"
                    />
                    <div className="w-100">
                      <h4>{currentChatId?.product_id?.name}</h4>
                      <p> {currentChatId?.product_id?.created_by}</p>
                      <h5>Location</h5>
                      <p className="mb-0">
                        <span className="me-2">
                          <LocationIcon />
                        </span>
                        {currentChatId?.product_id?.address}
                      </p>
                    </div>
                  </div>
                  <div className="chat-middle">
                    <p className="date">
                      {moment(new Date()).format("DD.MM.YYYY")}
                    </p>
                    <div className="chat_middle_inner">
                      {chatDetail?.map((data) => {
                        return (
                          <div
                            className={
                              loggedUserDetails?.id == data?.sender?.id
                                ? "right_side mt-2"
                                : "left_Side mt-2"
                            }
                          >
                            <div className="msg-parent">
                              <img
                                src={
                                  loggedUserDetails?.id == data?.sender?.id
                                    ? data?.sender?.profile_pic
                                      ? data?.sender?.profile_pic
                                      : "/images/bhooth-img-1.png"
                                    : data?.sender?.profile_pic
                                    ? data?.sender?.profile_pic
                                    : "/images/bhooth-img-1.png"
                                }
                                alt="Img"
                              />
                              <div className="msg_box">
                                <p className="name">
                                  {loggedUserDetails?.id == data?.sender?.id
                                    ? loggedUserDetails?.full_name
                                    : data?.sender?.full_name}
                                </p>
                                <h4 className="msg">{data?.message}</h4>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesRef} />
                    </div>
                  </div>
                  <div className="chat-footer">
                    <Form.Control
                      className={
                        touched.message && errors.message ? "error" : ""
                      }
                      type="text"
                      placeholder="Type your message..."
                      name="message"
                      onChange={handleChange}
                      value={values?.message}
                      onBlur={handleBlur}
                      onKeyDown={() => {
                        if (event.keyCode === 13) {
                          handleSubmit();
                        }
                      }}
                    />

                    <span className="send-btn" onClick={handleSubmit}>
                      <SendBtnBlackIcon />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="empty-box">
                  <img src={"/images/empty-chat.svg"} alt="Img" />
                  <h6>You have no messages</h6>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default MainChat;
