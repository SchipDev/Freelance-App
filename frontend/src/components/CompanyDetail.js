import CompanyRatingChart from "./charts/CompanyRatingChart";
import axios from "axios";
import React, { Component } from "react";
import '../styles/CompanyDetail.css'
import SalaryChart from './charts/SalaryChart'
import compImg from '../images/companyLogo.png'



class CompanyDetail extends Component {
  state = {};
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  componentDidMount() {
    axios({
      // method: "GET",
      // url: `https://indeed-com.p.rapidapi.com/get/company/${this.props?.match?.params?.key}`,
      // headers: {
      //   "content-type": "application/octet-stream",
      //   "x-rapidapi-host": "indeed-com.p.rapidapi.com",
      //   "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
      //   useQueryString: true
      // }
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          company: response.data
        });
      })
      .catch(error => {
        this.getTestData()
      });
  };





  /*
ratings:
compensationAndBenefitsRating: 2.4
cultureAndValuesRating: 3
jobSecurityAndAdvancementRating: 2.6
managementRating: 3
overallRating: 3.3
workLifeBalanceRating: 3.2
*/


  getTestData = () => {
    let testData = {
      "key": "2320d4fe6484f95e",
      "name": "Demonstration (API Calls Used Up)",
      "industries": null,
      "images": {
        "squareLogoUrl": null,
        "rectangularLogoUrl": null,
        "ceoPhotoUrl": null,
        "headerImageUrl": null
      },
      "employeeSize": null,
      "globalReviewsCount": 325,
      "ratings": {
        "overallRating": 3.3,
        "cultureAndValuesRating": 3,
        "jobSecurityAndAdvancementRating": 2.6,
        "managementRating": 3,
        "workLifeBalanceRating": 3.2,
        "compensationAndBenefitsRating": 2.4
      },
      "links": {
        "corporateWebsite": 'https://www.subway.com/',
        "twitter": null,
        "instagram": 'https://www.instagram.com/subway/?hl=en',
        "facebook": null,
        "customLinks": []
      },
      "relativeCompanyPageUrl": "/cmp/Subway-in-Walmart",
      "addresses": [],
      "description": null,
      "ratingHistogram": [
        43,
        46,
        88,
        69,
        79
      ],
      "revenue": null,
      "ceoApproval": {
        "yesCount": 96,
        "noCount": 50
      },
      "ceoName": null,
      "salarySatisfaction": {
        "yesCount": 176,
        "noCount": 215
      },
      "recommendFriend": {
        "yesCount": 214,
        "noCount": 168
      }
    }
    this.setState({
      company: testData
    })
    return 1
  }


  getRatingData = () => {
    let data = [
      {
        name: 'Compensation', ra: this.state.company?.ratings?.compensationAndBenefitsRating
      },
      {
        name: 'Culture', ra: this.state.company?.ratings?.cultureAndValuesRating
      },
      {
        name: 'Job Security', ra: this.state.company?.ratings?.jobSecurityAndAdvancementRating
      },
      {
        name: 'Management', ra: this.state.company?.ratings?.managementRating
      },
      {
        name: 'Overall', ra: this.state.company?.ratings?.overallRating
      }
    ]
    return data
  }

  getSalaryData = () => {
    return [
      {
        name: "Yes", ct: this.state.company?.salarySatisfaction.yesCount
      },
      {
        name: 'No', ct: this.state.company?.salarySatisfaction?.noCount
      }
    ]
  }

  getLinksList = () => {
    let result = []
    if (this.state.company?.links?.corperateWebsite == null) {
      console.log(null)
    }
    else {
      console.log(this.state.company?.links?.corperateWebsite)
    }
  }


  render() {
    return (
      <div id='wholeSection'>
        <div id='comp_header'>
          <img src={compImg} className='company_imgs' />
          <h1 id='company_name'>{this.state.company?.name}</h1>
        </div>
        <div id='graphs'>
          <CompanyRatingChart data={this.getRatingData()} />
          <SalaryChart data={this.getSalaryData()} />
        </div>
        <strong className='header2'>Company Links</strong>
        <div id='link_secn'>
          {this.state.company?.links?.corporateWebsite != null ?
            <a href={this.state.company?.links?.corporateWebsite}>Website</a>
            :
            'No website provided'
          }
          {this.state.company?.links?.twitter != null ?
            <a href={this.state.company?.links?.twitter} classname='weblink-btn'>Twitter</a>
            :
            ''
          }
          {this.state.company?.links?.instagram != null ?
            <a href={this.state.company?.links?.instagram} classname='weblink-btn'>Instagram</a>
            :
            ''
          }
          {this.state.company?.links?.facebook != null ?
            <a href={this.state.company?.links?.facebook} classname='weblink-btn'>Facebook</a>
            :
            ''
          }
        </div>
      </div>
    );
  }
}
export default CompanyDetail;

