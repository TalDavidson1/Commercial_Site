import React from 'react';
import { Box, SimpleGrid, Text, Image, VStack, Heading, Spinner, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PropertyList = ({ properties, loading, error, hoveredPropertyId, onPropertyHover, onPropertyLeave }) => {
  if (loading) {
    return (
      <Center h="100%">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100%">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  if (!Array.isArray(properties) || properties.length === 0) {
    return (
      <Center h="100%">
        <Text>No properties found.</Text>
      </Center>
    );
  }

  return (
    <Box overflowY="auto" height="100%">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        {properties.map((property) => (
          property && property.id ? (
            <Link to={`/property/${property.id}`} key={property.id}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow={hoveredPropertyId === property.id ? "lg" : "md"}
                transition="all 0.3s"
                bg={hoveredPropertyId === property.id ? "gray.100" : "white"}
                transform={hoveredPropertyId === property.id ? "translateY(-5px)" : "none"}
                onMouseEnter={() => onPropertyHover(property.id)}
                onMouseLeave={onPropertyLeave}
              >
                <Image
                  src={property.photo_url || 'https://via.placeholder.com/400x300?text=No+Image+Available'}
                  alt={property.title || 'Property Image'}
                  height="200px"
                  width="100%"
                  objectFit="cover"
                />
                <VStack p={4} align="start" spacing={2}>
                  <Heading as="h3" size="md" color="brand.600">
                    {property.title || 'Untitled Property'}
                  </Heading>
                  <Text fontWeight="bold" fontSize="xl">
                    {property.price ? `$${property.price.toLocaleString()}` : 'Price not available'}
                  </Text>
                  <Text fontSize="md">
                    {property.square_footage ? `${property.square_footage.toLocaleString()} sq ft` : 'Square footage not available'}
                  </Text>
                  <Text color="gray.600" fontSize="md">{property.property_type || 'Property type not specified'}</Text>
                </VStack>
              </Box>
            </Link>
          ) : null
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PropertyList;
