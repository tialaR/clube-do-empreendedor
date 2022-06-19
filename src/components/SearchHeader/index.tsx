import React from 'react';
import { Alert } from 'react-native';

import Logo from '../Logo';
import SearchBar from '../SearchBar';

import { Container, SearchBarContainer } from './styles';

type Props = {
  onPress: () => void;
}

const SearchHeader: React.FC<Props> = ({ onPress }) => {
  return (
    <Container>
      <Logo />
      
      <SearchBarContainer>
        <SearchBar 
          placeholder='Encontre empresas ou produtos' 
          onPress={onPress} 
        />
      </SearchBarContainer>
    </Container>
  );
}

export default SearchHeader;