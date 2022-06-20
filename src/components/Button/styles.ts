import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

type ButtonTypesProps = {
  filled?: boolean;
  filledLight?: boolean;
  outlined?: boolean;
}

type ButtonProps = {
  buttontypes: ButtonTypesProps;
}

export const ContainerView = styled.View<ButtonProps>`
    border-radius: 10px;

    height: 50px;
    width: 100%;

    ${(props) => props.buttontypes.outlined && css`border: 2px solid ${colors.indigoA200};`};
    ${(props) => props.buttontypes.filled && css` border: none;`};
    ${(props) => props.buttontypes.filledLight && css`border: 2px solid ${colors.white}`}
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
    
    ${(props) => props.buttontypes.outlined && css`background-color: 'transparent';`};
    ${(props) => props.buttontypes.filled && css`background-color: ${colors.indigoA200};`};
    ${(props) => props.buttontypes.filledLight && css`background-color: 'transparent';`}
`;

export const ButtonText = styled.Text<ButtonProps>`
  font-size: 16px;
  font-weight: 600;

  ${(props) => props.buttontypes.outlined && css`color: ${colors.indigoA200};`};
  ${(props) => props.buttontypes.filled && css`color: ${colors.white};`};
  ${(props) => props.buttontypes.filledLight && css`color: ${colors.white};`}
`;