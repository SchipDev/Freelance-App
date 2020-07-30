import React, { Component } from "react";
import "../styles/navbar_styles/post.css";
import Navbar from "./Navbar";

class PostJob extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="post">
          <div className="headPost">
            <h1 id="signLogo">
              <span>Job</span>Hunter
            </h1>
            <div class="rw-wrapper">
              <h2 class="rw-sentence">
                <p>
                  The tool you need to hire faster, and smarter. Get resources
                  that can help you
                </p>

                <div class="rw-words rw-words-2">
                  <span>recruit remotely</span>
                  <span>hire safely</span>
                  <span>post jobs for free</span>
                  <span>face the challenges</span>
                </div>
              </h2>
            </div>
          </div>
          <div id="signup_div">
            <h3>Your Post</h3>
            <form onSubmit={this.handleSubmit}>
              <label for="title">Job Title</label>
              <br />
              <input
                id="title"
                name="title"
                type="text"
                onChange={this.handleChange}
                placeholder="Nanny"
                className="input_field"
              />
              <br />

              <label for="lcation">Location</label>
              <br />
              <input
                id="location"
                name="location"
                type="text"
                onChange={this.handleChange}
                placeholder="Dallas, TX"
                className="input_field"
              />
              <br />
              <label for="rate">Hourly Rate</label>
              <br />
              <input
                id="rate"
                name="rate"
                type="text"
                onChange={this.handleChange}
                placeholder="$15"
                className="input_field"
              />
              <br />
              <label for="description">Description of the job</label>
              <br />
              <textarea
                id="area"
                name="description"
                onChange={this.handleChange}
                placeholder="My family is looking to hire an nanny to help care for my son (2nd grade)..."
                className="input_field"
              />
              <br />
              <input type="submit" value="Sign Up" id="signup_button" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostJob;
