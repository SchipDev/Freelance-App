import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import "../../styles/SignUp.css";
import { Link } from "react-router-dom";
import logo from "../../images/google=logo.png";
import Navbar from "../Navbar";

class SignUp extends Component {
  state = {};

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    actions
      .signUp(this.state)
      .then(user => {
        console.log(user);
        this.props.setUser({ ...user.data });
        this.props.history.push("/profile");
      })
      .catch(({ response }) => {
        alert("Looks like you already have an account with us!");

        window.location.href = "http://localhost:3000/log-in";
      });
  };

  render() {
    return (
      <div className="allSignUp">
        {/* <Navbar /> */}
        <div className="headSign">
          <p>Get one step closer to your dream job with</p>
          <h1 id="signLogo">
            <span>Job</span>Hunter
          </h1>
        </div>

        <div id="signup_div">
          <h3>Join Us </h3>
          <form onSubmit={this.handleSubmit}>
            <label for="email">Email Address</label>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              onChange={this.handleChange}
              placeholder="example@example.com"
              className="input_field"
            />
            <br />

            <label for="yourname1">First Name</label>
            <br />
            <input
              id="yourname1"
              name="firstName"
              type="text"
              onChange={this.handleChange}
              placeholder="John"
              className="input_field"
            />
            <br />
            <label for="yourname2">Last Name</label>
            <br />
            <input
              id="yourname2"
              name="lastName"
              type="text"
              onChange={this.handleChange}
              placeholder="Smith"
              className="input_field"
            />
            <br />
            <label for="phone">Phone Number</label>
            <br />

            <input
              type="tel"
              id="phone"
              name="phoneNum"
              className="input_field"
              onChange={this.handleChange}
              placeholder="(888)-888-8888"
              pattern="([0-9]{3})-[0-9]{3}-[0-9]{4}"
              required
            />
            <br />
            <label for="jobtitle">Job Title</label>
            <br />
            <input
              id="jobtitle"
              name="jobTitle"
              type="text"
              onChange={this.handleChange}
              placeholder="Web Developer"
              className="input_field"
            />
            <br />
            <label for="password">Password</label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              onChange={this.handleChange}
              placeholder="Password"
              className="input_field"
            />
            <br />
            <input type="submit" value="Sign Up" id="signup_button" />
          </form>
          <Link to="/google-signup" id="suwg">
            Sign Up With Google <img id="googleLogo" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
    );
  }
}

export default SignUp;
