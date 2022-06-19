import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

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
  font-weight: ${props => props.bold ? '900' : '600'};
  font-size: 18px;

  color: ${colors.white}
`;
