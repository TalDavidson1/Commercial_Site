import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, Text, Image, VStack, Heading, Spinner, Center, Container, Flex, useBreakpointValue, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import QuickFacts from './QuickFacts';
import MapView from './MapView';
import heroImage from '../assets/pexels-jimbear-998499.jpg';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const fetchProperties = async (searchParams = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/properties', { params: searchParams });
      setProperties(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (searchParams) => {
    fetchProperties(searchParams);
  };

  const toggleView = () => {
    setShowMap(!showMap);
  };

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const heroHeight = useBreakpointValue({ base: "300px", md: "400px" });
  const heroPadding = useBreakpointValue({ base: 4, md: 8 });
  const heroHeadingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const heroTextSize = useBreakpointValue({ base: "md", md: "xl" });

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box>
      <Box
        bgImage={`url(${heroImage})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height={heroHeight}
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={8}
      >
        <VStack
          bg="rgba(0, 0, 0, 0.6)"
          p={heroPadding}
          borderRadius="md"
          textAlign="center"
          color="white"
          width={{ base: "90%", md: "auto" }}
        >
          <Heading as="h1" size={heroHeadingSize} mb={4}>
            Discover Your Next Commercial Property
          </Heading>
          <Text fontSize={heroTextSize} mb={6}>
            Browse our extensive collection of premium commercial real estate
          </Text>
          <SearchBar onSearch={handleSearch} />
        </VStack>
      </Box>
      <Container maxWidth="1200px" px={{ base: 4, md: 5 }}>
        <Flex justifyContent="flex-end" mb={4}>
          <Button onClick={toggleView} colorScheme="brand">
            {showMap ? "Show List" : "Show Map"}
          </Button>
        </Flex>
        {showMap ? (
          <MapView properties={properties} />
        ) : (
          <SimpleGrid columns={gridColumns} spacing={{ base: 4, md: 6, lg: 8 }}>
            {properties.map((property) => (
              <Link to={`/property/${property.id}`} key={property.id}>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="md"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                >
                  <Image
                    src={property.photo_url || 'https://via.placeholder.com/400x300?text=No+Image+Available'}
                    alt={property.title}
                    height={{ base: "150px", md: "200px" }}
                    width="100%"
                    objectFit="cover"
                  />
                  <VStack p={{ base: 3, md: 5 }} align="start" spacing={2}>
                    <Heading as="h3" size="md" color="brand.600">
                      {property.title}
                    </Heading>
                    <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }}>
                      ${property.price.toLocaleString()}
                    </Text>
                    <Text fontSize={{ base: "sm", md: "md" }}>{property.square_footage.toLocaleString()} sq ft</Text>
                    <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>{property.property_type}</Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default PropertyList;
