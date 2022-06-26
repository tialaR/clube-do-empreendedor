import styled, { css } from 'styled-components/native';

import { colors } from './colors';
import { fonts } from './fonts';

type SpacingProps = {
    tiny?: boolean;
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

export const SpacingY = styled.View<SpacingProps>`
  ${(props) => props.tiny && css`height: 8px;`}
  ${(props) => props.small && css`height: 16px;`}
  ${(props) => props.medium && css`height: 24px;`}
  ${(props) => props.large && css`height: 38px;`}
`;

export const SpacingX = styled.View<SpacingProps>`
  ${(props) => props.tiny && css`width: 8px;`}
  ${(props) => props.small && css`width: 16px;`}
  ${(props) => props.medium && css`width: 24px;`}
  ${(props) => props.large && css`width: 30px;`}
`;

export const BigTitle = styled.Text`
  font-size: ${fonts.sizes.xxxLarge}px;
  font-family: ${fonts.families.latoBold};
  
  color: ${colors.indigoA200};
`;