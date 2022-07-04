import styled from 'styled-components/native';

import {colors} from '../../styles/colors';

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  padding: 10px;
  border-radius: 50px;

  align-self: flex-start;

  background-color: ${colors.white};

  elevation: 4;
`;
