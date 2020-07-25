import React, { Component } from "react";
import App from "../App";
import "../styles/landing.css";
import {Link} from 'react-router-dom'


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
            <Link to='/log-in' id='login'>Log In</Link>
            <Link to='/sign-up' id="join">Join now</Link>
          </div>
          <div className="title">
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
          </div>
        </div>
        {/* <App /> */}
      </div>
    );
  }
}

export default Landing;
