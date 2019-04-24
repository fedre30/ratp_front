import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import HomeContainer from "../../views/home/HomeContainer";
import MapContainer from "../../views/map/MapContainer";

class App extends Component {
  render() {
    return (
      <div>
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
