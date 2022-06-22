import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const Container = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'android' ? 50 : 20,
  },
})`
  flex: 1;
  background-color: ${colors.gray50};
`;

export const BodyContainer = styled.View`
  flex: 1;
  padding: 60px 24px 24px 24px;
`;

export const BodyContents = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BodyHeader = styled.View`
  justify-content: center;
  align-items: center;
`;

export const BodyTitle = styled.Text`
  color: ${colors.indigoA200};
  font-size: 26px;
  font-weight: 800;
`;

export const InputsContainer = styled.View`
  width: 280px;
`;

export const ButtonsContainer = styled.View`
  width: 280px;
`;

export const LineButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 280px;
  padding: 0 10px;
`;

export const LineButtonContainer = styled.TouchableOpacity.attrs(props => ({
    activeOpacity: 1
}))``;

export const LineButtonText = styled.Text`
  color: ${colors.indigoA200};
  font-size: 12px;
  text-align: center;
`;
