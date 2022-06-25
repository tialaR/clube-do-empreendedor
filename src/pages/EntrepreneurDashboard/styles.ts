import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { colors } from '../../styles/colors';

import { Product } from './index';

export const Container = styled.ScrollView`
  background-color: ${colors.gray50};
  flex: 1;
`;

export const ProducstList = styled(FlatList as new () => FlatList<Product>)``;

export const SectionListContainer = styled.View`
`

export const SectionTitleContainer = styled.View`
  justify-content: center;
  align-items: center;

  padding: 16px 0;
`

export const SectionButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;

  padding: 16px;
`

export const SquareButtonContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1
}))``;

export const SquareIconContainer = styled.View`
  width: 84px;
  height: 84px;
  
  elevation: 4;

  border-radius: 10px;

  justify-content: center;
  align-items: center;

  background-color: ${colors.indigoA200};
`;

type SquareButtonTextProps = {
  bold?: boolean;
}
export const SquareButtonText = styled.Text<SquareButtonTextProps>`
  font-size: 11px;
  font-weight: 600;

  text-align: center;

  color: ${colors.indigoA200};

  ${(props) => props.bold && css`font-weight: bold;`}
`;
