import React, { Component } from "react";
import axios from "axios";
import "../styles/jobs.css";
import { Link } from "react-router-dom";
import JobDetail from './JobDetail'
// const axios = require("axios");

class Jobs extends Component {
  state = {
    jobs: [],
    title: "",
    location: "",
    radius: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };
  getInfo = e => {
    e.preventDefault();
    axios({
      method: "GET",
      url: "https://indeed-com.p.rapidapi.com/search/jobs",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "indeed-com.p.rapidapi.com",
        "x-rapidapi-key": "520b2c9402mshf46439b682e852dp1733d4jsn81c2c3d744d0",
        useQueryString: true
      },
      params: {
        sort: "relevance",
        location: this.state.location,
        offset: "0",
        query: this.state.title,
        radius: "25"
      }
    })
      .then(response => {
        console.log(response.data.results);
        this.setState({
          jobs: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  showJobs = () => {
    return this.state.jobs.map((job, i) => {
      return (
        <div key={i} className="eachJob">
          <Link to={`/jobs/${job.jobkey}`}>
            <h3>{job.jobtitle}</h3>
          </Link>
          <p>{job.company}</p>
          <p className="location">{job.formattedLocation}</p>
          <p className="days">{job.formattedRelativeTime}</p>
          <button id='expand_btn' onClick={() => this.setState({currJob: job})}>Expand</button>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="jobs">
        <div className="searchJobs">
          <h2>Search for your next job</h2>
          <form className="form1" onSubmit={this.getInfo}>
            <label>Job Title</label>
            <input
              placeholder="Search by title"
              onChange={this.handleChange}
              type="text"
              name="title"
            />

            <label id="labelLoc">Location</label>
            <input
              placeholder="City, state or zip code"
              onChange={this.handleChange}
              type="text"
              name="location"
            />

            {/* <label>Radius</label>
            <input onChange={this.handleChange} type="number" name="radius" />
            <br /> */}
            <br />
            <button className="submit" type="submit">
              Find Jobs
            </button>
          </form>
        </div>
        <div className='jobs-list-sbs'>
          <div className="jobsList">
            <h3>Based on your request, we have found top 10 best results</h3>
            {this.showJobs()}
          </div>
          <JobDetail currJob={this.state.currJob} />
        </div>
      </div>
    );
  }
}

export default Jobs;
