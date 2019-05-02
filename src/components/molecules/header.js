import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { colors } from "styles/const";
import { Title, SubTitle, Icon } from "components/atoms";

const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${rem(126)};
  padding: ${rem(14)} ${rem(40)};
  background: ${props => (props.background ? props.background : colors.primary)};
  box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
`;

const Header = ({ subTitle, background }) => (
  <WrapperHeader>
    <div>
      <Title size={24}>Tube.</Title>
      {subTitle && <SubTitle italic>Transport urbains pour les besoins environnementaux </SubTitle>}
    </div>
    <Icon icon="ratp" color="#fff" style={{ width: rem(40), height: rem(50) }} />
  </WrapperHeader>
);

export default Header;
