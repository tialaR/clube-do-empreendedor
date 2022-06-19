import styled, { css } from 'styled-components/native';

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