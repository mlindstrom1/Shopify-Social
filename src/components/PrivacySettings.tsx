import React, { useState } from 'react';
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
  Button,
  HStack,
  Divider,
  Heading
} from '@chakra-ui/react';

interface GroupVisibilities {
  [key: string]: 'public' | 'private';
}

const PrivacySettings: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public');
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [emailSearch, setEmailSearch] = useState(false);
  const [defaultGroupVisibility, setDefaultGroupVisibility] = useState<'public' | 'private'>('public');
  const [defaultEventPostVisibility, setDefaultEventPostVisibility] = useState<'public' | 'private'>('public');
  const [groupVisibilities, setGroupVisibilities] = useState<GroupVisibilities>({
    'Tech Enthusiasts Toronto': 'public',
    'Toronto Developers Network': 'private',
    'Shopify Partners Community': 'public'
  });
  const [eventPostVisibilities, setEventPostVisibilities] = useState<GroupVisibilities>({
    'Board Game Night': 'public',
    'Social Tennis Mixer': 'private',
    'Paint & Sip Social': 'public'
  });

  const toggleGroupVisibility = (groupName: string) => {
    setGroupVisibilities(prev => ({
      ...prev,
      [groupName]: prev[groupName] === 'public' ? 'private' : 'public'
    }));
  };

  const toggleEventPostVisibility = (eventName: string) => {
    setEventPostVisibilities(prev => ({
      ...prev,
      [eventName]: prev[eventName] === 'public' ? 'private' : 'public'
    }));
  };

  const handleSaveChanges = () => {
    // TODO: Implement save functionality
    console.log('Saving privacy settings...');
  };

  return (
    <Box>
      <Box bg={bgColor} p={8} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
        <VStack spacing={8} align="stretch">
          <VStack spacing={6} align="stretch">
            <Heading size="md">Profile Privacy</Heading>
            <Divider />
            
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Profile Visibility</FormLabel>
              <HStack spacing={2}>
                <Text fontSize="sm" color="gray.500">Private</Text>
                <Switch
                  isChecked={profileVisibility === 'public'}
                  onChange={(e) => setProfileVisibility(e.target.checked ? 'public' : 'private')}
                  colorScheme="blue"
                />
                <Text fontSize="sm" color="gray.500">Public</Text>
              </HStack>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Show Online Status</FormLabel>
              <Switch
                isChecked={onlineStatus}
                onChange={(e) => setOnlineStatus(e.target.checked)}
                colorScheme="blue"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Allow Email Search</FormLabel>
              <Switch
                isChecked={emailSearch}
                onChange={(e) => setEmailSearch(e.target.checked)}
                colorScheme="blue"
              />
            </FormControl>
          </VStack>

          <VStack spacing={6} align="stretch">
            <Heading size="md">Group Privacy</Heading>
            <Divider />

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Default Group Visibility</FormLabel>
              <HStack spacing={2}>
                <Text fontSize="sm" color="gray.500">Private</Text>
                <Switch
                  isChecked={defaultGroupVisibility === 'public'}
                  onChange={(e) => setDefaultGroupVisibility(e.target.checked ? 'public' : 'private')}
                  colorScheme="blue"
                />
                <Text fontSize="sm" color="gray.500">Public</Text>
              </HStack>
            </FormControl>

            <Text fontSize="lg" fontWeight="semibold" mb={2}>Individual Group Privacy</Text>
            <VStack spacing={4} align="stretch">
              {Object.entries(groupVisibilities).map(([groupName, visibility]) => (
                <FormControl key={groupName} display="flex" alignItems="center">
                  <FormLabel mb="0">{groupName}</FormLabel>
                  <HStack spacing={2}>
                    <Text fontSize="sm" color="gray.500">Private</Text>
                    <Switch
                      isChecked={visibility === 'public'}
                      onChange={() => toggleGroupVisibility(groupName)}
                      colorScheme="blue"
                    />
                    <Text fontSize="sm" color="gray.500">Public</Text>
                  </HStack>
                </FormControl>
              ))}
            </VStack>
          </VStack>

          <VStack spacing={6} align="stretch">
            <Heading size="md">Event Privacy</Heading>
            <Divider />

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Default Event Post Visibility</FormLabel>
              <HStack spacing={2}>
                <Text fontSize="sm" color="gray.500">Private</Text>
                <Switch
                  isChecked={defaultEventPostVisibility === 'public'}
                  onChange={(e) => setDefaultEventPostVisibility(e.target.checked ? 'public' : 'private')}
                  colorScheme="blue"
                />
                <Text fontSize="sm" color="gray.500">Public</Text>
              </HStack>
            </FormControl>

            <Text fontSize="lg" fontWeight="semibold" mb={2}>Individual Event Privacy</Text>
            <VStack spacing={4} align="stretch">
              {Object.entries(eventPostVisibilities).map(([eventName, visibility]) => (
                <FormControl key={eventName} display="flex" alignItems="center">
                  <FormLabel mb="0">{eventName}</FormLabel>
                  <HStack spacing={2}>
                    <Text fontSize="sm" color="gray.500">Private</Text>
                    <Switch
                      isChecked={visibility === 'public'}
                      onChange={() => toggleEventPostVisibility(eventName)}
                      colorScheme="blue"
                    />
                    <Text fontSize="sm" color="gray.500">Public</Text>
                  </HStack>
                </FormControl>
              ))}
            </VStack>
          </VStack>

          <Divider />

          <Button 
            bg="blue.500"
            _hover={{
              bg: "blue.600"
            }}
            color="white"
            size="md"
            onClick={handleSaveChanges}
            alignSelf="center"
            border="none"
            _focus={{ boxShadow: 'none' }}
            borderRadius="lg"
            mt={4}
          >
            Save Changes
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PrivacySettings; 