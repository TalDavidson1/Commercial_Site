import React, { useState } from 'react';
import { Box, Input, Select, Button, HStack, VStack } from '@chakra-ui/react';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    minPrice: '',
    maxPrice: '',
    minSquareFootage: '',
    maxSquareFootage: '',
    propertyType: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(searchParams);
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" mb={4}>
      <VStack spacing={4}>
        <Input
          placeholder="Search by keyword"
          name="keyword"
          value={searchParams.keyword}
          onChange={handleInputChange}
        />
        <HStack spacing={4} width="100%">
          <Input
            placeholder="Min Price"
            name="minPrice"
            type="number"
            value={searchParams.minPrice}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Max Price"
            name="maxPrice"
            type="number"
            value={searchParams.maxPrice}
            onChange={handleInputChange}
          />
        </HStack>
        <HStack spacing={4} width="100%">
          <Input
            placeholder="Min Sq Ft"
            name="minSquareFootage"
            type="number"
            value={searchParams.minSquareFootage}
            onChange={handleInputChange}
          />
          <Input
            placeholder="Max Sq Ft"
            name="maxSquareFootage"
            type="number"
            value={searchParams.maxSquareFootage}
            onChange={handleInputChange}
          />
        </HStack>
        <Select
          placeholder="Property Type"
          name="propertyType"
          value={searchParams.propertyType}
          onChange={handleInputChange}
        >
          <option value="office">Office</option>
          <option value="retail">Retail</option>
          <option value="industrial">Industrial</option>
          <option value="multifamily">Multifamily</option>
        </Select>
        <Button colorScheme="blue" onClick={handleSearch} width="100%">
          Search
        </Button>
      </VStack>
    </Box>
  );
};

export default SearchBar;
