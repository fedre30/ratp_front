import styled from "styled-components";
import { font } from "styles/const";
import { rem } from "polished";

const Title = styled.h1`
  font-weight: ${font.weight.boldest};
  font-size: ${rem(50)};
  font-style: italic;
  color: #fff;
`;
export default Title;
