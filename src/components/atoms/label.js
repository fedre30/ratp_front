import styled from "styled-components";
import { rem } from "polished";
import { colors, font } from "styles/const";

const Label = styled.p`
  font-size: ${rem(13)};
  margin-bottom: ${rem(15)};
  color: ${colors.primary};
  font-weight: ${font.weight.bold};
`;

export default Label;
