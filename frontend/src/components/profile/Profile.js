import React, { Component } from "react";
import Navbar from "../Navbar";
import "../../styles/navbar_styles/profile.css";
import actions from "../../services/index";
import axios from "axios";

class Profile extends Component {
  state = {
    user: { ...this.props.user },
    userResume: {},
    isShowingAddWE: false,
    addWEObj: {
      jobTitle: "",
      startDate: "",
      endDate: "",
      employer: "",
      description: ""
    },
    isShowingAddSkill: false,
    isShowingAddEdu: false,
    newEduObj: {
      title: "",
      date: "",
      recieved: "",
      institute: "",
      description: ""
    }
  };

  componentDidMount() {
    if (!this.props.user.user.email) {
      this.props.history.push("/log-in");
    }
    if (this.props.user.user.hasResume) {
      axios
        .get(`http://localhost:5000/get-resume/${this.props.user.user._id}`)
        .then(res => this.setState({ userResume: res.data[0] }));
    }
  }

  compileResume = () => {
    let resume = {
      userId: this.props.user.user._id,
      summary: this.state.summary
    };
    return resume;
  };

  //----------------------------------------------------------------------------------------------------

  handleSubmitNewResume = e => {
    e.preventDefault();
    console.log(this.props);
    let resume = this.compileResume();
    actions.postResume(resume).then(res => {
      this.setState({
        userResume: res.data.resume
      });
      this.props.setUser(res.data.user);
    });
  };

  handleSubmitAddWE = e => {
    e.preventDefault();
    let workExp = { ...this.state.addWEObj };
    actions.addWorkExperience(workExp, this.state.userResume?._id).then(res =>
      this.setState({
        userResume: res.data,
        isShowingAddWE: false
      })
    );
  };

  //----------------------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------------------

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleChangeAddWE = e => {
    let newWEObj = { ...this.state.addWEObj };
    switch (e.target.name) {
      case "jobTitle":
        newWEObj.jobTitle = e.target.value;
        break;
      case "startDate":
        newWEObj.startDate = e.target.value;
        break;
      case "endDate":
        newWEObj.endDate = e.target.value;
        break;
      case "employer":
        newWEObj.employer = e.target.value;
        break;
      case "description":
        newWEObj.description = e.target.value;
        break;
    }
    this.setState({
      addWEObj: newWEObj
    });
    console.log(this.state.addWEObj);
  };

  //----------------------------------------------------------------------------------------------------

  displayCreateResume = () => {
    return (
      <div>
        <h3 className="headRes">Summary</h3>
        <form className="summary" onSubmit={this.handleSubmitNewResume}>
          <textarea
            name="summary"
            onChange={this.handleChange}
            className="input_field"
            id="textarea3"
            placeholder="A resume summary statement is a short, three- to five-sentence paragraph at the top of a resume, directly below the contact information, that introduces you to employers and sets the tone for the rest of your resume"
          />

          <input className="submitButton" type="submit" />
        </form>
      </div>
    );
  };

  displaySummary = () => {
    return (
      <div className="summury2">
        <h3 className="headRes">Summary</h3>
        <article>{this.state.userResume?.summary}</article>
      </div>
    );
  };

  //----------------------------------------------------------------------------------------------------

  displayWorkExperience = () => {
    let workExp = this.state.userResume?.workExperience?.map((we, ind) => {
      return (
        <div className="workExp2">
          <div className="dateTitle">
            <h4>{we.employer}</h4>
            <div id="dates">
              {we.startDate} - {we.endDate}
            </div>
          </div>
          <div> {we.jobTitle[0].toUpperCase() + we.jobTitle.slice(1)} </div>

          <article>{we.description}</article>
        </div>
      );
    });

    return (
      <div className="workExp1">
        <h3 className="headRes">Work Experience</h3>
        <div>{workExp}</div>
        <p
          onClick={() =>
            this.setState({ isShowingAddWE: !this.state.isShowingAddWE })
          }
        >
          ⇤Add Work Experience⇥
        </p>
        {this.state.isShowingAddWE ? (
          <form
            id="workExp"
            className="postForm"
            onSubmit={this.handleSubmitAddWE}
          >
            <label>Job Title</label>
            <input
              onChange={this.handleChangeAddWE}
              name="jobTitle"
              type="text"
              placeholder="Job Title"
              className="input_field"
            />{" "}
            <label>Company</label>
            <input
              onChange={this.handleChangeAddWE}
              name="employer"
              placeholder="Employer Name"
              className="input_field"
            />{" "}
            <label>Start Date</label>
            <input
              onChange={this.handleChangeAddWE}
              name="startDate"
              type="text"
              placeholder="MM/DD/YYYY"
              className="input_field"
            />
            <label>End Date</label>
            <input
              onChange={this.handleChangeAddWE}
              name="endDate"
              type="text"
              placeholder="MM/DD/YYYY or Present"
              className="input_field"
            />
            <label>Description</label>
            <textarea
              onChange={this.handleChangeAddWE}
              name="description"
              placeholder="Descripe your responsibillities and the skills you used "
              className="input_field"
            />
            <input type="submit" className="submitButton" />
          </form>
        ) : (
          ""
        )}
      </div>
    );
  };

