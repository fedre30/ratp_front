import styled from "styled-components";
import { rem } from "polished";

import { colors } from "styles/const";

const Input = styled.input`
  border: none;
  font-size: ${rem(16)};
  font-family: "roboto";

  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.6;
    color: ${colors.primary};
  }
`;

export default Input;
