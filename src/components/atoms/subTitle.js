import styled from "styled-components";
import { font } from "styles/const";
import { rem } from "polished";

const SubTitle = styled.h2`
  font-weight: ${font.weight.base};
  font-size: ${rem(13)};
  font-style: italic;
  margin-bottom: ${rem(8)};
  color: #fff;
`;

export default SubTitle;
