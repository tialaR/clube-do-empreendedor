import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'android' ? 50 : 20,
    flexGrow: 1,
    alignItems: 'center',
  },
})`
  background-color: ${colors.white};
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 10px 30px 0 30px;
`;

export const HeaderTexts = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-size: ${fonts.sizes.xxxLarge}px;
  font-family: ${fonts.families.latoBold};

  color: ${colors.indigoA200};
`;

export const Description = styled.Text`
  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoRegular};

  color: ${colors.indigoA200};

  text-align: center;

  padding-top: 16px;
`;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;

  padding: 0 40px;

  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`;

export const InputContainer = styled.View`
  margin-top: -60px;
  background-color: ${colors.white};
`;

export const ButtonContainer = styled.View`
  min-width: 300px;
  width: 100%;

  padding: 0 40px 0 40px;
`;
