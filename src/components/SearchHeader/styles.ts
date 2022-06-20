import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.View`  
  background-color: ${colors.indigoA200};

  width: ${screenWidth}px;
  padding: 20px 0 16px;
  
  align-items: center;

  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  elevation: 4;
  box-shadow: 0px 5px 10px ${colors.shadow};
`;

export const SearchBarContainer = styled.View`  
  width: 80%;
  align-items: center;
  justify-content: center;
`;
