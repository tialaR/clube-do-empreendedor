import styled, { css } from 'styled-components/native';

import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

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
    font-size: ${fonts.sizes.medium}px;
    font-family: ${fonts.families.latoBlack};

    color: ${colors.indigoA200};
    text-align: center;

    margin-bottom: 8px;
`;

export const Image = styled.Image`
    width: 160px;
    height: 160px;
`;

export const DescriptionContainer = styled.View`
    justify-content: center;
    align-items: center;

    margin-top: 18px;
`;

export const Price = styled.Text`
    font-size: ${fonts.sizes.large}px;
    font-family: ${fonts.families.latoBold};

    color: ${colors.black};
`;

export const Installment = styled.Text`
    font-size: ${fonts.sizes.small}px;
    font-family: ${fonts.families.latoBold};

    color: ${colors.black};

    margin-top: 10px;
`;

export const PromotionContainer = styled.View`
    background: ${colors.indigoA200};
    border-radius: 50px;

    padding: 2px 30px;
    margin-top: 8px;

    align-items: center;
    justify-content: center;
`;

export const PromotionText = styled.Text`
    font-size: ${fonts.sizes.small}px;
    font-family: ${fonts.families.latoBold};

    color: ${colors.white};
`;

type SoldByProps = {
  colorful?: boolean;
}
export const SoldBy = styled.Text<SoldByProps>`
    font-size: ${fonts.sizes.small}px;
    font-family: ${fonts.families.latoBold};

    margin: 10px 0;

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
    margin: 10px 0 8px 0;

    align-items: center;
    justify-content: center;
`;

export const QRCodeTitle = styled.Text`
    font-size: ${fonts.sizes.regular}px;
    font-family: ${fonts.families.latoBlack};

    color: ${colors.indigoA200};
`;

export const QRCodeImage = styled.Image`
    margin-top: 14px;

    width: 80px;
    height: 80px;
`;

