import styled from 'styled-components/native';

import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';

export const Container = styled.View`
  position: relative;

  border-radius: 10px;
  overflow: hidden;

  height: 38px;
  width: 100%;
  padding-left: 16px;

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

export const IconButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  justify-content: center;
  align-items: flex-end;

  padding-right: 16px;

  height: 100%;
  width: 20%;
`;

export const LoadingContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  justify-content: center;
  align-items: flex-end;

  padding-right: 16px;

  height: 100%;
  width: 20%;
`;
