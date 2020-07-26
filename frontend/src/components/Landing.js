import React, { Component } from "react";
import App from "../App";
import "../styles/landing.css";
import BootstrapCarousel from "./BootstrapCarousel";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="nav1">
          <div className="logo">
            <img src={require("../images/logo.png")} alt="logo" />
            <h1>
              <span>Job</span>Hunter
            </h1>
          </div>
          <div className="sign">
            <Link to="/log-in" id="login">
              Log In
            </Link>
            <Link to="/sign-up" id="join">
              Join now
            </Link>
          </div>
        </div>
        {/* <App /> */}
        <div>
          <BootstrapCarousel />
        </div>
        <div className="title"></div>
      </div>
    );
  }
}

export default Landing;
