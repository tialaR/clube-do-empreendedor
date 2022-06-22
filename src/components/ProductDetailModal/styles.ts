import styled, { css } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors } from '../../styles/colors';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const modalWidth = width - 60;
const modalHeight = height - 70;

export const Overlay = styled.View`
  position: absolute;
  background-color: ${colors.black};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.4;
`;

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const ProductContainer = styled.View`
  width: ${modalWidth}px;
  height: ${modalHeight}px;

  background-color: ${colors.gray50};
  padding: 10px 20px 0 20px;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  align-items: center;
  justify-content: center;
`;

export const ContainerIconButton = styled.View`
  align-self: flex-end;
  margin-bottom: 8px;
`;

export const ProductScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: ${modalWidth}px;
  height: ${modalHeight}px;
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

    color: ${colors.black};

    ${(props) => props.colorful && css`color: ${colors.indigoA200}`}
`;

export const FeaturesScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  nestedScrollEnabled: true,
  contentContainerStyle: {
    paddingBottom: 20,
    paddingTop: 10,
  },
})`
    width: 100%;
    height: 120px;

    border: 1px solid ${colors.indigoA200};
    border-radius: 10px;

    margin: 8px 0;
`;

export const FeaturesContentContainer = styled.View`
    padding: 4px;

    align-items: center;
    justify-content: center;
`;

export const FeaturesTitle = styled.Text`
    font-size: 10px;
    color: ${colors.indigoA200};
    font-weight: 800;
`;

export const FeatureItem = styled.Text`
    font-size: 10px;
    color: ${colors.indigoA200};
    font-weight: 500;
`;

export const FooterContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex-direction: row;

    margin: 4px 0;
`;

export const QRCodeContainer = styled.View`
    flex: 1;
    margin: 4px 0;

    align-items: center;
    justify-content: center;
`;

export const QRCodeTitle = styled.Text`
    font-size: 10px;
    color: ${colors.indigoA200};
    font-weight: 800;
`;

export const QRCodeImage = styled.Image`
    margin-top: 8px;
    width: 70px;
    height: 70px;
`;

export const WhatsAppContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding-top: 20px;
`;

export const WhatsAppButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7
}))`
    align-items: center;
    justify-content: center;
    flex-direction: row;

    border-radius: 50px;
    padding: 4px 10px;

    background-color: ${colors.whatsApp};
`;

export const WhatsAppButtonText = styled.Text`
    padding-left: 2px;

    font-size: 9px;
    color: ${colors.white};
    font-weight: 600;
`;

export const DiscountButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7
}))`
    align-items: center;
    justify-content: center;
    flex-direction: row;

    border-radius: 50px;
    padding: 4px 10px;
    margin-top: 12px;

    background-color: ${colors.indigoA200};
`;

export const DiscountButtonText = styled.Text`
    padding-left: 2px;

    font-size: 9px;
    color: ${colors.white};
    font-weight: 600;
`;

export const GuarantedProductContainer = styled.View`
  margin-top: 20px;
`;

export const GuarantedProductDescriptionContainer = styled.View`
    width: 100%;

    background-color: ${colors.indigoA200};
    border-radius: 10px;

    padding: 16px 16px 30px 16px;
`;

export const GuarantedProductTitle = styled.Text`
    font-size: 12px;

    text-align: center;
    color: ${colors.white};
    font-weight: 600;
`;

export const GuarantedProductDescription = styled.Text`
    padding-top: 12px;

    font-size: 11px;

    text-align: center;
    color: ${colors.white};
`;
