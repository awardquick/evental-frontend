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
import { Accordion, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../Css/_button.css";
import { productDetails } from "../../services/eventer-service";
import Footer from "../Common/Footer";
import AuthHeader from "./AuthHeader";
import Availability from "./editProduct/Availability";
import PricingAndDeliveryFee from "./editProduct/PricingAndDeliveryFee";
import ProductInformation from "./editProduct/ProductInformation";
import "./eventer.css";

const EditProduct = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState();
  useEffect(() => {
    // To get selected product detail
    productDetails(id)
      .then((resp) => {
        if (resp?.status === 200) {
          setProductDetail(resp?.data?.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <AuthHeader />
      <div className="ptb30">
        <Container>
          <Row>
            <Col lg={7} className="mx-auto">
              <div className="edit-product-form">
                <Accordion defaultActiveKey="0">
                  {/******************* Product Information*******************************/}
                  {productDetail && (
                    <ProductInformation productDetail={productDetail} />
                  )}
                  {/******************* Availability*******************************/}
                  {productDetail && (
                    <Availability productDetail={productDetail} />
                  )}
                  {/******************* Pricing And Delivery Fee *******************************/}
                  {productDetail && (
                    <PricingAndDeliveryFee productDetail={productDetail} />
                  )}
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EditProduct;
