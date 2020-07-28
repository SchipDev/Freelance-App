import React, { Component } from "react";
import "../styles/companies.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";

class Companies extends Component {
  state = {
    companies: [],
    name: ""
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  getInfo = e => {
    e.preventDefault();
    axios({
      method: "GET",
      url: "https://indeed-com.p.rapidapi.com/search/companies",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "indeed-com.p.rapidapi.com",
        "x-rapidapi-key": "7b31e50bcfmshb2487ec82ce202cp15ee70jsn0e9be0d08aeb",
        useQueryString: true
      },
      params: {
        offset: "0",
        name: this.state.name
      }
    })
      .then(response => {
        console.log(response.data.companies);
        this.setState({
          companies: response.data.companies,
          showHeader: true
        });
      })
      .catch(error => {
        console.log(error);
      });

    //     axios({
    //       method: "GET",
    //       url:
    //         "https://indeed-com.p.rapidapi.com/get/company/eacc908d242186c8/reviews",
    //       headers: {
    //         "content-type": "application/octet-stream",
    //         "x-rapidapi-host": "indeed-com.p.rapidapi.com",
    //         "x-rapidapi-key": "7b31e50bcfmshb2487ec82ce202cp15ee70jsn0e9be0d08aeb",
    //         useQueryString: true
    //       },
    //       params: {
    //         offset: "0"
    //       }
    //     })
    //       .then(response => {
    //         console.log(response);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
  };
  showCompany = () => {
    return this.state.companies.map((company, i) => {
      return (
        <div key={i} className="eachComp">
          <Link to={`/companies/${company.key}`}>
            <h3>{company.name}</h3>
          </Link>
        </div>
      );
    });
  };
  render() {
    return (
      <div className="companies">
        <div id="backCompany" className="searchJobs companySearch">
          <h2>Find great places to work</h2>
          <h4>Get access to millions of company reviews</h4>
          <form className="form2" onSubmit={this.getInfo}>
            <input
              placeholder="Search by name"
              onChange={this.handleChange}
              type="text"
              name="name"
            />
            <button className="submit" type="submit">
              Find Companies
            </button>
          </form>
        </div>
        <div className="listCom">{this.showCompany()}</div>
      </div>
    );
  }
}

export default Companies;
