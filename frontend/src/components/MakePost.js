import React, { Component } from "react";
import "../styles/navbar_styles/post.css";
import Navbar from "./Navbar";
import axios from "axios";
import actions from "../services/index";

class PostJob extends Component {
  state = {
    message: "",
    userId: this.props.user.user._id,
    showForm: false,
    showRes: false,
    myPosts: [],
    showAllPosts: false
  };
  componentDidMount() {
    if (!this.props.user.user.email) {
      this.props.history.push("/log-in");
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
  handleSubmit = e => {
    e.preventDefault();

    let newJob = { ...this.state };
    actions.postJob(newJob).then(res => {
      console.log(res.data);
      this.setState({
        message: res.data,
        showForm: false,
        showRes: true
      });
      console.log(this.props.user.user._id);
    });
  };

  togglePost = () => {
    this.setState({
      showForm: !this.state.showForm,
      showRes: false,
      showAllPosts: false
    });
  };

  showPosts = () => {
    actions.showMyjobs(this.props.user.user._id).then(res => {
      this.setState({
        myPosts: res.data,
        showAllPosts: !this.state.showAllPosts,
        showRes: false,
        showForm: false
      });
    });
  };
  delete = name => {
    let post = this.state.myPosts.find(eachPost => {
      return eachPost._id === name._id;
    });
    let i = this.state.myPosts.indexOf(post);
    let copy = [...this.state.myPosts];
    copy.splice(i, 1);

    this.setState({
      myPosts: copy
    });
    actions.deleteMyJob(this.props.user.user._id).then(res => {});
  };
  showPostsOn = () => {
    console.log(this.state.myPosts);
    return this.state.myPosts.map((post, i) => {
      let date = new Date(post.createdAt);
      let title = post.title[0].toUpperCase() + post.title.slice(1);
      return (
        <li className="onePost">
          <div>
            {title}|${post.rate}|{date.toDateString()}
          </div>
          <p id="one">{post.description}</p>
          <button onClick={() => this.delete(post)}>Delete</button>
        </li>
      );
    });
  };
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

          <div className="postF" id="signup_div">
            <div className="twoButtons">
              <button class="button1" onClick={this.togglePost}>
                <span>Post a new job</span>
              </button>
              <button class="button1" onClick={this.showPosts}>
                <span>Manage your posts</span>
              </button>
            </div>
            {this.state.showForm ? (
              <div>
                <h3>Post your job</h3>
                <form className="postForm" onSubmit={this.handleSubmit}>
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

                  <label for="location">Location</label>
                  <br />
                  <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Dallas, TX, USA"
                    className="input_field"
                  />
                  <br />
                  <label for="rate">Hourly Rate($)</label>
                  <br />
                  <input
                    id="rate"
                    name="rate"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="15"
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
                  <input
                    className="postB"
                    type="submit"
                    value="Post"
                    id="signup_button"
                  />
                </form>
              </div>
            ) : (
              ""
            )}

            {this.state.showAllPosts ? (
              <div className="newPosts"> {this.showPostsOn()}</div>
            ) : (
              ""
            )}
            {/* {this.showPostsOn()} */}
            {this.state.showRes ? (
              <div className="checkForm">
                <p>Your job has been successfully posted!</p>
                <img src={require("../images/clipart.png")} alt="logo" />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PostJob;
