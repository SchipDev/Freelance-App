import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import "../../styles/LogIn.css";

class LogIn extends Component {
  state = {};
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    actions
      .logIn(this.state)
      .then(async user => {
        await this.props.setUser({ ...user.data });
        this.props.history.push("/profile");
      })
      .catch(({ response }) => console.error(response));
  };
  render() {
    return (
      <div className="allSignUp">
        {/* <Navbar /> */}
        <div className="headSign">
          <p id="logP">Welcome Back to</p>
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
              className="input_field"
            />
            <br />
            <label for="Password">Password</label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              className="input_field"
              onChange={this.handleChange}
            />
            <br />
            <input id="signup_button" type="submit" value="Log In" />
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
