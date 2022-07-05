import LinearGradient from 'react-native-linear-gradient';
import styled, {css} from 'styled-components/native';

import {colors} from './colors';
import {fonts} from './fonts';

type SpacingProps = {
  tiny?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
};

export const SpacingY = styled.View<SpacingProps>`
  ${props =>
    props.tiny &&
    css`
      height: 8px;
    `}
  ${props =>
    props.small &&
    css`
      height: 16px;
    `}
  ${props =>
    props.medium &&
    css`
      height: 24px;
    `}
  ${props =>
    props.large &&
    css`
      height: 38px;
    `}
`;

export const SpacingX = styled.View<SpacingProps>`
  ${props =>
    props.tiny &&
    css`
      width: 8px;
    `}
  ${props =>
    props.small &&
    css`
      width: 16px;
    `}
  ${props =>
    props.medium &&
    css`
      width: 24px;
    `}
  ${props =>
    props.large &&
    css`
      width: 30px;
    `}
`;

export const BigTitle = styled.Text`
  font-size: ${fonts.sizes.xxxLarge}px;
  font-family: ${fonts.families.latoBold};

  color: ${colors.indigoA200};
`;

export const SplasScreenAux = styled.View`
  flex: 1;

  background-color: ${colors.indigoA200};

  align-items: center;
  justify-content: center;
`;

type BoxSkeletonLoadingProps = {
  width: number;
  height: number;
};
export const BoxSkeletonLoading = styled(LinearGradient).attrs({
  colors: [colors.gradientStart, colors.gradientEnd],
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})<BoxSkeletonLoadingProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  border-radius: 10px;

  align-self: center;
`;

type TextsSkeletonLoadingProps = {
  width: number;
  thin?: boolean;
};
export const TextsSkeletonLoading = styled(LinearGradient).attrs({
  colors: [colors.gradientStart, colors.gradientEnd],
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})<TextsSkeletonLoadingProps>`
  width: ${props => props.width}px;

  ${props =>
    props.thin
      ? css`
          height: 12px;
        `
      : css`
          height: 18px;
        `}

  border-radius: 5px;
`;
