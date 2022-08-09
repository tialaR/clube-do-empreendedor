import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View``;

export const RedioContainerButton = styled.View`
  flex-direction: row;
  align-items: center;
`;

type RedioButtonProps = {
  isSelect?: boolean;
};
export const RedioButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<RedioButtonProps>`
  border-radius: 10px;

  ${props =>
    !props.isSelect &&
    css`
      border: 2px solid ${colors.white};

      width: 20px;
      height: 20px;
    `};

  ${props =>
    props.isSelect &&
    css`
      border: none;
      background-color: ${colors.white};

      width: 20px;
      height: 20px;
    `};
`;

export const RadioLabel = styled.Text`
  font-size: ${fonts.sizes.medium}px;
  font-family: ${fonts.families.latoRegular};

  padding-left: 8px;

  color: ${colors.white};
`;