  //----------------------------------------------------------------------------------------------------

  displaySkills = () => {
    let skillList = this.state.userResume?.skills?.map((skill, ind) => {
      return <li className="skillSet">{skill}</li>;
    });

    return (
      <div className="skills1">
        <h3 className="headRes">Skills</h3>
        <ul>{skillList}</ul>
        <p
          onClick={() =>
            this.setState({ isShowingAddSkill: !this.state.isShowingAddSkill })
          }
          className="addS"
        >
          ⇤Add Skill⇥
        </p>
        {this.state.isShowingAddSkill ? (
          <form className="formSkill" onSubmit={this.handleSubmitNewSkill}>
            <input
              onChange={this.handleChange}
              type="text"
              name="skillToAdd"
              placeholder="e.g.Interpersonal skills."
              id="skillInp"
              className="input_field"
            />
            <input className="submitButton skillButton" type="submit" />
          </form>
        ) : (
          ""
        )}
      </div>
    );
  };

  handleSubmitNewSkill = e => {
    e.preventDefault();
    console.log(this.state.skillToAdd);
    actions
      .addSkill({ newSkill: this.state.skillToAdd }, this.state.userResume?._id)
      .then(res => {
        this.setState({
          userResume: res.data,
          isShowingAddSkill: false
        });
      });
  };

  //----------------------------------------------------------------------------------------------------

  handleChangeAddEdu = e => {
    let eduObj = { ...this.state.newEduObj };
    switch (e.target.name) {
      case "title":
        eduObj.title = e.target.value;
        break;
      case "date":
        eduObj.date = e.target.value;
        break;
      case "recieved":
        eduObj.recieved = e.target.value;
        break;
      case "institute":
        eduObj.institute = e.target.value;
        break;
      case "description":
        eduObj.description = e.target.value;
        break;
    }
    this.setState({
      newEduObj: eduObj
    });
    console.log(this.state.newEduObj);
  };

  handleSubmitNewEdu = e => {
    e.preventDefault();
    let eduToSend = { ...this.state.newEduObj };
    console.log(eduToSend);
    actions.addEducation(eduToSend, this.state.userResume?._id).then(res => {
      this.setState({
        userResume: res.data,
        isShowingAddEdu: false
      });
    });
  };

  displayEdu = () => {
    let eduList = this.state.userResume?.education?.map((edu, ind) => {
      return (
        <div className="workExp2">
          <div className="dateRec">
            <h4>{edu.institute}</h4>
            <div> {edu.date}</div>
          </div>
          <div>
            <b>{edu.title}</b>
          </div>
          <div>{edu.recieved}</div> <article>{edu.description}</article>
        </div>
      );
    });

    return (
      <div className="edu1">
        <h3 className="headRes">Education</h3>
        <div>{eduList}</div>
        <p
          onClick={() =>
            this.setState({ isShowingAddEdu: !this.state.isShowingAddEdu })
          }
          className="addS addS2"
        >
          ⇤Add Education⇥
        </p>
        {this.state.isShowingAddEdu ? (
          <form
            id="workExp"
            className="postForm eduForm"
            onSubmit={this.handleSubmitNewEdu}
          >
            <label>School</label>
            <input
              onChange={this.handleChangeAddEdu}
              name="institute"
              type="text"
              placeholder="Ex: Boston University"
              className="input_field"
            />{" "}
            <label>Field of Study</label>
            <input
              onChange={this.handleChangeAddEdu}
              name="title"
              className="input_field"
              placeholder="Ex: Business"
            />{" "}
            <label>Dates</label>
            <input
              onChange={this.handleChangeAddEdu}
              name="date"
              type="text"
              placeholder="   MM/YYYY-MM/YYYY"
              className="input_field"
            />{" "}
            <label>Degree</label>
            <input
              onChange={this.handleChangeAddEdu}
              name="recieved"
              className="input_field"
              placeholder="Ex: Bachelor's"
            />{" "}
            <label>Activities and societies</label>
            <textarea
              onChange={this.handleChangeAddEdu}
              name="description"
              placeholder="Ex: Alpha Phi Omega, Marching Band, Volleyball"
              className="input_field"
            />{" "}
            <input className="submitButton" type="submit" />
          </form>
        ) : (
          ""
        )}
      </div>
    );
  };

  displayResume = () => {
    return (
      <div>
        {this.displaySummary()}
        {this.displayWorkExperience()}
        {this.displaySkills()}
        {this.displayEdu()}
      </div>
    );
  };

  render() {
    console.log(this.props.user.user.hasResume);
    return (
      <div>
        <Navbar />
        <div className="companies" id="user_info">
          <h1>
            {this.props.user.user.firstName} {this.props.user.user.lastName}
          </h1>
          <strong>{this.props.user.user.email}</strong>
          <strong>{this.props.user.user.phoneNum}</strong>
          {this.props.user.user.hasResume
            ? this.displayResume()
            : this.displayCreateResume()}
        </div>
      </div>
    );
  }
}

export default Profile;
