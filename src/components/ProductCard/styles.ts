import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

type ColorfulContainerProps = {
    emphasis?: boolean;
}
export const ColorfulContainer = styled.TouchableOpacity.attrs(() => ({
    activeOpacity: 1
}))<ColorfulContainerProps>`
    flex-direction: row;
    padding-top: 6px;

    border-radius: 10px;

    elevation: 4;
    ${(props) =>
    props.emphasis
      ? css`
          background-color: ${colors.purple700};
        `
      : css`
          background-color: ${colors.indigoA200};
        `}
`;

export const Container = styled.View`
    flex-direction: row;
    padding: 16px;

    border-radius: 10px;

    background-color: ${colors.gray100};
`;

export const Image = styled.Image`
    width: 98px;
    height: 90px;
`;

export const DescriptionContainer = styled.View`
    padding-left: 12px;
`;

export const NameContainer = styled.View`
    max-width: 160px;
    min-width: 120px;

    justify-content: center;
    align-items: center;
`;

export const Name = styled.Text`
    font-size: 10px;
    color: ${colors.indigoA200};
    text-align: center;
`;

export const Price = styled.Text`
    margin-top: 8px;

    font-size: 13px;
    color: ${colors.black};
    font-weight: 700;
`;

export const Installment = styled.Text`
    font-size: 10px;
    color: ${colors.black};
    font-weight: 700;
`;

export const PromotionContainer = styled.View`
    background: ${colors.indigoA200};
    border-radius: 50px;

    padding: 2px 10px;

    align-self: flex-start;
    align-items: center;
    justify-content: center;
    margin: 4px 0;
`;

export const PromotionText = styled.Text`
    font-size: 8px;
    color: ${colors.white};
    font-weight: 600;
`;

export const SoldBy = styled.Text`
    font-size: 8px;
    color: ${colors.black};
    font-weight: 600;
`;
