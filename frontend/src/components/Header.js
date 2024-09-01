import React from 'react';
import { Box, Flex, Heading, Button, Image, HStack, Text, useBreakpointValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoHeight = useBreakpointValue({ base: "24px", md: "32px" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box bg="white" px={{ base: 4, md: 6 }} py={3} boxShadow="sm" position="sticky" top={0} zIndex={1000}>
      <Flex h={{ base: 16, md: 20 }} alignItems="center" justifyContent="space-between" maxWidth="1200px" margin="auto">
        <Flex alignItems="center">
          <Image src="/propnet-logo-placeholder.png" alt="PropNet Logo" height={logoHeight} mr={4} />
          <Heading as="h1" size={headingSize} color="brand.500" fontWeight="bold">
            <Link to="/">PropNet</Link>
          </Heading>
        </Flex>
        {!isMobile ? (
          <HStack spacing={{ md: 6, lg: 8 }}>
            <Link to="/for-sale"><Text fontSize="sm" fontWeight="semibold" color="gray.700" _hover={{ color: 'brand.500' }}>For Sale</Text></Link>
            <Link to="/for-lease"><Text fontSize="sm" fontWeight="semibold" color="gray.700" _hover={{ color: 'brand.500' }}>For Lease</Text></Link>
            <Link to="/auctions"><Text fontSize="sm" fontWeight="semibold" color="gray.700" _hover={{ color: 'brand.500' }}>Auctions</Text></Link>
            <Link to="/data"><Text fontSize="sm" fontWeight="semibold" color="gray.700" _hover={{ color: 'brand.500' }}>Property Data</Text></Link>
          </HStack>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant="ghost"
              color="gray.800"
              _hover={{ bg: 'gray.100' }}
            />
            <MenuList>
              <MenuItem as={Link} to="/for-sale">For Sale</MenuItem>
              <MenuItem as={Link} to="/for-lease">For Lease</MenuItem>
              <MenuItem as={Link} to="/auctions">Auctions</MenuItem>
              <MenuItem as={Link} to="/data">Property Data</MenuItem>
              <MenuItem as={Link} to="/add-listing">Add Listing</MenuItem>
              <MenuItem as={Link} to="/login">Sign In</MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isMobile && (
          <HStack spacing={3}>
            <Button as={Link} to="/add-listing" colorScheme="brand" variant="outline" size={buttonSize} fontWeight="semibold" _hover={{ bg: 'brand.50' }}>
              Add Listing
            </Button>
            <Button as={Link} to="/login" colorScheme="brand" variant="solid" size={buttonSize} fontWeight="semibold">
              Sign In
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
