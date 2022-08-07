import React from 'react';
import {TextInputProps} from 'react-native';

import {SvgIcon} from '../SvgIcon';

import {colors} from '../../styles/colors';
import {
  Container,
  TextInputContainer,
  TextInput,
  IconButton,
  LoadingContainer,
} from './styles';
import {LoadingWhite} from '../../styles/globalStyles';

interface Props extends TextInputProps {
  onPress: (searchedText: string) => void;
  isSearchLoading: boolean;
}

const SearchBar: React.FC<Props> = ({onPress, isSearchLoading, ...rest}) => {
  return (
    <Container>
      <TextInputContainer>
        <TextInput
          {...rest}
          keyboardAppearance="dark"
          placeholderTextColor={colors.white}
        />
      </TextInputContainer>
      {isSearchLoading ? (
        <LoadingContainer>
          <LoadingWhite />
        </LoadingContainer>
      ) : (
        <IconButton onPress={onPress}>
          <SvgIcon name="search" width={24} height={24} color={colors.white} />
        </IconButton>
      )}
    </Container>
  );
};

export default SearchBar;
