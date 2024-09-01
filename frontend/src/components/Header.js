import React from 'react';
import { Box, Flex, Heading, Button, Image, HStack, Text, useMediaQuery, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 48em)");

  return (
    <Box bg="white" px={4} py={2} boxShadow="md" position="sticky" top={0} zIndex={1000}>
      <Flex h={16} alignItems="center" justifyContent="space-between" maxWidth="1200px" margin="auto">
        <Flex alignItems="center">
          <Image src="/propnet-logo-placeholder.png" alt="PropNet Logo" height="32px" mr={3} />
          <Heading as="h1" size="lg" color="brand.500" fontWeight="bold">
            <Link to="/">PropNet</Link>
          </Heading>
        </Flex>
        {isLargerThanMd ? (
          <HStack spacing={6}>
            <Link to="/for-sale"><Text fontSize="sm" fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>For Sale</Text></Link>
            <Link to="/for-lease"><Text fontSize="sm" fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>For Lease</Text></Link>
            <Link to="/auctions"><Text fontSize="sm" fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>Auctions</Text></Link>
            <Link to="/data"><Text fontSize="sm" fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>Property Data</Text></Link>
          </HStack>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant="ghost"
              color="gray.700"
            />
            <MenuList>
              <MenuItem as={Link} to="/for-sale">For Sale</MenuItem>
              <MenuItem as={Link} to="/for-lease">For Lease</MenuItem>
              <MenuItem as={Link} to="/auctions">Auctions</MenuItem>
              <MenuItem as={Link} to="/data">Property Data</MenuItem>
            </MenuList>
          </Menu>
        )}
        <HStack spacing={4}>
          <Button as={Link} to="/add-listing" colorScheme="brand" variant="outline" size="sm" fontWeight="medium" _hover={{ bg: 'brand.50' }}>
            Add Listing
          </Button>
          <Button as={Link} to="/login" colorScheme="brand" variant="solid" size="sm" fontWeight="medium">
            Sign In
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
