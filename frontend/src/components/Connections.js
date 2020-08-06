import actions from "../services/index";
import React, { Component } from "react";

class Connections extends Component {
  //   const [connectionsList, setCL] = useState([]);
  state = {
    connectionsList: [],
    showE: [],
    showEmail2: [],
    message: "",

    formSubmitted: false
  };

  static sender = "jobhunterfromironhack@gmail.com";
  handleSubmit3 = (email, event) => {
    event.preventDefault();
    const template = "jobhunter";
    let showE = [...this.state.showE];
    let showEmail2 = [...this.state.showEmail2];
    console.log(process.env.REACT_APP_EMAILJS_USERID);
    console.log(this.state.value);
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
  getEmail = email => {};
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
        console.log(res);
      })
      // Handle errors here however you like
      .catch(err => console.error("Failed to send feedback. Error: ", err));
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  componentDidMount() {
    actions.getConnections(this.props.userId).then(res =>
      this.setState({
        connectionsList: res.data.connections
      })
    );
  }
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
  displayConnections = () => {
    return this.state.connectionsList.map((user, i) => {
      let i2 = this.state.showE.indexOf(user.email);
      let emailForm = this.state.showEmail2[i2];
      return (
        <div>
          <div key={i} id="showUser" className="eachJob">
            <div className="data-logo info3">
              {user.image == null ? (
                <img
                  id="borderImg"
                  // onClick={this.showLoad}
                  className="about-logo"
                  src={require("../images/userPic.png")}
                  alt="profileImage"
                />
              ) : (
                <img
                  id="borderImg"
                  // onClick={this.showLoad}
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
                      <input
                        type="submit"
                        value="Send"
                        className="emailButton"
                      />
                    </div>
                  </form>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      );
    });
  };
  render() {
    return <div>{this.displayConnections()}</div>;
  }
}
export default Connections;
