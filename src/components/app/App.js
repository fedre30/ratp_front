import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomeContainer from "../../views/home/HomeContainer";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
