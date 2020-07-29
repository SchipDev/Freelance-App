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
        <div className="title2">
          <h2>Four Easy Steps to Landing The Job</h2>
          <div className="title">
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={require("../images/resume.png")} alt="logo" />
                </div>
                <div class="flip-card-back">
                  <h1>1</h1>
                  <p>Sign Up on JobHunter</p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={require("../images/profile-p.png")} alt="logo" />
                </div>
                <div class="flip-card-back">
                  <h1>2</h1>
                  <p>Upload Your Resume</p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={require("../images/connect.png")} alt="logo" />
                </div>
                <div class="flip-card-back">
                  <h1>3</h1>
                  <p>Wait For A Little Bit </p>
                </div>
              </div>
            </div>

            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <img src={require("../images/hire.png")} alt="logo" />
                </div>
                <div class="flip-card-back">
                  <h1>4</h1>
                  <p>You Are Hired!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
