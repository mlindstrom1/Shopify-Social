import { Box, VStack, Text, Heading, Divider, useColorModeValue, HStack, Avatar, Icon } from '@chakra-ui/react'
import { InfoIcon, CalendarIcon, ChatIcon } from '@chakra-ui/icons'

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'event',
    title: "Event Reminder",
    message: "Tech Meetup Toronto starts in 2 hours at MaRS Discovery District",
    time: "Just now",
    icon: CalendarIcon,
    color: "blue.500",
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    }
  },
  {
    id: 2,
    type: 'social',
    title: "New Comment",
    message: "Alex Rodriguez commented on your event post",
    time: "5 min ago",
    icon: ChatIcon,
    color: "green.500",
    user: {
      name: "Alex Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=alex"
    }
  },
  {
    id: 3,
    type: 'update',
    title: "Venue Change",
    message: "Downtown Dev Social location updated to The Drake Hotel",
    time: "1 hour ago",
    icon: InfoIcon,
    color: "orange.500",
    user: {
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?u=emily"
    }
  }
]

const NotificationsPanel = ({ isOpen, onClose }: NotificationsPanelProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const hoverBg = useColorModeValue('gray.50', 'gray.700')

  if (!isOpen) return null

  return (
    <Box
      position="fixed"
      top="60px"
      right="20px"
      width="400px"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="xl"
      border="1px"
      borderColor={borderColor}
      p={4}
      zIndex={1000}
    >
      <Heading size="md" mb={4}>Notifications</Heading>
      <VStack spacing={2} align="stretch">
        {notifications.map((notification) => (
          <Box 
            key={notification.id}
            p={3}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: hoverBg }}
            transition="background-color 0.2s"
          >
            <HStack spacing={4} align="flex-start">
              <Avatar 
                size="sm" 
                name={notification.user.name}
                src={notification.user.avatar}
              />
              <Box flex={1}>
                <HStack spacing={2} mb={1}>
                  <Icon as={notification.icon} color={notification.color} />
                  <Text fontWeight="bold" fontSize="sm">{notification.title}</Text>
                </HStack>
                <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="sm">
                  {notification.message}
                </Text>
                <Text color={useColorModeValue('gray.400', 'gray.500')} fontSize="xs" mt={1}>
                  {notification.time}
                </Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default NotificationsPanel 