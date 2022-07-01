import styled from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  background-color: ${colors.indigo50};
  padding: 20px 0;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoRegular};

  color: ${colors.indigoA200};
`;
