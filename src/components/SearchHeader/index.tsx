import React from 'react';
import {useMapModal} from '../../hooks/useMapModal';

import Logo from '../Logo';
import SearchBar from '../SearchBar';

import {Container, SearchBarContainer} from './styles';

type Props = {
  onSearchPress?: () => void;
  placeholder: string;
};

const SearchHeader: React.FC<Props> = ({
  onSearchPress = () => false,
  placeholder,
}) => {
  const {showMapModal} = useMapModal();

  return (
    <Container>
      <Logo />

      <SearchBarContainer>
        <SearchBar placeholder={placeholder} onPress={showMapModal} />
      </SearchBarContainer>
    </Container>
  );
};

export default SearchHeader;
