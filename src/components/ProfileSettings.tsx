import React from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const ProfileSettings: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Avatar size="2xl" name="Mike Lindstrom" src="" mb={4} />
          <Button colorScheme="blue" size="sm">
            Change Photo
          </Button>
        </Box>

        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input defaultValue="Mike Lindstrom" />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input defaultValue="mike.lindstrom@example.com" type="email" />
        </FormControl>

        <FormControl>
          <FormLabel>Bio</FormLabel>
          <Input defaultValue="Software developer and community builder" />
        </FormControl>

        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input defaultValue="Toronto, ON" />
        </FormControl>

        <FormControl>
          <FormLabel>Website</FormLabel>
          <Input defaultValue="https://mikelindstrom.dev" type="url" />
        </FormControl>

        <Button colorScheme="blue" alignSelf="flex-start">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileSettings; 