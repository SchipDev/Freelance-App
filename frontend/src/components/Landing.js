import React, { Component } from "react";
import App from "../App";
import "../styles/landing.css";
import BootstrapCarousel from "./BootstrapCarousel";
class Landing extends Component {
  render() {
    return (
      <div>
        <div className="nav1">
          <div className="logo">
            <img src={require("../images/logo.png")} alt="logo" />
            <h1>
              <span>Job</span>Hunter
            </h1>
          </div>
          <div className="sign">
            <p>Log In</p>
            <p id="join">Join now</p>
          </div>
          {/* <div className="title">
            <div>
              <h1>
                Hire the best freelancers for any job,<br></br> online. Find
                your job with "in a couple of clicks"
              </h1>
              <p>
                Millions of people use JobHunter to turn their ideas into
                reality.
              </p>
            </div>
          </div> */}
        </div>
        {/* <App /> */}
        <BootstrapCarousel />
      </div>
    );
  }
}

export default Landing;
