import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 16px 16px 0 16px;

  border-bottom-width: 2px;
  border-bottom-color: ${colors.white};

  align-items: center;
  justify-content: center;

  margin-bottom: ${props => (props.isErrored ? 0 : 4)}px;
  ${props =>
    props.isErrored &&
    css`
      border-bottom-color: ${colors.red};
    `}
`;

export const Title = styled.Text`
  color: ${colors.white};

  font-size: ${fonts.sizes.xLarge}px;
  font-family: ${fonts.families.latoBold};

  text-align: center;
`;

export const TextInputContainer = styled.View`
  height: 40px;
  width: 100%;

  margin-top: 24px;
`;

export const TextInput = styled.TextInput`
  flex: 1;

  font-size: ${fonts.sizes.medium}px;
  font-family: ${fonts.families.latoRegular};

  color: ${colors.white};

  text-align: center;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.red};

  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};

  padding: 4px 0 8px 8px;
`;
