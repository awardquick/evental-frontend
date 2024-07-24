/**
 * @copyright : Ozvid Technologies Pvt. Ltd. < www.ozvid.com >
  @author     : Shiv Charan Panjeta 
  
  All Rights Reserved.
  Proprietary and confidential :  All information contained herein is, and remains
  the property of Ozvid Technologies Pvt. Ltd. and its partners.
  Unauthorized copying of this file, via any medium is strictly prohibited.
 * 
 */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useToken from "../../hooks/useToken";
import { allProductsList } from "../../services/eventee-service";
import { myProductList } from "../../services/eventer-service";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";
import "./ProductList.css";

function ProductList() {
  const token = useToken();
  const role = useRole();
  const [searchParams] = useSearchParams();
  const productType = searchParams.get("product_type") ?? "";
  const address = searchParams.get("address") ?? "";
  const startDate = searchParams.get("start_date") ?? "";
  const endDate = searchParams.get("end_date") ?? "";
  const latitute = searchParams.get("latitude") ?? "";
  const longitute = searchParams.get("longitude") ?? "";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
      allProductsList(
        productList?.page,
        productType,
        address,
        startDate,
        endDate,
        latitute,
        longitute,
        timezone
      ).then((resp) => {
        if (resp?.status === 200) {
          setProductList({
            ...productList,
            list: resp?.data?.data ?? [],
            totalCount: resp?.data?.meta_data?.total_results,
          });
        }
      });
    }
  };

  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <div className="ProductList_main">
        <Container>
          <div className="ProductList_heading">
            <h2 className="heading_h2 mb-0">Product List</h2>
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
                              ? data?.price_for_one_day + "/ 1day"
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
      <Footer />
    </>
  );
}

export default ProductList;
