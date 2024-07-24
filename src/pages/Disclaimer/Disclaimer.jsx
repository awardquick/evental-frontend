import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./Disclaimer.css";

import moment from "moment";
import useToken from "../../hooks/useToken";
import { staticPages } from "../../services/eventee-service";
import { constant } from "../../utils/constant";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import AuthHeader from "../Eventer/AuthHeader";

function Disclaimer() {
  const token = useToken();
  const [privacyPolicy, setPrivacyPolicy] = useState();

  useEffect(() => {
    getStaticPages();
  }, []);

  /**
   * Get all product list
   */
  const getStaticPages = () => {
    const formData = new FormData();
    formData.append("type_id", constant.PrivacyPolicy);
    staticPages(formData).then((resp) => {
      if (resp?.status === 200) {
        setPrivacyPolicy(resp?.data?.data);
      }
    });
  };
  return (
    <>
      {token ? <AuthHeader /> : <Header />}

      <Container>
        <div className="term_main ptb-60">
          <div className="disclaimer_heading d-flex justify-content-between align-items-center">
            <h2 className="heading_h2 mb-0">{privacyPolicy?.title}</h2>
            <span>
              Last updated{" "}
              {moment(privacyPolicy?.updated_on).format("MMMM DD, YYYY")}
            </span>
          </div>
          <div className="ptb-30 ">
            <div
              dangerouslySetInnerHTML={{
                __html: privacyPolicy?.content,
              }}
            />
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Disclaimer;
