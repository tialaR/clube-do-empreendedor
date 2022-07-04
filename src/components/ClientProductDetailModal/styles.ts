import styled, {css} from 'styled-components/native';
import {Dimensions} from 'react-native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

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
  position: relative;

  width: ${modalWidth}px;
  height: ${modalHeight}px;

  background-color: ${colors.gray50};
  padding: 50px 20px 0 20px;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  align-items: center;
  justify-content: center;
`;

export const ContainerIconButton = styled.View`
  position: absolute;
  top: 14px;
  right: 14px;

  align-self: flex-end;
  margin-bottom: 14px;
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
  font-size: ${fonts.sizes.medium}px;
  font-family: ${fonts.families.latoBlack};

  color: ${colors.indigoA200};
  text-align: center;

  margin-bottom: 8px;
`;

export const Image = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
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
  font-family: ${fonts.families.latoBlack};

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
};
export const SoldBy = styled.Text<SoldByProps>`
  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};

  margin: 10px 0;

  color: ${colors.black};

  ${props =>
    props.colorful &&
    css`
      font-family: ${fonts.families.latoBold};
      color: ${colors.indigoA200};
    `}
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
  padding-bottom: 20px;

  align-items: center;
  justify-content: center;
`;

export const FeaturesTitle = styled.Text`
  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoBold};

  color: ${colors.indigoA200};
`;

export const FeatureItem = styled.Text`
  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoRegular};

  color: ${colors.indigoA200};
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
  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoBlack};

  color: ${colors.indigoA200};
`;

export const QRCodeImage = styled.Image`
  margin-top: 14px;

  width: 80px;
  height: 80px;
`;

export const WhatsAppContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  padding-top: 20px;
`;

export const WhatsAppButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  border-radius: 50px;
  padding: 6px 12px;

  background-color: ${colors.whatsApp};
`;

export const WhatsAppButtonText = styled.Text`
  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoBlack};

  padding-left: 4px;

  color: ${colors.white};
`;

export const DiscountButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  border-radius: 50px;

  padding: 6px 12px;
  margin-top: 12px;

  background-color: ${colors.indigoA200};
`;

export const DiscountButtonText = styled.Text`
  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoBlack};

  padding-left: 4px;

  color: ${colors.white};
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
  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoBold};

  text-align: center;
  color: ${colors.white};
`;

export const GuarantedProductDescription = styled.Text`
  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};

  padding-top: 12px;

  text-align: center;
  color: ${colors.white};
`;
