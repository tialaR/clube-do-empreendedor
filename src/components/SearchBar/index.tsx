import React from 'react';
import {TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
        <Icon name="search" size={20} color={colors.white} />
      </IconButton>
    </Container>
  );
};

export default SearchBar;
