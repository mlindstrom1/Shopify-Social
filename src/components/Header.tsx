import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  useColorModeValue,
  Center,
  Badge,
  Image,
  Text,
  VStack,
  HStack,
  Link,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'
import { SearchIcon, BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

interface HeaderProps {
  onNotificationsClick: () => void;
}

const Header = ({ onNotificationsClick }: HeaderProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      py={3}
      borderBottom="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex align="center" justify="space-between">
        <Box w="250px" pl={4}>
          <RouterLink to="/home">
            <Box position="relative" _hover={{ opacity: 0.8 }} transition="opacity 0.2s">
              <Image 
                src="https://cdn.shopify.com/shopifycloud/brochure/assets/brand-assets/shopify-logo-primary-logo-456baa801ee66a0a435671082365958316831c9960c480451dd0330bcdae304f.svg"
                alt="Shopify Logo" 
                height="36px"
                objectFit="contain"
              />
              <Text
                fontSize="lg"
                fontFamily="'Pacifico', cursive"
                bgGradient="linear(to-r, purple.400, pink.400, orange.400)"
                bgClip="text"
                fontWeight="black"
                letterSpacing="wider"
                position="absolute"
                left="62px"
                top="26px"
                transform="translateY(2px)"
                textShadow="0 0 1px rgba(0,0,0,0.1)"
                sx={{
                  WebkitTextStroke: '0.5px',
                  WebkitTextStrokeColor: 'rgba(255,255,255,0.2)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Social
              </Text>
            </Box>
          </RouterLink>
        </Box>

        <Box flex={1} px={8}>
          <InputGroup maxW="600px" mx="auto">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search events, groups, or people..."
              bg={useColorModeValue('gray.100', 'gray.700')}
              _placeholder={{ color: 'gray.400' }}
              _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
              _focus={{ 
                bg: 'white',
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)'
              }}
            />
          </InputGroup>
        </Box>

        <HStack spacing={4} pr={4}>
          <Box position="relative">
            <IconButton
              aria-label="Notifications"
              icon={<BellIcon fontSize="24px" />}
              variant="ghost"
              onClick={onNotificationsClick}
              size="lg"
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            />
            <Badge
              position="absolute"
              top="-2px"
              right="-2px"
              minW="18px"
              height="18px"
              fontSize="12px"
              fontWeight="bold"
              borderRadius="full"
              bg="red.500"
              color="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding="0"
              boxShadow="0 0 0 2px white"
            >
              3
            </Badge>
          </Box>

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
              _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
            >
              <HStack spacing={3}>
                <Avatar 
                  size="sm" 
                  name="Mike Lindstrom"
                  bg="gray.400"
                />
                <Text fontWeight="medium">Mike Lindstrom</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem as={RouterLink} to="/settings">Settings</MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}

export default Header 