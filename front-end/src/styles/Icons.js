import styled from 'styled-components';
import { COLORS, SIZES } from './Constants';

export const BaseIcon = styled.span`
  font-family: 'Material Symbols Outlined';
  cursor: pointer;
  color: ${COLORS.white};
  padding: ${SIZES.padding};
`;

export const NavIcon = styled(BaseIcon)`
  font-size: ${SIZES.fontSizeXXLarge};
  color: ${({ $isSelected }) => ($isSelected ? COLORS.white : 'rgba(255, 255, 255, 0.582)')};
  border-bottom: ${({ $isSelected }) => ($isSelected ? `3px solid ${COLORS.borderColor}` : 'none')};
  &:hover {
    color: ${COLORS.white};
  }
`;

export const PersonAddIcon = styled(BaseIcon)`
  font-size: ${SIZES.fontSizeXXLarge};
`;

export const EncryptedBoxIcon = styled(BaseIcon)`
  font-size: ${SIZES.iconSizeLarge};
  cursor: auto;
`;

export const LargeIcon = styled(BaseIcon)`
  font-size: ${SIZES.fontSizeXXXLarge};
`;


