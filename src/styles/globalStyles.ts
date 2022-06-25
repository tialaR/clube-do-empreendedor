import styled, { css } from 'styled-components/native';
import { colors } from './colors';

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
  font-size: 26px;
  font-weight: 600;
  color: ${colors.indigoA200};
`;