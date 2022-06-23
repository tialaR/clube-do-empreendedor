import styled, { css } from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const ProductContainer = styled.View`
  background-color: ${colors.gray50};
  padding: 20px 20px 0 20px;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  align-items: center;
  justify-content: center;
`;

export const ProductContainerContents = styled.View`
  padding: 0 24px 20px;

  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
    font-size: 14px;
    font-weight: 700;

    color: ${colors.indigoA200};
    text-align: center;
`;

export const Image = styled.Image`
    width: 100px;
    height: 100px;
`;

export const DescriptionContainer = styled.View`
    justify-content: center;
    align-items: center;
`;

export const Price = styled.Text`
    margin-top: 8px;

    font-size: 15px;
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

    padding: 2px 30px;

    align-items: center;
    justify-content: center;
    margin: 4px 0;
`;

export const PromotionText = styled.Text`
    font-size: 8px;
    color: ${colors.white};
    font-weight: 600;
`;

type SoldByProps = {
  colorful?: boolean;
}
export const SoldBy = styled.Text<SoldByProps>`
    padding: 4px 0;
    font-size: 12px;
    font-weight: 600;

    text-align: center;

    color: ${colors.black};

    ${(props) => props.colorful && css`color: ${colors.indigoA200}`}
`;

export const FooterContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;

    margin: 4px 0;
`;

export const QRCodeContainer = styled.View`
    flex: 1;
    margin: 8px 0;

    align-items: center;
    justify-content: center;
`;

export const QRCodeTitle = styled.Text`
    font-size: 14px;
    color: ${colors.indigoA200};
    font-weight: 800;
`;

export const QRCodeImage = styled.Image`
    margin-top: 10px;
    width: 90px;
    height: 90px;
`;

