import styled from 'styled-components';
import { COLORS, SIZES } from './Constants';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; 
  
  &:visited {
    color: inherit;
  }
  
`;

export const StyledMessage = styled.div`
  margin: 5%;
  border-radius: ${SIZES.borderRadius};
  padding: 2%;
  border: solid ${SIZES.borderWidth} ${COLORS.borderColor};
  color: ${COLORS.white};
`;

export const MessageTo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: ${SIZES.fontSizeXLarge};
  border-bottom: solid 3px ${COLORS.borderColor};
  color: ${COLORS.white};
`;

export const ErrorText = styled.div`
  color: ${COLORS.red};
  margin: 1%;
  font-size: ${SIZES.fontSizeSmall};
`;

export const SignUpText = styled.h2`
  text-align: center;
  color: ${COLORS.black};
`;

export const SignInText = styled.h2`
  text-align: center;
  color: ${COLORS.white};
`;