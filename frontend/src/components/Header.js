import React from 'react';
import { Box, Flex, Heading, Button, Image, HStack, Text, useBreakpointValue, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoHeight = useBreakpointValue({ base: "24px", md: "32px" });
  const headingSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });

  return (
    <Box bg="white" px={{ base: 2, md: 4 }} py={2} boxShadow="md" position="sticky" top={0} zIndex={1000}>
      <Flex h={{ base: 14, md: 16 }} alignItems="center" justifyContent="space-between" maxWidth="1200px" margin="auto">
        <Flex alignItems="center">
          <Image src="/propnet-logo-placeholder.png" alt="PropNet Logo" height={logoHeight} mr={3} />
          <Heading as="h1" size={headingSize} color="brand.500" fontWeight="bold">
            <Link to="/">PropNet</Link>
          </Heading>
        </Flex>
        {!isMobile ? (
          <HStack spacing={{ md: 4, lg: 6 }}>
            <Link to="/for-sale"><Text fontSize={{ md: "xs", lg: "sm" }} fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>For Sale</Text></Link>
            <Link to="/for-lease"><Text fontSize={{ md: "xs", lg: "sm" }} fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>For Lease</Text></Link>
            <Link to="/auctions"><Text fontSize={{ md: "xs", lg: "sm" }} fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>Auctions</Text></Link>
            <Link to="/data"><Text fontSize={{ md: "xs", lg: "sm" }} fontWeight="medium" color="gray.700" _hover={{ color: 'brand.500' }}>Property Data</Text></Link>
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
              <MenuItem as={Link} to="/add-listing">Add Listing</MenuItem>
              <MenuItem as={Link} to="/login">Sign In</MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isMobile && (
          <HStack spacing={2}>
            <Button as={Link} to="/add-listing" colorScheme="brand" variant="outline" size={buttonSize} fontWeight="medium" _hover={{ bg: 'brand.50' }}>
              Add Listing
            </Button>
            <Button as={Link} to="/login" colorScheme="brand" variant="solid" size={buttonSize} fontWeight="medium">
              Sign In
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
