import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  Badge,
  Flex,
  Icon,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { FaHeart, FaCreditCard, FaUser } from 'react-icons/fa';
import axios from 'axios';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBgColor = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const [userResponse, favoritesResponse, subscriptionResponse] = await Promise.all([
          axios.get('/users/me', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/user/favorites', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/user/subscription', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setUser(userResponse.data);
        setFavorites(favoritesResponse.data);
        setSubscription(subscriptionResponse.data);
      } catch (error) {
        toast({
          title: 'Failed to fetch user data',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  if (isLoading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" color="brand.500" />
      </Flex>
    );
  }

  if (!user) {
    return (
      <Box textAlign="center" py={10}>
        <Heading color="brand.600">Please log in to view your dashboard</Heading>
      </Box>
    );
  }

  return (
    <Box maxWidth="1200px" margin="auto" mt={8} px={4} pb={8}>
      <VStack spacing={8} align="stretch">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading color="brand.600">User Dashboard</Heading>
          <Text fontSize="xl" fontWeight="bold">Welcome, {user.email}!</Text>
        </Flex>
        <Tabs variant="soft-rounded" colorScheme="brand">
          <TabList>
            <Tab><Icon as={FaHeart} mr={2} />Favorites</Tab>
            <Tab><Icon as={FaCreditCard} mr={2} />Subscription</Tab>
            <Tab><Icon as={FaUser} mr={2} />Account Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {favorites.map((property) => (
                  <Card key={property.id} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" bg={cardBgColor} boxShadow="md">
                    <Image src={property.photo_url || 'https://via.placeholder.com/300'} alt={property.title} height="200px" objectFit="cover" />
                    <CardBody>
                      <Stack mt="2" spacing="3">
                        <Heading size="md" color="brand.600">{property.title}</Heading>
                        <Text fontWeight="bold" fontSize="xl">${property.price.toLocaleString()}</Text>
                        <Text>{property.square_footage.toLocaleString()} sq ft</Text>
                        <Badge colorScheme={property.is_for_sale ? "green" : "blue"} alignSelf="start">
                          {property.is_for_sale ? "For Sale" : "For Lease"}
                        </Badge>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">Current Subscription</Heading>
                  <Text><strong>Plan:</strong> {subscription?.plan_name || 'No active subscription'}</Text>
                  <Text><strong>Status:</strong> {subscription?.status || 'N/A'}</Text>
                  <Text><strong>Expires:</strong> {subscription?.expires_at ? new Date(subscription.expires_at).toLocaleDateString() : 'N/A'}</Text>
                  <Button colorScheme="brand" size="lg" mt={4}>Manage Subscription</Button>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box bg={cardBgColor} p={6} borderRadius="lg" boxShadow="md">
                <VStack align="start" spacing={4}>
                  <Heading size="md" color="brand.600">Account Settings</Heading>
                  <Button colorScheme="brand" size="lg">Change Password</Button>
                  <Button colorScheme="brand" size="lg">Update Profile</Button>
                </VStack>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default UserDashboard;
