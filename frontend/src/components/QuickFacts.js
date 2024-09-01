import React from 'react';
import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react';

const QuickFacts = ({ property }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="sm">
      <VStack align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">${property.price.toLocaleString()}</Text>
          <Badge colorScheme={property.is_for_sale ? "green" : "blue"}>
            {property.is_for_sale ? "For Sale" : "For Lease"}
          </Badge>
        </HStack>
        <HStack justify="space-between">
          <Text>{property.square_footage.toLocaleString()} sq ft</Text>
          <Text>{property.property_type}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Power: {property.power_type}</Text>
          <Text>HVAC: {property.hvac}</Text>
        </HStack>
        <Text>Heat: {property.heat_type}</Text>
      </VStack>
    </Box>
  );
};

export default QuickFacts;
