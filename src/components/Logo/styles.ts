import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

const {width} = Dimensions.get('window');

const logoWidth = width - 40;

export const Container = styled.View`
  align-items: center;
  justify-content: center;

  width: ${logoWidth}px;
  height: 85px;
`;

export const LogoImg = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 100%;

  margin-right: 30px;
`;
