import CompanyRatingChart from "./charts/CompanyRatingChart";
import axios from "axios";
import React, { Component } from "react";
import '../styles/CompanyDetail.css'
import SalaryChart from './charts/SalaryChart'
import compImg from '../images/companyLogo.png'
import RatingHist from './charts/RatingHist'
import "../styles/CompanyDetail.css";
import Navbar from "./Navbar";

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
        this.getTestData();
      });
  }

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
      key: "2320d4fe6484f95e",
      name: "Demonstration (API Calls Used Up)",
      industries: null,
      images: {
        squareLogoUrl: null,
        rectangularLogoUrl: null,
        ceoPhotoUrl: null,
        headerImageUrl: null
      },
      employeeSize: null,
      globalReviewsCount: 325,
      ratings: {
        overallRating: 3.3,
        cultureAndValuesRating: 3,
        jobSecurityAndAdvancementRating: 2.6,
        managementRating: 3,
        workLifeBalanceRating: 3.2,
        compensationAndBenefitsRating: 2.4
      },
      links: {
        corporateWebsite: "https://www.subway.com/",
        twitter: null,
        instagram: "https://www.instagram.com/subway/?hl=en",
        facebook: null,
        customLinks: []
      },
      relativeCompanyPageUrl: "/cmp/Subway-in-Walmart",
      addresses: [],
      description: null,
      ratingHistogram: [43, 46, 88, 69, 79],
      revenue: null,
      ceoApproval: {
        yesCount: 96,
        noCount: 50
      },
      ceoName: null,
      salarySatisfaction: {
        yesCount: 176,
        noCount: 215
      },
      recommendFriend: {
        yesCount: 214,
        noCount: 168
      }
    };
    this.setState({
      company: testData
    });
    return 1;
  };

  getRatingData = () => {
    let data = [
      {
        name: "Compensation",
        ra: this.state.company?.ratings?.compensationAndBenefitsRating
      },
      {
        name: "Culture",
        ra: this.state.company?.ratings?.cultureAndValuesRating
      },
      {
        name: "Job Security",
        ra: this.state.company?.ratings?.jobSecurityAndAdvancementRating
      },
      {
        name: "Management",
        ra: this.state.company?.ratings?.managementRating
      },
      {
        name: "Overall",
        ra: this.state.company?.ratings?.overallRating
      }
    ];
    return data;
  };

  getRatingHistogram = () => {
    return [
      {
        name: '1 Star', ra: this.state.company?.ratingHistogram[0]
      }, 
      {
        name: '2 Star', ra: this.state.company?.ratingHistogram[1]
      }, 
      {
        name: '3 Star', ra: this.state.company?.ratingHistogram[2]
      }, 
      {
        name: '4 Star', ra: this.state.company?.ratingHistogram[3]
      }, 
      {
        name: '5 Star', ra: this.state.company?.ratingHistogram[4]
      }
    ]
  }

  getSalaryData = () => {
    return [
      {
        name: "Yes",
        ct: this.state.company?.salarySatisfaction.yesCount
      },
      {
        name: "No",
        ct: this.state.company?.salarySatisfaction?.noCount
      }
    ];
  };

  getApprovalData = () => {
    return [
      {
        name: "Yes", ct: this.state.company?.ceoApproval.yesCount
      },
      {
        name: 'No', ct: this.state.company?.ceoApproval.noCount
      }
    ]
  }

  render() {
    return (
      <div id='wholeSection'>
        <div id='comp_header'>
          <img src={this.state.company?.images?.squareLogoUrl ? this.state.company.images.squareLogoUrl : compImg} className='company_imgs' />
          <h1 id='company_name'>{this.state.company?.name}</h1>
        </div>
        <article id='desc'>
          <p>{this.state.company?.description?.unescapeText}</p>
        </article>
        <div id='graphs'>
          <CompanyRatingChart data={this.getRatingData()} title='Aspect Rating' />
          <SalaryChart data={this.getSalaryData()} title='Employees Satisfied With Salary' />
        </div>
        <div id='graphs'>
          <RatingHist data={this.getRatingHistogram()} title='Overall Company Ratings' />
          <SalaryChart data={this.getApprovalData()} title='Employees Approve of CEO' />
        </div>
        <strong className='header2'>Company Links</strong>
        <div id='link_secn'>
          {this.state.company?.links?.corporateWebsite != null ?
            <a href={this.state.company?.links?.corporateWebsite}><img src='https://www.vippng.com/png/full/519-5191632_transparent-background-website-icon.png' /></a>
            :
            'No website provided'
          }
          {this.state.company?.links?.twitter != null ?
            <a href={this.state.company?.links?.twitter}><img src='https://www.transparentpng.com/thumb/twitter/twitter-bird-logo-pictures-0.png' /></a>
            :
            ''
          }
          {this.state.company?.links?.instagram != null ?
            <a href={this.state.company?.links?.instagram}><img src='https://pluspng.com/img-png/instagram-png-instagram-png-icon-1024.png' /></a>
            :
            ''
          }
          {this.state.company?.links?.facebook != null ?
            <a href={this.state.company?.links?.facebook}><img src='https://image.flaticon.com/icons/png/512/124/124010.png' /></a>
            :
            ''
          }
        </div>
      </div>
    );
  }
}
export default CompanyDetail;

