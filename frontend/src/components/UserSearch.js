import React, { Component } from "react";
import actions from "../services/index";
import "../styles/navbar_styles/user.css";

class UserSearch extends Component {
  state = {
    results: "nsy",
    lastSearch: "",
    firstUsers: [],
    displayRes: [],
    showR: []
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmitName = e => {
    e.preventDefault();
  };

  handleSubmitJob = e => {
    e.preventDefault();
    let search;
    let queStr;
    if (this.state.job.includes(" ")) {
      search = this.state.job.split(" ");
      queStr = search.reduce((acc, val, ind) => {
        return ind == 0 ? (acc += val) : (acc += "+" + val);
      }, "");
    } else {
      queStr = this.state.job;
    }
    actions
      .searchByJobTitle(queStr)
      .then(res =>
        this.setState({ results: res.data, lastSearch: this.state.job })
      );
  };

  displayResults = () => {
    if (this.state.results.length === 0) {
      return (
        <div className="userSearch2">
          No Results For {this.state.lastSearch}
        </div>
      );
    }
    return this.state.results.map((user, i) => {
      //   this.setState({
      //     [user._id]: false
      //   });\
      let index = this.state.showR.indexOf(user._id);
      console.log(
        "52",
        this.state.displayRes,
        index,
        this.state.showR,
        this.state.displayRes[index]
      );
      let resume = this.state.displayRes[index];
      return (
        <div key={i} id="showUser" className="eachJob">
          <div onClick={() => this.showResume(user._id)} className="data-logo">
            {user.image == null ? (
              <img
                onClick={this.showLoad}
                className="about-logo"
                src={require("../images/userPic.png")}
                alt="profileImage"
              />
            ) : (
              <img
                onClick={this.showLoad}
                className="about-logo"
                src={user.image}
                alt="profileImage"
              />
            )}
          </div>
          <div className="users5">
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p>{user.jobTitle}</p>
            <div id="contact6" className="contact3">
              <img
                className="contact2"
                src={require("../images/phone.png")}
                alt="phone"
              />
              <div>{user.phoneNum}</div>
            </div>
            <div id="contact6" className="contact3">
              <img
                className="contact2"
                src={require("../images/email.png")}
                alt="email"
              />
              <div>{user.email}</div>
            </div>
          </div>
          {console.log(this.state.displayRes)}
          {index !== -1 ? (
            resume ? (
              <div className="companies" id="user_info">
                <div className="summury2">
                  <div className="closure">
                    <h3 className="headRes">Summary</h3>
                    <img
                      onClick={() => this.closeR(user._id)}
                      src={require("../images/closeButton.png")}
                      alt="close"
                    />
                  </div>
                  {this.state.displayRes[index] === undefined ? (
                    <article>Summary is not provided</article>
                  ) : (
                    <article>{this.state.displayRes[index].summary}</article>
                  )}
                </div>
                <div className="workExp1">
                  <h3 className="headRes">Work Experience</h3>
                  {this.state.displayRes === null ||
                  this.state.displayRes[index].workExperience.length == 0
                    ? "Work experience is not provided"
                    : this.state.displayRes[index].workExperience.map(work => {
                        return (
                          <div className="workExp2">
                            <div className="dateTitle">
                              <h4>{work.employer}</h4>
                              <div id="dates">
                                {work.startDate} - {work.endDate}
                              </div>
                            </div>
                            <div>
                              {" "}
                              {work.jobTitle[0].toUpperCase() +
                                work.jobTitle.slice(1)}{" "}
                            </div>
                            <article>{work.description}</article>
                          </div>
                        );
                      })}
                </div>

                <div className="skills1">
                  <h3 className="headRes">Skills</h3>
                  {this.state.displayRes === null ||
                  this.state.displayRes[index].skills.length == 0
                    ? "Skills are not provided"
                    : this.state.displayRes[index].skills.map(skill => {
                        return <li className="skillSet">{skill}</li>;
                      })}
                </div>

                <div className="edu1">
                  <h3 className="headRes">Education</h3>
                  {this.state.displayRes === null ||
                  this.state.displayRes[index].education.length == 0
                    ? "Education is not provided"
                    : this.state.displayRes[index].education.map(edu => {
                        return (
                          <div className="workExp2">
                            <div className="dateRec">
                              <h4>{edu.institute}</h4>
                              <div> {edu.date}</div>
                            </div>
                            <div>
                              <b>{edu.title}</b>
                            </div>
                            <div>{edu.recieved}</div>{" "}
                            <article>{edu.description}</article>
                          </div>
                        );
                      })}
                </div>
              </div>
            ) : (
              <div className="userSearch2">Resume has not been provided</div>
            )
          ) : (
            ""
          )}
        </div>
      );
    });
  };
  showResume = async id => {
    let showR = [...this.state.showR];
    let displayRes = [...this.state.displayRes];
    if (this.state.showR.includes(id)) {
      let index = showR.indexOf(id);
      showR.splice(index, 1);
      displayRes.splice(index, 1);
      this.setState({
        showR,
        displayRes
      });
    } else {
      const res = await actions.displayRes(id);
      console.log(res);
      showR.push(id);
      displayRes.push(res.data[0]);
      this.setState({
        showR,
        displayRes
      });
    }
  };
  closeR = async id => {
    let showR = [...this.state.showR];
    let displayRes = [...this.state.displayRes];

    let index = showR.indexOf(id);
    showR.splice(index, 1);
    displayRes.splice(index, 1);
    this.setState({
      showR,
      displayRes
    });
  };
  render() {
    return (
      <div className="allUsers">
        <form className="form2" onSubmit={this.handleSubmitJob}>
          <input
            onChange={this.handleChange}
            type="text"
            name="job"
            placeholder="e.q. John Smith"
          />
          <input id="findUser" className="submit" type="submit" />
        </form>

        <div>
          {this.state.results != "nsy" ? (
            this.displayResults()
          ) : (
            <p className="userSearch2">
              Search for people by their job title or name
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default UserSearch;
