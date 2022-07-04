import React from 'react';
import {TextInputProps} from 'react-native';

import {SvgIcon} from '../SvgIcon';

import {colors} from '../../styles/colors';
import {Container, TextInputContainer, TextInput, IconButton} from './styles';

interface Props extends TextInputProps {
  onPress: () => void;
}

const SearchBar: React.FC<Props> = ({onPress, ...rest}) => {
  return (
    <Container>
      <TextInputContainer>
        <TextInput
          {...rest}
          keyboardAppearance="dark"
          placeholderTextColor={colors.white}
        />
      </TextInputContainer>
      <IconButton onPress={onPress}>
        <SvgIcon name="search" width={24} height={24} color={colors.white} />
      </IconButton>
    </Container>
  );
};

export default SearchBar;
