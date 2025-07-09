import styled from 'styled-components';
import { COLORS, SIZES, TRANSITIONS } from './Constants';

export const BaseInput = styled.input`
  padding: ${SIZES.padding};
  border: solid ${SIZES.borderWidth} ${COLORS.borderColor};
  border-radius: ${SIZES.borderRadius};
  background-color: ${COLORS.transparentBlack};
  color: ${COLORS.white};
  transition: ${TRANSITIONS.scale};
  &:focus {
    transform: scale(1.02);
  }
`;

export const SearchInput = styled(BaseInput)`
  height: 5%;
  width: 50%;
`;

export const EncryptedBoxInput = styled(BaseInput)`
  width: 80%;
  padding: 2%;
`;

export const StyledInput = styled.textarea`
  color: ${COLORS.white};
  padding: ${SIZES.padding};
  border: solid ${SIZES.borderWidth} ${COLORS.borderColor};
  border-radius: ${SIZES.borderRadius};
  height: 80%;
  background-color: ${COLORS.transparentBlack};
  width: 50%;
  overflow-x: hidden;
  transition: ${TRANSITIONS.scale};
  &:focus {
    transform: scale(1.02);
  }
`;

export const PgpKeyTextarea = styled.textarea`
  border-radius: 1%;
  border: solid 0.1em;
  vertical-align: top;
  height: 20vh;
  width: 100%;
  line-height: 1.2;
  padding: 5px 10px;
`;

export const PgpMessageTextarea = styled(PgpKeyTextarea)`
  color: ${COLORS.white};
  background-color: transparent;
  border: solid ${COLORS.white} 0.1em;
  height: 50%;
`;

export const LoginInput = styled.input`
  color: ${COLORS.black};
  background: transparent;
  padding: ${SIZES.padding};
  border: 0;
  border-bottom: solid 0.1em;
  font-size: larger;
  margin: 2% 0;
  width: 100%;
`;

export const LoginInputWhite = styled(LoginInput)`
  color: ${COLORS.white};
  border-bottom: solid 0.1em ${COLORS.white};
`;

export const TextArea = styled.textarea`
  padding: ${SIZES.padding};
  border-radius: 12px;
  height: 65%;
  width: 40%;
  &::placeholder {
    font-size: larger;
  }
`;