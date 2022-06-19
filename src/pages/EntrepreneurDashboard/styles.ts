import styled from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import { colors } from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

import { Product } from './index';

export const Container = styled.ScrollView`
  background-color: ${colors.gray50};
  flex: 1;
`;

export const ProducstList = styled(
    FlatList as new () => FlatList<Product>,
  ).attrs({
    contentContainerStyle: { paddingRight: 32, paddingLeft: 32, paddingBottom: 22 },
  })`
  `;

export const SectionListContainer = styled.View`
`

export const SectionTitleContainer = styled.View`
  justify-content: center;
  align-items: center;

  padding: 16px 0;
`

export const SectionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;

  padding: 16px;
`
export const SquareButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;

  text-align: center;

  color: ${colors.white};
`;

export const SquareButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7
}))`
  flex: 1;
  padding: 20px 16px;
  
  elevation: 4;

  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${colors.indigoA200};
`;