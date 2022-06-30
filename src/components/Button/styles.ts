import styled, {css} from 'styled-components/native';
import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

type ButtonTypesProps = {
  filled?: boolean;
  filledLight?: boolean;
  outlined?: boolean;
  outlinedLight?: boolean;
};

type ButtonProps = {
  buttontypes: ButtonTypesProps;
};

export const ContainerView = styled.View<ButtonProps>`
  border-radius: 10px;

  height: 60px;
  width: 100%;

  ${props =>
    props.buttontypes.outlined &&
    css`
      border: 2px solid ${colors.indigoA200};
    `};
  ${props =>
    props.buttontypes.outlinedLight &&
    css`
      border: 2px solid ${colors.white};
    `}
  ${props =>
    props.buttontypes.filled &&
    css`
      border: none;
    `};
  ${props =>
    props.buttontypes.filledLight &&
    css`
      border: none;
    `};
`;

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))<ButtonProps>`
  background-color: ${colors.indigoA200};

  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 0 20px;

  justify-content: center;
  align-items: center;

  ${props =>
    props.buttontypes.outlined &&
    css`
      background-color: 'transparent';
    `};
  ${props =>
    props.buttontypes.outlinedLight &&
    css`
      background-color: 'transparent';
    `}
  ${props =>
    props.buttontypes.filled &&
    css`
      background-color: ${colors.indigoA200};
    `};
  ${props =>
    props.buttontypes.filledLight &&
    css`
      background-color: ${colors.white};
    `};
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: ${fonts.sizes.large}px;
  font-family: ${fonts.families.latoBold};

  ${props =>
    props.buttontypes.outlined &&
    css`
      color: ${colors.indigoA200};
    `};
  ${props =>
    props.buttontypes.outlinedLight &&
    css`
      color: ${colors.white};
    `}
  ${props =>
    props.buttontypes.filled &&
    css`
      color: ${colors.white};
    `};
  ${props =>
    props.buttontypes.filledLight &&
    css`
      color: ${colors.indigoA200};
    `};
`;
