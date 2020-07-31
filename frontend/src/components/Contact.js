import React, { Component } from "react";
import Navbar from "./Navbar";
import "../styles/navbar_styles/contact.css";

class Contact extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar />
          <div className="companies">
            <div className="contact">
              <p className="headCont">
                Your feedback is extremely important for us. Tell us about your
                experience of using <strong>Job</strong>
                <span>Hunter</span>
              </p>
              <img
                id="cotactImg"
                src={require("../images/contactPage.png")}
                alt="logo"
              />

              {/* <form className="form2" onSubmit={this.getInfo}>
                <input
                  placeholder="Search by name"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                />
                <button className="submit" type="submit">
                  Find Companies
                </button>
              </form> */}
            </div>
            <div className="info">
              {" "}
              <div className="listCom">
                <div className="fpart">
                  <h2> Hanna Murai </h2>
                  <a href="https://www.linkedin.com/in/hmurai/" target="_blank">
                    <img
                      className="linkedIn"
                      src={require("../images/linkedin.png")}
                      alt="logo-Linkedin"
                    />
                  </a>
                </div>
                <img
                  className="profile-pic"
                  src={require("../images/HANNA copy.JPG")}
                  alt="profile-pic"
                ></img>
              </div>{" "}
              <div id="shane" className="listCom">
                <div className="fpart">
                  <h2> Shane Schipper </h2>
                  <a
                    href="https://www.linkedin.com/in/shane-schipper/"
                    target="_blank"
                  >
                    <img
                      className="linkedIn"
                      src={require("../images/linkedin.png")}
                      alt="logo-Linkedin"
                    />
                  </a>
                </div>
                <img
                  id="shanePic"
                  className="profile-pic"
                  src={require("../images/Shane Schipper Picture.png")}
                  alt="profile-pic"
                ></img>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
