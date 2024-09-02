import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import PropertyList from '../components/PropertyList';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with actual API call
      const mockProperties = [
        { id: 1, title: 'Office Space 1', address: '123 Main St', price: 500000, latitude: 40.7128, longitude: -74.0060 },
        { id: 2, title: 'Retail Store', address: '456 Elm St', price: 750000, latitude: 40.7300, longitude: -73.9950 },
        { id: 3, title: 'Sample Property', address: '805 Pine Street, Mooresville, NC 28115', price: 600000, latitude: 35.5846, longitude: -80.8209 },
        // Add more mock properties as needed
      ];
      setProperties(mockProperties);
      setSearchResults(mockProperties);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSearch = useCallback((searchParams) => {
    // TODO: Implement actual search logic
    console.log('Search params:', searchParams);
    // For now, just update searchResults with all properties
    setSearchResults(properties);
  }, [properties]);

  const handlePropertyHover = useCallback((propertyId) => {
    setHoveredPropertyId(propertyId);
  }, []);

  const handlePropertyLeave = useCallback(() => {
    setHoveredPropertyId(null);
  }, []);

  const handleMarkerMouseEnter = useCallback((propertyId) => {
    setHoveredPropertyId(propertyId);
  }, []);

  const handleMarkerMouseLeave = useCallback(() => {
    setHoveredPropertyId(null);
  }, []);

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);
  const memoizedMapProps = useMemo(() => ({
    properties: memoizedSearchResults,
    center: [35.5846, -80.8209], // Centered on 805 Pine Street, Mooresville, NC 28115
    zoom: 14, // Adjusted zoom level for better visibility of the pin
    hoveredPropertyId,
    onMarkerMouseEnter: handleMarkerMouseEnter,
    onMarkerMouseLeave: handleMarkerMouseLeave
  }), [memoizedSearchResults, hoveredPropertyId, handleMarkerMouseEnter, handleMarkerMouseLeave]);

  return (
    <Flex height="100vh">
      <Box width="30%" overflowY="auto" borderRight="1px" borderColor="gray.200">
        <VStack spacing={4} align="stretch" p={4}>
          <SearchBar onSearch={handleSearch} />
          <PropertyList
            properties={memoizedSearchResults}
            loading={loading}
            error={error}
            hoveredPropertyId={hoveredPropertyId}
            onPropertyHover={handlePropertyHover}
            onPropertyLeave={handlePropertyLeave}
          />
        </VStack>
      </Box>
      <Box width="70%">
        <Map {...memoizedMapProps} />
      </Box>
    </Flex>
  );
};

export default Home;
