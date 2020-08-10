import React, { Component, useRef } from "react";
import actions from "../services/index";
import "../styles/navbar_styles/user.css";
import ConnectButton from './ConnectButton'

class UserSearch extends Component {
    state = {
        job: '', 
        results: "nsy",
        lastSearch: "",
        firstUsers: [],
        displayRes: [],
        showR: [],
        showItem: true,
        message: "",
        feedback: "",
        formSubmitted: false,
        showE: [],
        showEmail2: []
    };
    //   static sender = "sender@example.com";
    static sender = "jobhunterfromironhack@gmail.com";
    //   handleChange3 = e => {
    //     this.setState({
    //       value: e.target.value
    //     });

    //     console.log("EMAIL", this.state.value);
    //   };

    handleSubmit3 = (email, event) => {
        event.preventDefault();
        const template = "jobhunter";
        let showE = [...this.state.showE];
        let showEmail2 = [...this.state.showEmail2];
        let index = showE.indexOf(email);
        showE.splice(index, 1);
        showEmail2.splice(index, 1);

        this.sendFeedback(
            template,
            //   We love you Niko!
            this.sender,
            email,
            process.env.REACT_APP_EMAILJS_USERID
        );

        this.setState({
            formSubmitted: true,
            showE,
            showEmail2
        });
    };
    getEmail = email => { };
    sendFeedback(templateId, senderEmail, receiverEmail, user) {
        window.emailjs
            .send(
                "default_service",
                templateId,
                {
                    senderEmail,
                    receiverEmail,

                    activityText: this.state.message,
                    email: this.props.user.email,
                    number: this.props.user.phoneNum,
                    firstName: this.props.user.firstName,
                    lastName: this.props.user.lastName
                },

                user
            )
            .then(res => {
                this.setState({
                    formEmailSent: true
                });
            })
            // Handle errors here however you like
            .catch(err => console.error("Failed to send feedback. Error: ", err));
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });

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
            let index = this.state.showR.indexOf(user._id);

            let i2 = this.state.showE.indexOf(user.email);
            //   console.log(
            //     "RES",
            //     i2,
            //     this.state.showE
            //     // this.state.displayRes[index]
            //   );
            let resume = this.state.displayRes[index];

            let emailForm = this.state.showEmail2[i2];
            return (
                <div key={i} id="showUser" className="eachJob">
                    <div
                        onClick={() => this.showResume(user._id)}
                        className="data-logo info3"
                    >
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <button>R</button>
                            {this.props.currUser.connections.includes(user._id) ? <button style={{backgroundColor: 'limegreen'}}>C</button> : ''}
                        </div>
                        {user.image == null ? (
                            <img
                                id="borderImg"
                                onClick={this.showLoad}
                                className="about-logo"
                                src={require("../images/userPic.png")}
                                alt="profileImage"
                            />
                        ) : (
                                <img
                                    id="borderImg"
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
                        <div
                            onClick={() => this.showEmail(user.email)}
                            id="contact6"
                            className="contact3"
                        >
                            {/* <img
                className="contact2"
                src={require("../images/email.png")}
                alt="email"
              /> */}
                            <div className="emailMe">Contact</div>
                        </div>
                        {i2 !== -1 ? (
                            emailForm ? (
                                <form
                                    className="emailSend"
                                    onSubmit={e => this.handleSubmit3(user.email, e)}
                                >
                                    <label>
                                        Email to {user.firstName} {user.lastName}
                                    </label>
                                    <textarea
                                        required
                                        name="message"
                                        onChange={this.handleChange}
                                        placeholder="Your message"
                                    />
                                    <div className="btn-group">
                                        <input type="submit" value="Send" className="emailButton" />
                                    </div>
                                </form>
                            ) : (
                                    ""
                                )
                        ) : (
                                ""
                            )}
                    </div>
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
                    {!this.props.currUser.connections.includes(user._id) ? <ConnectButton currUserId={this.props.currUser._id} utcId={user._id} setUser={this.props.setUser} /> : ''}
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
    showEmail = async id => {
        let showE = [...this.state.showE];
        let showEmail2 = [...this.state.showEmail2];

        if (this.state.showE.includes(id)) {
            let index = showE.indexOf(id);
            showE.splice(index, 1);
            showEmail2.splice(index, 1);
            this.setState({
                showE,
                showEmail2
            });
        } else {
            showE.push(id);
            showEmail2.push(id);
            this.setState({
                showE,
                showEmail2
            });
        }
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