/*
{
  "key": "6e7b40121fbb5e2f",
  "name": "Apple",
  "industries": [
    {
      "key": "Iv1_COMPUTERS_AND_ELECTRONICS",
      "name": "Computers and Electronics"
    }
  ],
  "images": {
    "squareLogoUrl": "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/55b3b8bf1ce31a60cff6bf0ff59f94b4",
    "rectangularLogoUrl": "https://d2q79iu7y748jz.cloudfront.net/s/_logo/2a5877f042945ae8070ebb29251b1920",
    "ceoPhotoUrl": "https://d2q79iu7y748jz.cloudfront.net/s/_ceophoto/8c425fed2cc5a31484f9d579b2564125",
    "headerImageUrl": "https://d2q79iu7y748jz.cloudfront.net/s/_headerimage/4611668065cfd61e39abefa3d172643a"
  },
  "employeeSize": {
    "key": "ERv1_10000_PLUS",
    "name": "10,000+"
  },
  "globalReviewsCount": 9751,
  "ratings": {
    "overallRating": 4.2,
    "cultureAndValuesRating": 4.1,
    "jobSecurityAndAdvancementRating": 3.7,
    "managementRating": 3.7,
    "workLifeBalanceRating": 3.8,
    "compensationAndBenefitsRating": 4.1
  },
  "links": {
    "corporateWebsite": "http://www.apple.com/jobs",
    "twitter": "https://twitter.com/apple",
    "instagram": null,
    "facebook": "https://www.facebook.com/apple/",
    "customLinks": []
  },
  "relativeCompanyPageUrl": "/cmp/Apple",
  "addresses": [
    {
      "text": "Cupertino, California, United States",
      "unescapeText": "Cupertino, California, United States"
    }
  ],
  "description": {
    "text": "This is where you can do the best work of your life.&nbsp;Where you&rsquo;ll join some of the world&rsquo;s smartest, most innovative people to create amazing products and experiences. Where your work can make a difference in people&rsquo;s lives. Including your own.",
    "unescapeText": "This is where you can do the best work of your life. Where you’ll join some of the world’s smartest, most innovative people to create amazing products and experiences. Where your work can make a difference in people’s lives. Including your own."
  },
  "ratingHistogram": [
    309,
    425,
    1388,
    2832,
    4797
  ],
  "revenue": {
    "key": "RRv1_OVER_10B",
    "name": "more than $10B (USD)"
  },
  "ceoApproval": {
    "yesCount": 3860,
    "noCount": 523
  },
  "ceoName": "Tim Cook",
  "salarySatisfaction": {
    "yesCount": 5099,
    "noCount": 2103
  },
  "recommendFriend": {
    "yesCount": 6346,
    "noCount": 1153
  }
}
*/

