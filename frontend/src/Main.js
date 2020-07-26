import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Jobs from "./components/Jobs";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
          <Route exact path="/jobs" render={props => <Jobs {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
