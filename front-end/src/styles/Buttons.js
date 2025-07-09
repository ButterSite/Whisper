import styled from 'styled-components';
import { COLORS, SIZES, TRANSITIONS, SHADOWS } from './Constants';

export const BaseButton = styled.button`
  border: solid 2px ${COLORS.borderColor};
  border-radius: ${SIZES.borderRadius};
  background: transparent;
  color: ${COLORS.white};
  padding: ${SIZES.padding};
  margin: ${SIZES.margin};
  cursor: pointer;
  transition: ${TRANSITIONS.scale};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${SHADOWS.button};
  &:hover {
    transform: scale(1.1);
    box-shadow: ${SHADOWS.buttonHover};
  }
`;

export const PrimaryButton = styled(BaseButton)`
  font-size: ${SIZES.fontSizeLarge};
  width: 50%;
  height: 5%;
`;

export const SearchButton = styled(PrimaryButton)`
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;

export const EncryptedBoxConfirmButton = styled(PrimaryButton)`
  margin-top: 10%;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
`;

export const SignButton = styled.button`
  transition: ${TRANSITIONS.all};
  cursor: pointer;
  border-style: none;
  color: ${COLORS.white};
  width: 50%;
  padding: ${SIZES.padding};
  margin-top: 5%;
  margin-left: auto;
  border-radius: 5%;
  background-color: ${COLORS.black};
  &:hover {
    transform: scale(1.05);
  }
`;

export const SignInButton = styled(SignButton)`
  color: ${COLORS.black};
  background-color: ${COLORS.white};
`;

export const DoneButton = styled(SignInButton)`
  width: 20%;
  height: 50%;
  padding: ${SIZES.padding};
`;

export const SendButton = styled(BaseButton)`
  font-size: ${SIZES.fontSizeXLarge};
`;


export const ValidateButton = styled(BaseButton)`
  border: solid 2px ${COLORS.black};
  background: ${COLORS.black};
  width: 20%;
  font-size: ${SIZES.fontSizeMedium};
`;

export const EncryptFriendsButton = styled(BaseButton)`
    padding: 2%;
    font-size: large
`