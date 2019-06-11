import styled from "styled-components";
import { font } from "styles/const";
import { rem } from "polished";

const Title = styled.h1`
  font-weight: ${font.weight.boldest};
  font-size: ${props => (props.size ? rem(props.size) : rem(50))};
  font-style: italic;
  margin-bottom: ${rem(8)};
  color: #fff;
`;

export default Title;
