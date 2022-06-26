import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import { fonts } from '../../styles/fonts';

export const Container = styled.View`
  border-radius: 10px;

  height: 38px;
  width: 100%;
  padding: 0 16px;
  
  background-color: ${colors.shadowLight};

  flex-direction: row;
  align-items: center;
`;

export const TextInputContainer = styled.View`
  flex: 1;
  height: 38px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${colors.white};

  font-size: ${fonts.sizes.small}px;
  font-family: ${fonts.families.latoRegular};
  
  text-align: center;
`;
