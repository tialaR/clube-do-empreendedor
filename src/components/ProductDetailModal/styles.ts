import styled from 'styled-components/native';
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

export const SoldBy = styled.Text`
    font-size: 10px;
    color: ${colors.black};
    font-weight: 700;
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

export const QRCodeContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 4px 0;
`;

export const QRCodeTitle = styled.Text`
    font-size: 9px;
    color: ${colors.indigoA200};
    font-weight: 800;
`;

export const QRCodeImage = styled.Image`
    margin-top: 8px;
    width: 70px;
    height: 70px;
`;
    
