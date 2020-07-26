import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Jobs from "./components/Jobs";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import GoogleAuth from './components/auth/GoogleAuth'

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route exact path="/jobs" render={props => <Jobs {...props} />} />
          <Route exact path="/sign-up" render={props => <SignUp {...props} setUser={this.setUser} />} />
          <Route exact path="/log-in" render={props => <LogIn {...props} setUser={this.setUser} />} />
          <Route exact path="/google-signup" render={props => <GoogleAuth {...props} setUser={this.setUser} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
