import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.indigoA200};

  align-items: center;
  justify-content: center;
  padding: 0 30px 80px;
`;

type ConfirmationTextProps = {
    bold?: boolean;
}
export const ConfirmationText = styled.Text<ConfirmationTextProps>`
  font-size: 24px;
  color: ${colors.white};

  text-align: center;

  ${(props) => props.bold && css`font-weight: 600`}
`;
