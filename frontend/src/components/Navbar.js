import React from "react";

import "../styles/navbar_styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="bar" className="navDone">
      <Link style={{ textDecoration: "none" }} to="/">
        {" "}
        <div id="logoNav" className="logoNav2">
          <img src={require("../images/logo.png")} alt="logo" />
          <h1>
            <span>Job</span>Hunter
          </h1>
        </div>
      </Link>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>

          <ul id="menu" className="navAll">
            <Link style={{ textDecoration: "none" }} to="/profile">
              <div className="nav-links">
                <img
                  src={require("../images//userProfile.png")}
                  alt="profile"
                />
                <p>Profile</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/jobs">
              <div className="nav-links">
                <img
                  id="jobImg"
                  src={require("../images/searchJob.png")}
                  alt="searchJob"
                />
                <p>Jobs</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/companies">
              <div className="nav-links">
                <img src={require("../images/company.png")} alt="company" />
                <p>Companies</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/post-job">
              <div className="nav-links">
                <img src={require("../images/postJob.png")} alt="postJob" />
                <p>Post a job</p>
              </div>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/contact">
              <div className="nav-links">
                <img
                  id="contact"
                  src={require("../images/contact.png")}
                  alt="contact"
                />
                <p>Contact us</p>
              </div>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
