import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {FeaturedProduct, MyDiscountProduct} from '../../services/client/types';

import {colors} from '../../styles/colors';

export const Container = styled.ScrollView`
  background-color: ${colors.gray50};
`;

export const MyDiscountsProducstList = styled(
  FlatList as new () => FlatList<MyDiscountProduct>,
).attrs({
  contentContainerStyle: {paddingRight: 32, paddingLeft: 32, paddingBottom: 22},
})``;

export const FeaturedProducstList = styled(
  FlatList as new () => FlatList<FeaturedProduct>,
).attrs({
  contentContainerStyle: {paddingRight: 32, paddingLeft: 32, paddingBottom: 22},
})``;

export const SectionListContainer = styled.View``;

export const SectionTitleContainer = styled.View`
  justify-content: center;
  align-items: center;

  padding: 16px 0;
`;

export const ListLoadingContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;
