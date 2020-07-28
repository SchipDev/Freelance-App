import React, { Component } from "react";
import axios from "axios";
import "../styles/jobs.css";
import { Link } from "react-router-dom";
import JobDetail from "./JobDetail";
import jobs from "./jobs.json";
import detailJob from "./detailJob.json";
// const axios = require("axios");

class Jobs extends Component {
  state = {
    // jobs: jobs,
    // currJob: detailJob,
    jobs: [],
    title: "",
    location: "",
    radius: "",
    showHeader: false
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  toggleForm = () => {
    this.setState({
      showHeader: !this.state.showHeader
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
        "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
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
          jobs: response.data.results,
          showHeader: true
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
          <button
            id="expand_btn"
            onClick={async () => {
              await axios({
                method: "GET",
                url: `https://indeed-com.p.rapidapi.com/get/job/${job.jobkey}`,
                headers: {
                  "content-type": "application/octet-stream",
                  "x-rapidapi-host": "indeed-com.p.rapidapi.com",
                  "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
                  useQueryString: true
                }
              })
                .then(response => {
                  console.log(response);
                  this.setState({
                    currJob: response.data.results
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }}
          >
            Expand
          </button>
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
        {this.state.showHeader ? (
          <div className="jobs-list-sbs">
            <div className="jobsList">
              <h3>Based on your request, we have found top 10 best results</h3>

              {this.showJobs()}
            </div>
            {this.state.currJob !== undefined ? (
              <div className="jobDeatail">
                <JobDetail currJob={this.state.currJob} />
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="emptySpace1">
            <img src={require("../images/search.png")} alt="search" />
          </div>
        )}
      </div>
    );
  }
}

export default Jobs;
