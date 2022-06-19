import React from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles/colors';
import { Container, TextInputContainer, TextInput } from './styles';

interface Props extends TextInputProps {
    onPress: () => void;
}

const SearchBar: React.FC<Props> = ({ onPress,...rest }) => {
  return(
        <Container>
            <TextInputContainer>
                <TextInput
                    {...rest}
                    keyboardAppearance="dark"
                    placeholderTextColor={colors.white}
                />  
            </TextInputContainer>
            <Icon
                name='search'
                size={14}
                color={colors.white}
                onPress={onPress}
            />
        </Container>
  )
}

export default SearchBar;