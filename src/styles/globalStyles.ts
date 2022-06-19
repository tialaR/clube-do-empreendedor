import styled, { css } from 'styled-components/native';

type SpacingProps = {
    small?: boolean;
    medium?: boolean;
    large?: boolean;
}

export const Spacing = styled.View<SpacingProps>`
  ${(props) => props.small && css`height: 16px;`}
  ${(props) => props.medium && css`height: 24px;`}
  ${(props) => props.large && css`height: 38px;`}
`;