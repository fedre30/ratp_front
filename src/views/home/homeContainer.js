import React from "react";
import { withRouter } from "react-router-dom";
import Home from "./home";

class HomeContainer extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return <Home />;
  }
}
export default withRouter(HomeContainer);
