import React from "react";
import { withRouter } from "react-router-dom";
import Map from "./Map";
import { Header } from "components/molecules";

class MapContainer extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    const { history } = this.props;
    return (
      <>
        <Header subTitle history={history} />
        <Map history={history} />
      </>
    );
  }
}
export default withRouter(MapContainer);
