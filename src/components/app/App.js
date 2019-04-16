import React, { Component } from "react";
import { ResetGlobalStyle } from "styles/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "../../views/home/HomeContainer";

class App extends Component {
  render() {
    return (
      <div>
        <ResetGlobalStyle />
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
