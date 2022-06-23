import { Dimensions, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.ScrollView.attrs({
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      paddingBottom: Platform.OS === 'android' ? 50 : 20,
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
    margin-top: 32px;
    padding: 0 32px;

    flex: 1;
    width: 100%;
`;

export const EntrepreneurProductDetailBodyContainer = styled.View`
    padding: 0 38px;

    flex: 1;
    width: 100%;
`;

type TitleProps = {
  withPadding?: boolean;
}
export const Title = styled.Text<TitleProps>`
  color: ${colors.white};
  font-size: 20px;
  font-weight: 700;

  align-self: center;

  ${(props) => props.withPadding && css`padding: 16px;`}
`;

export const ButtonsContainer = styled.View`
  width: 190px;
  padding: 10px;
`;

type ProgressProps = {
  currentValue: number;
  maxValue: number;
}

export const Pregress = styled.View<ProgressProps>`
  height: 10px;
  width: ${screenWidth}px;

  ${(props) => props.currentValue > 0 && css`background-color: ${colors.white};`}

  ${(props) => props.currentValue === 1 && css`color: ${colors.white}; width: ${screenWidth/props.maxValue}px`}
  ${(props) => props.currentValue === 2 && css`color: ${colors.white}; width: ${(screenWidth/props.maxValue) * props.currentValue}px`}
  ${(props) => props.currentValue === 3 && css`color: ${colors.white}; width: ${(screenWidth/props.maxValue) * props.currentValue}px`}
  ${(props) => props.currentValue === 4 && css`color: ${colors.white}; width: ${(screenWidth/props.maxValue) * props.currentValue}px`}
  ${(props) => props.currentValue === (5 | 6) && css`color: ${colors.white}; width: ${screenWidth}px`}
`;


