import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MeetingAll from "./components/Meetings/index";
import Meeting from "./components/Home/index";
import MeetingV2 from "./components/HomeV2";
import "./App.css";

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/allMeeting">
            <MeetingAll />
          </Route>
          <Route path="/v1">
            <MeetingV2 />
          </Route>
          <Route path="/">
            <Meeting />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
