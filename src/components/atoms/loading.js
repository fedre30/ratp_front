import React from "react";
import { rem } from "polished";
import styled from "styled-components";
import "../../../node_modules/font-awesome/scss/font-awesome.scss";

const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${rem(600)};
`;

const Loading = () => (
  <LoaderContainer>
    <div
      style={{
        maxWidth: "590px",
      }}
    >
      <i
        className="fa fa-refresh fa-spin"
        style={{
          fontSize: rem(100),
        }}
      />{" "}
    </div>{" "}
  </LoaderContainer>
);

export default Loading;
