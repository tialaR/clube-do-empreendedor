import styled, { css } from 'styled-components/native';
import {colors} from '../../styles/colors';

export const Container = styled.View`
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
  font-size: 26px;
  font-weight: 800;
`;

export const WellcomeDescription = styled.Text`
  color: ${colors.indigoA200};
  font-size: 12px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  width: 190px;
  padding: 10px;
`;

export const TermsButtonContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.7
}))``;

type TermsButtonTextProps = {
  link?: boolean;
  bold?: boolean;
}
export const TermsButtonText = styled.Text<TermsButtonTextProps>`
  color: ${colors.black};
  font-size: 10px;
  text-align: center;

  ${(props) => props.link && css`color: ${colors.indigoA200}; text-decoration: underline; font-weight: 600`}
  ${(props) => props.bold && css`font-weight: 700;`}
`;
