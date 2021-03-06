import styled from 'styled-components/native';
import {Dimensions, FlatList} from 'react-native';

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
  padding: 40px 20px 10px 20px;
  border-radius: 10px;
  overflow: hidden;

  box-shadow: 0px 10px 14px ${colors.shadow};
  elevation: 4;

  align-items: center;
  justify-content: center;
`;

export const ContainerIconButton = styled.View`
  position: absolute;
  top: 8px;
  right: 8px;

  align-self: flex-end;
  margin-bottom: 14px;
`;

export const DiscountClientsListTitle = styled.Text`
  font-size: ${fonts.sizes.large}px;
  font-family: ${fonts.families.latoBlack};

  padding-bottom: 30px;

  color: ${colors.indigoA200};
`;

export const DiscountClientsList = styled(
  FlatList as new () => FlatList<any>,
).attrs({
  contentContainerStyle: {
    paddingTop: 40,
  },
})``;

export const ClientItemButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const ClientItemNameContainer = styled.View`
  flex-shrink: 1;
  flex-direction: row;
`;

export const ClientItemName = styled.Text`
  flex-shrink: 1;

  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoBlack};

  color: ${colors.indigoA200};
`;

export const SeeMoreInformationsContainer = styled.View`
  padding-left: 24px;
`;

export const SeeMoreInformations = styled.Text`
  font-size: ${fonts.sizes.xSmall}px;
  font-family: ${fonts.families.latoRegular};

  text-decoration: underline;

  color: ${colors.indigoA200};
`;

export const ClientMoreInformationContainer = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))``;

export const ClientName = styled.Text`
  font-size: ${fonts.sizes.large}px;
  font-family: ${fonts.families.latoBlack};

  color: ${colors.indigoA200};
`;

export const DescriptionsContainer = styled.View``;

export const Title = styled.Text`
  font-size: ${fonts.sizes.regular}px;
  font-family: ${fonts.families.latoBlack};

  color: ${colors.indigoA200};
`;

export const Description = styled.Text`
  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};

  margin-top: 4px;

  color: ${colors.indigoA200};
`;
