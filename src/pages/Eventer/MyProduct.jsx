/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta < shiv@ozvid.com >
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React, { useEffect, useState } from "react";
import Header from "./AuthHeader";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LocationIcon, PlusBlueIcon } from "../../SvgIcons/allIcons";
import "./eventer.css";
import "../../Css/_button.css";
import Footer from "../Common/Footer";
import { myProductList, deleteProduct } from "../../services/eventer-service";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const MyProduct = () => {
  const [showMore, setShowMore] = useState(false);
  const [productList, setProductList] = useState({
    list: [],
    page: 1,
    totalCount: null,
  });

  useEffect(() => {
    getProductList();
  }, [productList?.page]);

  /**
   * Get all product list
   */
  const getProductList = () => {
    myProductList(productList?.page)
      .then((resp) => {
        if (resp?.status === 200) {
          setProductList({
            ...productList,
            list: resp?.data?.data ?? [],
            totalCount: resp?.data?.meta_data?.total_results,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * Delete my product
   */
  const deleteMyProduct = (productId) => {
    const formData = new FormData();
    formData.append("product_id", productId);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          deleteProduct(formData).then((resp) => {
            if (resp?.status == 200) {
              Swal.fire({
                title: "Deleted!",
                text: resp?.data?.message,
                icon: "success",
              });
              getProductList();
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
              <div className="title-sec mb-4 d-flex align-items-center justify-content-between">
                <h2>My Products</h2>
                <Link className="loc-link" to="/eventer/add-product">
                  <span className="me-2">
                    <PlusBlueIcon />
                  </span>
                  Add product
                </Link>
              </div>
              <Row>
                {productList?.list?.length > 0 ? (
                  productList?.list?.map((data, index) => {
                    return (
                      <Col lg={12} key={index}>
                        <Card className="border-0">
                          <CardBody>
                            <div className="product-box">
                              <div className="product-img">
                                <img
                                  src={
                                    data?.product_images[0]?.images
                                      ? data?.product_images[0]?.images
                                      : "/images/bhooth-img-1.png"
                                  }
                                  alt="Img"
                                />
                              </div>
                              <div className="product-cont">
                                <h5>{data?.name}</h5>
                                <p>
                                  {showMore
                                    ? data?.description
                                    : `${data?.description.substring(0, 200)}`}
                                  {data?.description?.length > 200 && (
                                    <span
                                      style={{ cursor: "pointer" }}
                                      className="link"
                                      onClick={() =>
                                        setShowMore((prev) => !prev)
                                      }
                                    >
                                      &nbsp;
                                      {showMore ? "Show less" : "...Show more"}
                                    </span>
                                  )}
                                </p>

                                <div className="mb-3">
                                  <h6>Location</h6>
                                  <p>
                                    <span>
                                      <LocationIcon /> {data?.address}&nbsp;
                                      {data?.city}&nbsp;{data?.state}
                                    </span>
                                  </p>
                                </div>
                                <div className="mb-3">
                                  <h6>Price</h6>
                                  <p>
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
                                  </p>
                                </div>
                                <div className="d-flex align-item-center w-100 gap-3">
                                  <Link
                                    className="btn-theme-fill w-100"
                                    to={`/eventer/edit-product/${data?.id}`}
                                  >
                                    Edit
                                  </Link>
                                  <span
                                    className="btn-theme-outline w-100"
                                    onClick={() => deleteMyProduct(data?.id)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })
                ) : (
                  <>
                    <h3>No Product found</h3>
                  </>
                )}
              </Row>
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
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default MyProduct;
