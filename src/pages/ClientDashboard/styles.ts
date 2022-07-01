import styled from 'styled-components/native';
import {FlatList} from 'react-native';

import {colors} from '../../styles/colors';

import {Product} from './index';

export const Container = styled.ScrollView`
  background-color: ${colors.gray50};
`;

export const ProducstList = styled(
  FlatList as new () => FlatList<Product>,
).attrs({
  contentContainerStyle: {paddingRight: 32, paddingLeft: 32, paddingBottom: 22},
})``;

export const SectionListContainer = styled.View``;

export const SectionTitleContainer = styled.View`
  justify-content: center;
  align-items: center;

  padding: 16px 0;
`;
