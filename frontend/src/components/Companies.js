import React, { Component } from "react";
import "../styles/companies.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CompanyDetail from "./CompanyDetail";
import companies from "./listCompany.json";
import Navbar from "./Navbar";

class Companies extends Component {
  state = {
    companies: companies,
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
        "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
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
  stars = rating => {
    if (rating == 0) {
      return (
        <img
          className="stars"
          src={require("../images/star0.png")}
          alt="logoOfCompany"
        />
      );
    } else if (rating > 0 && rating <= 1.4) {
      return (
        <img
          className="stars"
          src={require("../images/star1.png")}
          alt="logoOfCompany"
        />
      );
    } else if (rating > 1.4 && rating <= 2.4) {
      return (
        <img
          className="stars"
          src={require("../images/star2.png")}
          alt="logoOfCompany"
        />
      );
    } else if (rating > 2.4 && rating <= 3.4) {
      return (
        <img
          className="stars"
          src={require("../images/star3.png")}
          alt="logoOfCompany"
        />
      );
    } else if (rating > 3.4 && rating <= 4.4) {
      return (
        <img
          className="stars"
          src={require("../images/star4.png")}
          alt="logoOfCompany"
        />
      );
    } else {
      return (
        <img
          className="stars"
          src={require("../images/star5.png")}
          alt="logoOfCompany"
        />
      );
    }
  };
  showCompany = () => {
    return this.state.companies.map((company, i) => {
      return (
        <table id="eachCompany1" className="comp-table">
          <tr key={i}>
            <div className="firstRow">
              <td className="table-logo">
                <Link to={`/companies/${company.key}`}>
                  {company.images.squareLogoUrl !== null ? (
                    <img
                      src={company.images.squareLogoUrl}
                      alt="logoOfCompany"
                    />
                  ) : (
                    <img
                      src={require("../images/companyLogo.png")}
                      alt="logoOfCompany"
                    />
                  )}
                </Link>
              </td>
              <div className="rateName">
                <td className="table-data">
                  <Link to={`/companies/${company.key}`}>
                    <h3>{company.name}</h3>
                  </Link>
                </td>

                <td className="table-data rateStar">
                  <strong>{company.ratings.overallRating}</strong>
                  <div className="stars">
                    {this.stars(company.ratings.overallRating)}
                  </div>
                </td>
              </div>
            </div>
            <td className="descrip">
              {company.industries !== null ? (
                <strong> {company.industries[0].name}</strong>
              ) : (
                <strong>Data is not provided</strong>
              )}
            </td>
          </tr>
        </table>
      );
    });
  };
  render() {
    console.log(this.state.companies);
    return (
      <div>
        <Navbar />
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
      </div>
    );
  }
}

export default Companies;
