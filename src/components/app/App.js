import React, { Component } from "react";
import { ResetGlobalStyle } from "styles/index";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import MapContainer from "views/map/MapContainer";
import HomeContainer from "views/home/HomeContainer";
import StationContainer from "views/station-vue/StationVueContainer";

class App extends Component {
  history = createBrowserHistory();

  render() {
    return (
      <div>
        <ResetGlobalStyle />
        <Router history={this.history}>
          <Switch>
            <Route exact path="/" component={HomeContainer} />{" "}
            <Route exact path="/map" component={MapContainer} />{" "}
            <Route path="/station/:id" component={StationContainer} />{" "}
          </Switch>{" "}
        </Router>{" "}
      </div>
    );
  }
}

export default App;
