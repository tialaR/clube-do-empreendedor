import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.indigoA200};

  align-items: center;
  justify-content: center;
  padding: 0 30px 80px;
`;

type ConfirmationTextProps = {
  bold?: boolean;
};
export const ConfirmationText = styled.Text<ConfirmationTextProps>`
  font-size: ${fonts.sizes.xLarge}px;
  font-family: ${fonts.families.latoRegular};

  text-align: center;

  color: ${colors.white};

  ${props =>
    props.bold &&
    css`
      font-family: ${fonts.families.latoBold};
    `}
`;
