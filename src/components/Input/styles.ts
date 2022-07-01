import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  border-radius: 10px;

  height: 60px;
  width: 100%;
  padding: 0 16px;

  border-width: 2px;
  border-color: ${colors.indigoA200};

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${colors.red};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;

  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoRegular};
`;

export const ErrorMessage = styled.Text`
  color: ${colors.red};

  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};

  padding: 4px 0 8px 8px;
`;
