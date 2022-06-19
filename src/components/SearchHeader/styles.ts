import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const bigHeaderHeight = screenHeight - (screenHeight/100 * 83);

export const Container = styled.View`  
  background-color: ${colors.indigoA200};

  width: ${screenWidth}px;
  height: ${bigHeaderHeight}px;

  align-items: center;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  box-shadow: 0px 5px 10px ${colors.shadow};
  elevation: 4;
`;

export const SearchBarContainer = styled.View`  
  width: 80%;
  align-items: center;
  justify-content: center;
`;
