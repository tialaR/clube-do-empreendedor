import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

type CheckBoxButtonProps = {
  isChecked?: boolean;
};
export const CheckBoxButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<CheckBoxButtonProps>`
  border-radius: 4px;

  ${props =>
    !props.isChecked &&
    css`
      border: 2px solid ${colors.indigoA200};

      width: 20px;
      height: 20px;
    `};

  ${props =>
    props.isChecked &&
    css`
      border: none;
      background-color: ${colors.indigoA200};

      width: 20px;
      height: 20px;
    `};
`;

export const Label = styled.Text`
  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoRegular};

  padding-left: 8px;

  color: ${colors.indigoA200};
`;
