import styled from "styled-components";
import { rem } from "polished";

import { colors } from "styles/const";

const Input = styled.input`
  width: ${rem(270)};
  font-size: ${rem(16)};
  font-family: "roboto";
  padding: ${rem(12)} ${rem(50)} ${rem(12)} ${rem(32)};
  border: none;
  border-radius: ${rem(25)};

  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.6;
    color: ${colors.primary};
  }
`;

export default Input;
