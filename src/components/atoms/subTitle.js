import styled from "styled-components";
import { font } from "styles/const";
import { rem } from "polished";

const SubTitle = styled.h2`
  max-width: ${rem(640)};
  font-weight: ${font.weight.base};
  line-height: 1.25;
  font-size: ${props => (props.size ? rem(props.size) : rem(13))};
  font-weight: ${props => (props.bold ? font.weight.boldest : "inital")};
  font-style: ${props => (props.italic ? "italic" : "inital")};
  margin-bottom: ${rem(8)};
  color: #fff;
`;

export default SubTitle;
