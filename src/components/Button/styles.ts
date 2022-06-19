import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

type ButtonProps = {
    filled?: boolean;
}

export const ContainerView = styled.View<ButtonProps>`
    border-radius: 10px;

    height: 50px;
    width: 100%;

    ${(props) =>
    props.filled
      ? css`
          border: none;
        `
      : css`
          border: 2px solid ${colors.indigoA200};
        `}
`;

export const Container = styled.TouchableOpacity.attrs(() => ({
    activeOpacity: 0.7
}))<ButtonProps>`
  background-color: ${colors.indigoA200};

  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 0 20px;
  
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.filled
      ? css`
          background-color: ${colors.indigoA200};
        `
      : css`
          background-color: 'transparent';
        `}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 16px;
  font-weight: 600;

  ${(props) =>
    props.filled
      ? css`
          color: ${colors.white};
        `
      : css`
          color: ${colors.indigoA200};
        `}
`;