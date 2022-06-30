import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

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

export const PinContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const PinMoreInfoContainer = styled.View`
  background-color: ${colors.indigoA200};

  width: 190px;
  padding: 20px 10px;

  justify-content: center;

  border-radius: 10px;
`;

type PinTitleProps = {
  colorful?: boolean;
};
export const PinTitle = styled.Text<PinTitleProps>`
  font-family: ${fonts.families.latoBlack};
  font-size: ${fonts.sizes.medium}px;

  color: ${colors.white};

  ${props =>
    props.colorful &&
    css`
      color: ${colors.indigoA200};
    `};
`;

export const PinDescription = styled.Text`
  font-family: ${fonts.families.latoBlack};
  font-size: ${fonts.sizes.xSmall}px;

  color: ${colors.white};
`;

export const PinThinDescription = styled.Text`
  font-family: ${fonts.families.latoBold};
  font-size: ${fonts.sizes.xxSmall}px;

  color: ${colors.green200};
`;
