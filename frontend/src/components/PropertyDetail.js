import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Heading, Text, Image, VStack, HStack, Spinner, Center } from '@chakra-ui/react';

const PropertyDetail = () => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/properties/${id}`);
        setProperty(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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

  if (!property) {
    return (
      <Center h="100vh">
        <Text>Property not found.</Text>
      </Center>
    );
  }

  return (
    <Box p={5}>
      <VStack spacing={5} align="start">
        <Heading as="h1" size="xl">{property.title}</Heading>
        <Image src={property.photo_url || 'https://via.placeholder.com/600x400'} alt={property.title} />
        <HStack spacing={10}>
          <VStack align="start">
            <Text fontWeight="bold">Price:</Text>
            <Text fontWeight="bold">Square Footage:</Text>
            <Text fontWeight="bold">Property Type:</Text>
            <Text fontWeight="bold">For Sale:</Text>
            <Text fontWeight="bold">For Lease:</Text>
            <Text fontWeight="bold">For Auction:</Text>
          </VStack>
          <VStack align="start">
            <Text>${property.price.toLocaleString()}</Text>
            <Text>{property.square_footage} sq ft</Text>
            <Text>{property.property_type}</Text>
            <Text>{property.is_for_sale ? 'Yes' : 'No'}</Text>
            <Text>{property.is_for_lease ? 'Yes' : 'No'}</Text>
            <Text>{property.is_for_auction ? 'Yes' : 'No'}</Text>
          </VStack>
        </HStack>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">Description:</Text>
          <Text>{property.description}</Text>
        </VStack>
        <VStack align="start" w="100%">
          <Text fontWeight="bold">Additional Details:</Text>
          <Text>Power Type: {property.power_type}</Text>
          <Text>HVAC: {property.hvac}</Text>
          <Text>Heat Type: {property.heat_type}</Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PropertyDetail;
