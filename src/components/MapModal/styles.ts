import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

import {colors} from '../../styles/colors';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const modalWidth = width - 60;
const modalHeight = height - 70;

export const Overlay = styled.View`
  position: absolute;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.4;
`;

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const MapContainer = styled.View`
  position: relative;

  width: ${modalWidth}px;
  height: ${modalHeight}px;

  border-radius: 10px;
  overflow: hidden;
`;

export const ContainerIconButton = styled.View`
  position: absolute;
  top: 20px;
  right: 20px;

  z-index: 10;
`;
