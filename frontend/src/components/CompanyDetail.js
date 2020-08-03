import CompanyRatingChart from "./charts/CompanyRatingChart";
import axios from "axios";
import React, { Component } from "react";
import "../styles/CompanyDetail.css";
import SalaryChart from "./charts/SalaryChart";
import compImg from "../images/companyLogo.png";
import compHeader from "../images/company-front.png";
import RatingHist from "./charts/RatingHist";
import "../styles/CompanyDetail.css";
import Navbar from "./Navbar";
import apple from "./apple.json";
import data from "./ReviewData.json";

class CompanyDetail extends Component {
  state = {
    reviewData: "",
    isShowingReviews: false
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: `https://indeed-com.p.rapidapi.com/get/company/${this.props?.match?.params?.key}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "indeed-com.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
        useQueryString: true
      }
    })
      .then(response => {
        this.setState({
          company: response.data
          //   company: apple
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
      name: "Name",
      industries: null,
      images: {
        squareLogoUrl:
          "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/55b3b8bf1ce31a60cff6bf0ff59f94b4",
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
      description: {
        unescapeText:
          "This is where you can do the best work of your life. Where you’ll join some of the world’s smartest, most innovative people to create amazing products and experiences. Where your work can make a difference in people’s lives. Including your own."
      },
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
  };

  getReviewTestData = () => {
    this.setState({
      reviewData: data.data.reviews,
      isShowingReviews: !this.state.isShowingReviews
    });
    console.log(this.state.reviewData);
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
        name: "1 Star",
        ra: this.state.company?.ratingHistogram[0]
      },
      {
        name: "2 Star",
        ra: this.state.company?.ratingHistogram[1]
      },
      {
        name: "3 Star",
        ra: this.state.company?.ratingHistogram[2]
      },
      {
        name: "4 Star",
        ra: this.state.company?.ratingHistogram[3]
      },
      {
        name: "5 Star",
        ra: this.state.company?.ratingHistogram[4]
      }
    ];
  };

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
        name: "Yes",
        ct: this.state.company?.ceoApproval.yesCount
      },
      {
        name: "No",
        ct: this.state.company?.ceoApproval.noCount
      }
    ];
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
  getCompanyReview = () => {
    if (!this.state.isShowingReviews) {
      axios({
        method: "GET",
        url:
          "https://indeed-com.p.rapidapi.com/get/company/eacc908d242186c8/reviews",
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "indeed-com.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
          useQueryString: true
        },
        params: {
          offset: "0"
        }
      })
        .then(response => {
          console.log("REVIEWS");
          console.log(response);
          this.setState({
            reviewData: response.data.reviews,
            isShowingReviews: !this.state.isShowingReviews
          });
        })
        .catch(error => {
          this.getReviewTestData();
        });
    } else {
      this.setState({
        isShowingReviews: !this.state.isShowingReviews
      });
    }
  };

  displayReviews = () => {
    return this.state.reviewData.map((review, ind) => {
      return (
        <div className="reviewsAll">
          <p>{this.stars(review.overallRating)}</p>
          <strong>{review.normalizedJobTitle} says:</strong>
          <p id="textArea">{review.text}</p>
          <div>Review created on {review.dateCreated.substring(0, 7)}</div>
        </div>
      );
    });
  };

  render() {
    return (
      <div id="allDetail">
        <Navbar />
        <div id="wholeSection">
          <img
            id="headerImage"
            src={
              this.state.company?.images?.headerImageUrl
                ? this.state.company.images.headerImageUrl
                : compHeader
            }
            className="company_imgs"
          />
          <div id="comp_header">
            <img
              src={
                this.state.company?.images?.squareLogoUrl
                  ? this.state.company.images.squareLogoUrl
                  : compImg
              }
              className="company_imgs"
            />
            <h1 id="company_name">{this.state.company?.name}</h1>
          </div>
          <article id="desc">
            <p>{this.state.company?.description?.unescapeText}</p>
          </article>
          <p id="review" onClick={this.getCompanyReview}>
            See Company Reviews
          </p>
          <div className="review3">
            {this.state.isShowingReviews ? this.displayReviews() : ""}
          </div>
          <div className="graphsAll">
            <div className="graphs one">
              <CompanyRatingChart
                data={this.getRatingData()}
                title="Aspect Rating"
              />
              <SalaryChart
                data={this.getSalaryData()}
                title="Employees Satisfied With Salary"
              />
            </div>
            <div className="graphs two">
              <RatingHist
                data={this.getRatingHistogram()}
                title="Overall Company Ratings"
              />
              <SalaryChart
                data={this.getApprovalData()}
                title="Employees Approve of CEO"
              />
            </div>
          </div>

          <strong className="header2">Company Links</strong>
          <div id="link_secn">
            {this.state.company?.links?.corporateWebsite != null ? (
              <a href={this.state.company?.links?.corporateWebsite}>
                <img src="https://www.vippng.com/png/full/519-5191632_transparent-background-website-icon.png" />
              </a>
            ) : (
              "No website provided"
            )}
            {this.state.company?.links?.twitter != null ? (
              <a href={this.state.company?.links?.twitter}>
                <img src="https://www.transparentpng.com/thumb/twitter/twitter-bird-logo-pictures-0.png" />
              </a>
            ) : (
              ""
            )}
            {this.state.company?.links?.instagram != null ? (
              <a href={this.state.company?.links?.instagram}>
                <img src="https://pluspng.com/img-png/instagram-png-instagram-png-icon-1024.png" />
              </a>
            ) : (
              ""
            )}
            {this.state.company?.links?.facebook != null ? (
              <a href={this.state.company?.links?.facebook}>
                <img src="https://image.flaticon.com/icons/png/512/124/124010.png" />
              </a>
            ) : (
              ""
            )}
          </div>
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

/*
{
  "data": {
    "pageInfo": {
      "hasNextPage": true,
      "totalCount": 500
    },
    "reviews": [
      {
        "overallRating": 5,
        "title": "Empresa boa",
        "dateCreated": "2020-07-30T01:03:56.358Z",
        "normalizedJobTitle": "Conferente de Mercadoria",
        "rawJobTitle": "conferente de mercadorias",
        "rawLocation": "Betim, MG",
        "text": "Empresa Boa que da ótimas oportunidades de crescimento",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 5,
        "title": "Productive with new changes",
        "dateCreated": "2020-07-30T00:36:37.486Z",
        "normalizedJobTitle": "Department Manager",
        "rawJobTitle": "Department Manager",
        "rawLocation": "Richland, WA",
        "text": "I have worked for Wal-Mart for 5 years, first being hired as a Cart Pusher.  As the years went by, I have transferred to multiple departments and eventually promoted within the company.  This company has always allowed opportunities for me, and management was very generous about shift flexibility.  ",
        "pros": "1 Hour Lunches, Benefits, Shift Flexibility",
        "cons": "Picking favorites, lack of displinary measures",
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 3,
        "title": "Current Position Review",
        "dateCreated": "2020-07-30T00:30:07.172Z",
        "normalizedJobTitle": "Money Center Clerk",
        "rawJobTitle": "Money Center Associate & Cashier",
        "rawLocation": "Glen Allen, VA",
        "text": "I enjoy the work that I perform serving customers at the service desk and the people I work with at Walmart but the hours are not consistent. I would prefer to have one full-time job that meets my needs verses working at Walmart and a parttime jobs to meet my financial needs.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 2,
        "title": "Life has a curve ball and you can’t dodge it.",
        "dateCreated": "2020-07-30T00:11:13.936Z",
        "normalizedJobTitle": "Cashier",
        "rawJobTitle": "Cashier",
        "rawLocation": "Huntsville, AL",
        "text": "Life has a curve ball and you can’t dodge it. It’s like a saying when you think life is going to perfect and pineapples on the beach but in reality it not. Different jobs that we work have a meaning, sometimes bad and sometimes good.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 3,
        "title": "inventoery",
        "dateCreated": "2020-07-30T00:04:55.895Z",
        "normalizedJobTitle": "Inventory Specialist",
        "rawJobTitle": "Inventory Specialist",
        "rawLocation": "Fresno, CA",
        "text": "good starting work place to start working different position to work and move up with fear benefits and management lots of customer service and gives you a good house keeping skill.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 5,
        "title": "The energy",
        "dateCreated": "2020-07-29T23:43:04.357Z",
        "normalizedJobTitle": "Cart Attendant",
        "rawJobTitle": "Cart Pusher",
        "rawLocation": "Ponce Municipio, PR",
        "text": "It feels like its alive and it feels like a really, strong and united family. The company helps its associates with a lot of things like a really great healthcare plan.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 4,
        "title": "Great place, bad management.",
        "dateCreated": "2020-07-29T23:32:56.424Z",
        "normalizedJobTitle": "Associate",
        "rawJobTitle": "Wal-Mart Associate",
        "rawLocation": "Cleveland, OH",
        "text": "It was a great place to work fast paced and easy work, management had a lack of communication and would not help me out with my work/school life balance.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 5,
        "title": "Enjoyed working there, it was enjoyable",
        "dateCreated": "2020-07-29T23:32:26.387Z",
        "normalizedJobTitle": "Merchandiser",
        "rawJobTitle": "Merchandiser",
        "rawLocation": "Delray Beach, FL",
        "text": "I was hired temporary to help from the Coronavirus situation.\r\nWorked filling shelves in the Liquor and produce departments. . All people I was associated with were nice and friendly.",
        "pros": null,
        "cons": null,
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 3,
        "title": "As expected",
        "dateCreated": "2020-07-29T23:31:16.182Z",
        "normalizedJobTitle": "Sales Associate",
        "rawJobTitle": "Sales Associate",
        "rawLocation": "Denver, NC",
        "text": "During my time at Walmart, I dealt with a supervisor who often spent more time on her phone than anything else. It was up to her workers to perform her job which became an issue when I realized how often I was stepping into her role and not receiving the same pay. I was told I would be hired as a full-time associate and, despite much praise toward my work ethic, they strung me along toward the holiday season. I made the decision that I would look elsewhere for my career",
        "pros": "Typically there are plenty of opportunities to move up.",
        "cons": "Schedule is not flexible",
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      },
      {
        "overallRating": 3,
        "title": "Work",
        "dateCreated": "2020-07-29T23:22:37.012Z",
        "normalizedJobTitle": "Grocery Associate",
        "rawJobTitle": "Online Grocery Pickup",
        "rawLocation": "Springville",
        "text": "Good company to work for. Some days are laid back while most can be very stressful. Pay isn't bad considering what you're doing. If you can work through irate and demanding customers, it's not that bad.",
        "pros": "Employees are pretty laid back for the most part. Pay is alright.",
        "cons": "Irate and demanding customers. Stressful at times.",
        "helpfulVotesCount": null,
        "unhelpfulVotesCount": null,
        "comments": []
      }
    ]
  },
  "status": 200,
  "statusText": "OK",
  "headers": {
    "access-control-allow-credentials": "true",
    "access-control-allow-origin": "http://localhost:3000",
    "alt-svc": "h3-29=\":443\"; ma=2592000,h3-27=\":443\"; ma=2592000,h3-T050=\":443\"; ma=2592000,h3-Q050=\":443\"; ma=2592000,h3-Q046=\":443\"; ma=2592000,h3-Q043=\":443\"; ma=2592000,quic=\":443\"; ma=2592000; v=\"46,43\"",
    "cache-control": "private",
    "connection": "keep-alive",
    "content-encoding": "gzip",
    "content-length": "2170",
    "content-type": "application/json; charset=utf-8",
    "date": "Thu, 30 Jul 2020 18:23:53 GMT",
    "function-execution-id": "2bd6ecz9h9jd",
    "server": "RapidAPI-1.1.24",
    "x-cloud-trace-context": "12c2e39e557df4d8ab3fa464da8ad763;o=1",
    "x-powered-by": "Express",
    "x-rapidapi-region": "AWS - us-east-1",
    "x-rapidapi-version": "1.1.24",
    "x-ratelimit-requests-limit": "100",
    "x-ratelimit-requests-remaining": "95"
  },
  "config": {
    "url": "https://indeed-com.p.rapidapi.com/get/company/eacc908d242186c8/reviews",
    "method": "get",
    "params": {
      "offset": "0"
    },
    "headers": {
      "Accept": "application/json, text/plain, * /*",
      "x-rapidapi-host": "indeed-com.p.rapidapi.com",
      "x-rapidapi-key": "e14d7b4a61mshaf4d68517150093p1d2b11jsnaa5e4d29c6bc",
      "useQueryString": true
    },
    "transformRequest": [
      null
    ],
    "transformResponse": [
      null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1
  },
  "request": {}
}
*/
