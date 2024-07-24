import React from "react";
import "./loader.css";
import { Navbar } from "react-bootstrap";
export default function Loader() {
  return (
    <div className="maindiv">
      <div>
        <div className="loadericon">
          <div className="outerCircle"></div>
          <div className="icon">
            <Navbar.Brand href="/" className="logoname">
              <img alt="" width="10" src={"/logo.png"} />
            </Navbar.Brand>
          </div>
        </div>
      </div>
    </div>
  );
}
