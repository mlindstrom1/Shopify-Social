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
  HStack
} from '@chakra-ui/react';

const NotificationSettings: React.FC = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [emailNotifications, setEmailNotifications] = useState({
    eventReminders: true,
    newMessages: true,
    groupUpdates: false,
    newsletter: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    eventInvites: true,
    directMessages: true,
    groupActivity: true,
    mentions: true
  });

  const toggleEmailNotification = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePushNotification = (key: keyof typeof pushNotifications) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={8} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Email Notifications
          </Text>
          <VStack spacing={4} align="stretch">
            {Object.entries(emailNotifications).map(([key, value]) => (
              <HStack key={key} justify="space-between">
                <Text>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                <Switch
                  isChecked={value}
                  onChange={() => toggleEmailNotification(key as keyof typeof emailNotifications)}
                  colorScheme="blue"
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Push Notifications
          </Text>
          <VStack spacing={4} align="stretch">
            {Object.entries(pushNotifications).map(([key, value]) => (
              <HStack key={key} justify="space-between">
                <Text>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
                <Switch
                  isChecked={value}
                  onChange={() => togglePushNotification(key as keyof typeof pushNotifications)}
                  colorScheme="blue"
                />
              </HStack>
            ))}
          </VStack>
        </Box>

        <Button colorScheme="blue" alignSelf="flex-start">
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
};

export default NotificationSettings; 