import React from "react";
import styled from "styled-components";
import { rem } from "polished";

import { Title, SubTitle, Icon } from "components/atoms";

const WrapperHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${rem(126)};
`;

const Header = ({ color, subTitle }) => (
  <WrapperHeader>
    {console.log(color)}
    <div>
      <Title>Tube.</Title>
      {subTitle && <SubTitle italic>Transport urbains pour les besoins environnementaux </SubTitle>}
    </div>
    <Icon icon="ratp" color={color ? color : "#fff"} style={{ width: rem(40), height: rem(50) }} />
  </WrapperHeader>
);

export default Header;
