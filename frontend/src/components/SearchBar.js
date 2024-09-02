import React, { useState } from 'react';
import { Box, Input, Select, Button, HStack, VStack, Collapse, useDisclosure, Icon } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    minPrice: '',
    maxPrice: '',
    minSquareFootage: '',
    maxSquareFootage: '',
    propertyType: '',
  });
  const { isOpen, onToggle } = useDisclosure();

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
    <Box p={4} borderWidth={1} borderRadius="lg" mb={4} boxShadow="md" bg="white">
      <HStack spacing={2} mb={4}>
        <Input
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          name="keyword"
          value={searchParams.keyword}
          onChange={handleInputChange}
          size="lg"
          borderColor="gray.300"
          _hover={{ borderColor: "blue.500" }}
          _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
        />
        <Button
          colorScheme="blue"
          onClick={handleSearch}
          size="lg"
          leftIcon={<Icon as={SearchIcon} />}
        >
          Search
        </Button>
      </HStack>
      <Button size="sm" onClick={onToggle} variant="link" color="blue.500" mb={2}>
        {isOpen ? "Hide" : "Show"} advanced search options
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <VStack spacing={4} align="stretch">
          <HStack spacing={4}>
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
          <HStack spacing={4}>
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
        </VStack>
      </Collapse>
    </Box>
  );
};

export default SearchBar;
