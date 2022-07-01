import styled, {css} from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};

  align-items: center;
  justify-content: center;
  padding: 0 30px 40px;
`;

type ConfirmationTextProps = {
  bold?: boolean;
};
export const ConfirmationText = styled.Text<ConfirmationTextProps>`
  font-size: ${fonts.sizes.xLarge}px;
  font-family: ${fonts.families.latoRegular};

  color: ${colors.indigoA200};

  text-align: center;

  ${props =>
    props.bold &&
    css`
      font-family: ${fonts.families.latoBold};
    `}
`;
