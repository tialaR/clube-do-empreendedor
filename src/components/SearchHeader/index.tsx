import React from 'react';

import Logo from '../Logo';
import SearchBar from '../SearchBar';

import { Container, SearchBarContainer } from './styles';

type Props = {
  onPress: () => void;
  placeholder: string;
}

const SearchHeader: React.FC<Props> = ({ onPress, placeholder }) => {
  return (
    <Container>
      <Logo />
      
      <SearchBarContainer>
        <SearchBar 
          placeholder={placeholder} 
          onPress={onPress} 
        />
      </SearchBarContainer>
    </Container>
  );
}

export default SearchHeader;