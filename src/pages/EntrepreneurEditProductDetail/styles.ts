import { Dimensions, Platform } from 'react-native';
import styled  from 'styled-components/native';

import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView.attrs({
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      paddingBottom: Platform.OS === 'android' ? 20 : 20,
      flexGrow: 1,
      alignItems: 'center'
    },
  })`
    background-color: ${colors.indigoA200};
  `;

export const HeaderContainer = styled.View`
    width: ${screenWidth}px;
    margin-top: 20px;
`;

export const BodyContainer = styled.View`
    padding: 0 38px;

    flex: 1;
    width: 100%;
`;

export const ButtonsContainer = styled.View`
  width: 220px;
  padding: 24px;
`;

