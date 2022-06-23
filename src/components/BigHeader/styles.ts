import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const bigHeaderHeight = screenHeight - (screenHeight/100 * 72);

export const Container = styled.View`
  position: relative;
  
  background-color: ${colors.indigoA200};

  width: ${screenWidth}px;
  height: ${bigHeaderHeight}px;

  justify-content: center;
  align-items: center;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  box-shadow: 0px 5px 10px ${colors.shadow};
  elevation: 4;
`;

export const BackButtonContainer = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
`;
