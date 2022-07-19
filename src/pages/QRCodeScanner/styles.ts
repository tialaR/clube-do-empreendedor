import styled from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  position: relative;

  flex: 1;
  background-color: ${colors.indigoA200};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 10px 20px;
  height: 60px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background-color: ${colors.indigoA200};
`;

export const ScanAgainButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))``;

export const ScanAgainButtonText = styled.Text`
  font-family: ${fonts.families.latoBold};
  font-size: ${fonts.sizes.medium}px;

  color: ${colors.white};
`;
