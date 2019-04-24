import React, { Component } from "react";
import { ResetGlobalStyle } from "styles/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "../../views/home/HomeContainer";
import MapContainer from "../../views/map/MapContainer";

class App extends Component {
  render() {
    return (
      <div>
        <ResetGlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/map" component={MapContainer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
