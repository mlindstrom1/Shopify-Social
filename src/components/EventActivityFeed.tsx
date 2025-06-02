import {
  Box,
  VStack,
  Text,
  Avatar,
  HStack,
  Badge,
  useColorModeValue,
  Icon,
  Divider,
  Button,
  Spacer
} from '@chakra-ui/react'
import { FaUserPlus, FaComment, FaThumbsUp, FaShare, FaCalendarCheck } from 'react-icons/fa'
import { format } from 'date-fns'

interface Activity {
  id: string;
  type: 'join' | 'comment' | 'like' | 'share' | 'rsvp';
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content?: string;
  privacy: 'Public' | 'Members Only' | 'Private';
}

interface EventActivityFeedProps {
  activities: Activity[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const EventActivityFeed = ({ activities, onLoadMore, hasMore, isLoading }: EventActivityFeedProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'join':
        return FaUserPlus
      case 'comment':
        return FaComment
      case 'like':
        return FaThumbsUp
      case 'share':
        return FaShare
      case 'rsvp':
        return FaCalendarCheck
      default:
        return FaUserPlus
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'join':
        return 'joined the event'
      case 'comment':
        return 'commented'
      case 'like':
        return 'liked this event'
      case 'share':
        return 'shared this event'
      case 'rsvp':
        return 'is attending'
      default:
        return 'performed an action'
    }
  }

  const getPrivacyBadgeProps = (privacy: Activity['privacy']) => {
    switch (privacy) {
      case 'Public':
        return {
          bgGradient: 'linear(to-r, green.400, teal.400)',
          color: 'white'
        }
      case 'Members Only':
        return {
          bgGradient: 'linear(to-r, blue.400, cyan.400)',
          color: 'white'
        }
      case 'Private':
        return {
          bgGradient: 'linear(to-r, red.400, pink.400)',
          color: 'white'
        }
      default:
        return {
          bgGradient: 'linear(to-r, gray.400, gray.500)',
          color: 'white'
        }
    }
  }

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
    >
      <VStack spacing={0} align="stretch" divider={<Divider />}>
        {activities.map((activity) => (
          <Box key={activity.id} p={4}>
            <HStack spacing={4} align="flex-start">
              <Avatar size="md" name={activity.user.name} src={activity.user.avatar} />
              <VStack align="stretch" flex={1} spacing={2}>
                <HStack>
                  <Text fontWeight="bold">{activity.user.name}</Text>
                  <Text color={textColor}>{getActivityText(activity)}</Text>
                  <Spacer />
                  <Badge 
                    {...getPrivacyBadgeProps(activity.privacy)}
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    fontSize="xs"
                  >
                    {activity.privacy}
                  </Badge>
                </HStack>
                {activity.content && (
                  <Text color={textColor}>{activity.content}</Text>
                )}
                <HStack spacing={4} fontSize="sm" color={textColor}>
                  <Icon as={getActivityIcon(activity.type)} />
                  <Text>{format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}</Text>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
      {hasMore && (
        <Box p={4} textAlign="center">
          <Button
            onClick={onLoadMore}
            isLoading={isLoading}
            variant="outline"
            size="sm"
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default EventActivityFeed 