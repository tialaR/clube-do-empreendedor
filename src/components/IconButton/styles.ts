import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';

type ContainerProps = {
  roundLight?: boolean;
};
export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<ContainerProps>`
  ${props =>
    props.roundLight &&
    css`
      padding: 10px;
      border-radius: 50px;

      align-self: flex-start;

      background-color: ${colors.white};

      elevation: 4;
    `};
`;
