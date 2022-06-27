import { Dimensions, Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const productPhotoWidth = (screenWidth - 80)/ 3;
const productPhotoHeight = (screenHeight/ 100) * 15;

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
    margin-top: 18%;
    padding: 0 32px;

    flex: 1;
    width: 100%;
`;

export const CompanyProductDetailBodyContainer = styled.View`
    padding: 0 38px;

    width: 100%;
`;

type TitleProps = {
  withPadding?: boolean;
}
export const Title = styled.Text<TitleProps>`
  font-size: ${fonts.sizes.xLarge}px;
  font-family: ${fonts.families.latoBold};

  color: ${colors.white};

  align-self: center;

  ${(props) => props.withPadding && css`padding: 16px;`}
`;

export const ProductPhotosContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

export const ProductPhoto = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1
}))`
    background-color: ${colors.indigo50};
    width: ${productPhotoWidth}px;
    height: ${productPhotoHeight}px;

    elevation: 4;

    border-radius: 10px;

    align-items: center;
    justify-content: center;
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


