import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Jobs from "./components/Jobs";
import Companies from "./components/Companies";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import GoogleAuth from "./components/auth/GoogleAuth";
import CompanyDetail from './components/CompanyDetail'

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route exact path="/jobs" render={props => <Jobs {...props} />} />
          <Route
            exact
            path="/companies"
            render={props => <Companies {...props} />}
          />
          <Route
            exact
            path="/sign-up"
            render={props => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/log-in"
            render={props => <LogIn {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/google-signup"
            render={props => <GoogleAuth {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/companies/details"
            render={props => <CompanyDetail {...props} setUser={this.setUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Main;
