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
  useColorModeValue,
  Select,
  Divider,
  Center
} from '@chakra-ui/react';

const ProfileSettings: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={6} align="stretch">
        <VStack spacing={3}>
          <Center
            bgGradient="linear(to-r, blue.400, blue.500)"
            borderRadius="full"
            p={1}
            width="fit-content"
            alignSelf="center"
          >
            <Avatar 
              size="2xl" 
              name="Mike Lindstrom" 
              src="" 
              bg="transparent"
            />
          </Center>
          <Button 
            colorScheme="blue" 
            size="sm"
            variant="outline"
            width="150px"
          >
            Change Photo
          </Button>
          <Text color={textColor} fontSize="sm" textAlign="center">
            For best results, use an image at least 256px by 256px in .jpg format
          </Text>
        </VStack>

        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input defaultValue="Mike Lindstrom" />
        </FormControl>

        <Divider />

        <FormControl>
          <FormLabel>Theme</FormLabel>
          <Select defaultValue="system">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Language</FormLabel>
          <Select defaultValue="en">
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="de">Deutsch</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Time Zone</FormLabel>
          <Select defaultValue="America/Toronto">
            <option value="America/Toronto">Eastern Time (Toronto)</option>
            <option value="America/Vancouver">Pacific Time (Vancouver)</option>
            <option value="America/New_York">Eastern Time (New York)</option>
            <option value="Europe/London">GMT (London)</option>
            <option value="Asia/Tokyo">JST (Tokyo)</option>
          </Select>
          <Text fontSize="sm" color={textColor} mt={1}>
            Your time zone is used to display event times in your local time
          </Text>
        </FormControl>

        <Divider />

        <Box>
          <Text fontWeight="medium" mb={2}>Password</Text>
          <Button
            variant="outline"
            colorScheme="blue"
            size="md"
            onClick={() => {}}
          >
            Reset Password
          </Button>
          <Text fontSize="sm" color={textColor} mt={2}>
            You will receive an email with instructions to reset your password
          </Text>
        </Box>

        <Button 
          bgGradient="linear(to-r, blue.400, blue.500)"
          _hover={{
            bgGradient: "linear(to-r, blue.500, blue.600)"
          }}
          color="white"
          size="lg"
          alignSelf="center"
          border="none"
          _focus={{ boxShadow: 'none' }}
          borderRadius="lg"
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileSettings; 