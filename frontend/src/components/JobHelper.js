import React, { Component } from "react";
import "../styles/companies.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import helpers from "../styles/navbar_styles/helpers.css";

class JobHelper extends Component {
  state = {
    helpers: [],
    active1: true,
    active2: false
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  filteredJobs = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
    let helpersCopy = [...this.state.helpers];
    let res = helpersCopy.filter(helper => {
      return helper.title.toLowerCase().indexOf(event.target.value) !== -1;
    });
    this.setState({
      helpers: res
    });
  };
  async componentDidMount() {
    let res = await axios.get(`http://localhost:5000/job-helpers`);
    this.setState({
      helpers: res.data
    });
  }
  timeDiff = (date1, date2) => {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    let res = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );
    if (res > 1) return `${res} days ago`;
    else if (res == 1) return `1 day ago`;
    else return `now`;
  };
  showJobs = () => {
    let arr = [...this.state.helpers];
    let res = arr.sort((a, b) => {
      if (a.rate > b.rate) return -1;
      if (a.rate < b.rate) return 1;
      else return 0;
    });
    let date = Date.now();
    return res.map((helper, i) => {
      return (
        <div key={i} className="eachJob" id="eachHelper">
          <h3>{helper.title}</h3>
          <p className="postDays2">
            <strong>${helper.rate}</strong> | {helper.location}
          </p>
          <p className="descript">{helper.description}</p>
          <p className="days postDays">
            Posted {this.timeDiff(helper.updatedAt, date)}
          </p>
          <button id="expand_btn2">Save</button>
        </div>
      );
    });
  };
  sortPrice = () => {
    let arr = [...this.state.helpers];
    let res = arr.sort((a, b) => {
      if (a.rate > b.rate) return -1;
      if (a.rate < b.rate) return 1;
      else return 0;
    });
    this.setState({
      helpers: res,
      active1: !this.state.active1,
      active2: !this.state.active2
    });
  };
  sortDate = () => {
    let arr = [...this.state.helpers];
    let res = arr.sort((a, b) => {
      if (new Date(a.updatedAt).getTime() > new Date(b.updatedAt).getTime())
        return -1;
      if (new Date(a.updatedAt).getTime() < new Date(b.updatedAt).getTime())
        return 1;
      else return 0;
    });
    console.log(arr);
    console.log(res);
    this.setState({
      helpers: res,
      active1: !this.state.active1,
      active2: !this.state.active2
    });
  };
  render() {
    console.log(this.state.helpers);
    return (
      <div>
        <Navbar />
        <div className="companies">
          <div id="backCompany" className="searchJobs companySearch">
            <h2>In need of some extra income?</h2>
            <h4>Open our Freelance Jobs nearby</h4>
            <form className="form2" onSubmit={this.getInfo}>
              <input
                placeholder="Search by title"
                onChange={this.filteredJobs}
                type="text"
                name="name"
              />
              {/* <button className="submit" type="submit">
                Search
              </button> */}
            </form>
          </div>
          <p className="sort">
            Sort by:{" "}
            <span
              className={this.state.active1 ? "active1" : null}
              onClick={this.sortPrice}
            >
              salary
            </span>{" "}
            -{" "}
            <span
              onClick={this.sortDate}
              className={this.state.active2 ? "active2" : null}
            >
              date
            </span>
          </p>

          {this.showJobs()}
          {/* <div className="listCom">{this.showCompany()}</div> */}
        </div>
      </div>
    );
  }
}

export default JobHelper;
