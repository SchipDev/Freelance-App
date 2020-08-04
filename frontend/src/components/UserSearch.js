import React, { Component } from "react";
import actions from "../services/index";

class UserSearch extends Component {
  state = {
    results: "nsy",
    lastSearch: ""
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
      return <div>No Results For {this.state.lastSearch}</div>;
    }
    return this.state.results.map(user => {
      return (
        <div>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          <p>{user.jobTitle}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitJob}>
          <input
            onChange={this.handleChange}
            type="text"
            name="job"
            placeholder="e.q. John Smith"
          />
          <input type="submit" />
        </form>

        <div>
          {this.state.results != "nsy"
            ? this.displayResults()
            : "Search for people by their job title or name. "}
        </div>
      </div>
    );
  }
}

export default UserSearch;
