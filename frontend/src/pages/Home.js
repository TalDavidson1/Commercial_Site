import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch initial properties data
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    // TODO: Replace with actual API call
    const mockProperties = [
      { id: 1, title: 'Office Space 1', address: '123 Main St', price: 500000, latitude: 40.7128, longitude: -74.0060 },
      { id: 2, title: 'Retail Store', address: '456 Elm St', price: 750000, latitude: 40.7300, longitude: -73.9950 },
      // Add more mock properties as needed
    ];
    setProperties(mockProperties);
    setSearchResults(mockProperties);
  };

  const handleSearch = (searchParams) => {
    // TODO: Implement actual search logic
    console.log('Search params:', searchParams);
    // For now, just update searchResults with all properties
    setSearchResults(properties);
  };

  return (
    <Flex height="100vh">
      <Box width="30%" overflowY="auto">
        <SearchBar onSearch={handleSearch} />
        {/* TODO: Add PropertyList component here */}
      </Box>
      <Box width="70%">
        <Map properties={searchResults} />
      </Box>
    </Flex>
  );
};

export default Home;
