import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.gray50};
`;

export const BodyContainer = styled.View`
  flex: 1;
  padding: 60px 20px 20px 20px;
`;

export const BodyContainerContents = styled.View`
  justify-content: center;
  align-items: center;
`;

export const WellcomeContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const WellcomeText = styled.Text`
  color: ${colors.indigoA200};

  font-size: ${fonts.sizes.xxxLarge}px;
  font-family: ${fonts.families.latoBold};
`;

export const WellcomeDescription = styled.Text`
  color: ${colors.indigoA200};

  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  width: 190px;
  padding: 10px;
`;

export const TermsButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))``;

type TermsButtonTextProps = {
  link?: boolean;
  bold?: boolean;
};
export const TermsButtonText = styled.Text<TermsButtonTextProps>`
  color: ${colors.black};

  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoRegular};

  text-align: center;

  ${props =>
    props.link &&
    css`
      color: ${colors.indigoA200};

      text-decoration: underline;
      font-family: ${fonts.families.latoBold};
    `};

  ${props =>
    props.bold &&
    css`
      font-family: ${fonts.families.latoBold};
    `};
`;
