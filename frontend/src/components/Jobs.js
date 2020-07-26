import React, { Component } from "react";
import axios from "axios";
// const axios = require("axios");

class Jobs extends Component {
  componentDidMount() {
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
        location: "San Francisco CA 94121",
        offset: "0",
        query: "Teacher",
        radius: "100"
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <div></div>;
  }
}

export default Jobs;
