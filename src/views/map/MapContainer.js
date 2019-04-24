import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map";

class MapContainer extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    return <Map />;
  }
}
export default withRouter(MapContainer);
