import React from "react";
import { withRouter } from "react-router-dom";

import StationVue from "./StationVue";
import { Header } from "components/molecules";

class StationContainer extends React.Component {
  state = {};
  componentDidMount() {}
  render() {
    const { history } = this.props;
    return (
      <>
        <Header subTitle history={history} />
        <StationVue />
      </>
    );
  }
}
export default withRouter(StationContainer);
