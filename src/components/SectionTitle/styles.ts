import styled from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  position: relative;
`;

export const Title = styled.Text`
  color: ${colors.indigoA200};

  font-size: ${fonts.sizes.large}px;
  font-family: ${fonts.families.latoBold};

  padding-right: 16px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  right: -16px;
`;
