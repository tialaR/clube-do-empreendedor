import React, {useState} from 'react';
import {useMapModal} from '../../hooks/useMapModal';
import {SpacingY} from '../../styles/globalStyles';

import Logo from '../Logo';
import SearchBar from '../SearchBar';

import {Container, SearchBarContainer} from './styles';

type Props = {
  placeholder: string;
};

const SearchHeader: React.FC<Props> = ({placeholder}) => {
  const [searchedCompanyText, setSearchedCompanyText] = useState('');

  const {showMapModal, isMapModalLoading} = useMapModal();

  return (
    <Container>
      <Logo />

      <SpacingY tiny />
      <SearchBarContainer>
        <SearchBar
          value={searchedCompanyText}
          onChangeText={setSearchedCompanyText}
          placeholder={placeholder}
          isSearchLoading={isMapModalLoading}
          onPress={() => showMapModal(searchedCompanyText)}
        />
      </SearchBarContainer>
    </Container>
  );
};

export default SearchHeader;
