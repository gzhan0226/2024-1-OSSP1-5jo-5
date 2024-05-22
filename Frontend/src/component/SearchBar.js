import React from 'react';
import { SearchBarContainer, SearchInput, SearchButton, Icon, FilterIconContainer, FilterIcon } from './style';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="검색하고자하는 API를 입력해보세요!" />
      <FilterIconContainer>
        <FilterIcon />
        <FilterIcon />
      </FilterIconContainer>
      <SearchButton>
        <Icon as={FaSearch} />
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
