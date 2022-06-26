import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const LogoImg = styled.Image`
  align-self: center;
  
  width: 75px;
  height: 75px;
`;

type TitleProps = {
    bold?: boolean;
}
export const Title = styled.Text<TitleProps>`
  font-family: ${props => props.bold ? fonts.families.latoBlack : fonts.families.latoBold};
  font-size: ${fonts.sizes.large}px;

  color: ${colors.white}
`;
