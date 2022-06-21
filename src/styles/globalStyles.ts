import styled, { css } from 'styled-components/native';
import { colors } from './colors';

type SpacingProps = {
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

export const SpacingY = styled.View<SpacingProps>`
  ${(props) => props.small && css`height: 16px;`}
  ${(props) => props.medium && css`height: 24px;`}
  ${(props) => props.large && css`height: 38px;`}
`;

export const SpacingX = styled.View<SpacingProps>`
  ${(props) => props.small && css`width: 8px;`}
  ${(props) => props.medium && css`width: 16px;`}
  ${(props) => props.large && css`width: 20px;`}
`;

export const BigTitle = styled.Text`
  font-size: 26px;
  font-weight: 600;
  color: ${colors.indigoA200};
`;