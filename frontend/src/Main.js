import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";
import Landing from "./components/Landing";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={props => <Landing {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default Main;
