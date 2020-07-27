import React, { Component } from "react";
import "../styles/jobs.css";

class JobDetail extends Component {
  render() {
    console.log(this.props.currJob[0]);
    return (
      <div className="singleJob">
        <h3>{this.props.currJob[0].jobtitle}</h3>
        <p className="loc">
          {this.props.currJob[0].company} &#xB7;{" "}
          {this.props.currJob[0].formattedLocation},
          {this.props.currJob[0].country}
        </p>
        <p id="posted">Posted {this.props.currJob[0].formattedRelativeTime}</p>
        <div id="snippet">{this.props.currJob[0].snippet}</div>
        <a href={this.props.currJob[0].url} target="_blank">
          Get more details
        </a>
      </div>
    );
  }
}

export default JobDetail;
