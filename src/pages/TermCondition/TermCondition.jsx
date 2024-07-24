import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./TermCondition.css";

import moment from "moment";
import useToken from "../../hooks/useToken";
import { staticPages } from "../../services/eventee-service";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";

function TermCondition() {
  const token = useToken();
  const [termAndConditions, setTermAndConditions] = useState();

  useEffect(() => {
    getStaticPages();
  }, []);

  /**
   * Get all product list
   */
  const getStaticPages = () => {
    const formData = new FormData();
    formData.append("type_id", constant.Terms_Conditions);
    staticPages(formData).then((resp) => {
      if (resp?.status === 200) {
        setTermAndConditions(resp?.data?.data);
      }
    });
  };

  return (
    <>
      {token ? <AuthHeader /> : <Header />}
      <Container>
        <div className="term_main ptb-60">
          <Row>
            <Col lg={12}>
              <div className="term_heading d-flex justify-content-between align-items-center">
                <h2 className="heading_h2">{termAndConditions?.title}</h2>
                <span>
                  Last updated{" "}
                  {moment(termAndConditions?.updated_on).format(
                    "MMMM DD, YYYY"
                  )}
                </span>
              </div>

              <div className="ptb-30 ">
                <div
                  dangerouslySetInnerHTML={{
                    __html: termAndConditions?.content,
                  }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default TermCondition;
