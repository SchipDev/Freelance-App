// import CompanyRatingChart from "./charts/CompanyRatingChart";
import axios from "axios";
import React, { Component } from "react";

class CompanyDetail extends Component {
  state = {};
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getInfo = e => {
    e.preventDefault();
    axios({
      method: "GET",
      url: `https://indeed-com.p.rapidapi.com/get/company/${this.props?.match?.params?.key}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "indeed-com.p.rapidapi.com",
        "x-rapidapi-key": "7b31e50bcfmshb2487ec82ce202cp15ee70jsn0e9be0d08aeb",
        useQueryString: true
      }
    })
      .then(response => {
        console.log(response);
        this.setState({
          company: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <div>Hello</div>
        {/* <CompanyRatingChart /> */}
      </div>
    );
  }
}
export default CompanyDetail;
