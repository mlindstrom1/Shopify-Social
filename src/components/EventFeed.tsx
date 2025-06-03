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
  Spacer,
  Image,
  SimpleGrid
} from '@chakra-ui/react'
import { FaUserPlus, FaComment, FaThumbsUp, FaShare, FaCalendarCheck, FaCamera, FaHeart } from 'react-icons/fa'
import { format } from 'date-fns'
import { useState } from 'react'

interface EventActivity {
  id: string;
  type: 'attend' | 'comment' | 'like' | 'share' | 'photo' | 'check_in';
  user: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  content?: string;
  photos?: string[];
  privacy: 'Public' | 'Members Only' | 'Private';
  eventName?: string;
  likes?: number;
  comments?: number;
}

interface EventFeedProps {
  eventId: string;
  eventTitle: string;
}

// Mock data for event activities
const generateEventActivities = (eventId: string, eventTitle: string): EventActivity[] => [
  {
    id: '1',
    type: 'attend',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    content: `Just signed up for ${eventTitle}! Looking forward to meeting everyone there.`,
    privacy: 'Public',
    eventName: eventTitle,
    likes: 8,
    comments: 2
  },
  {
    id: '2',
    type: 'comment',
    user: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    content: 'This looks like a great event! What should I bring?',
    privacy: 'Public',
    eventName: eventTitle,
    likes: 5,
    comments: 1
  },
  {
    id: '3',
    type: 'photo',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    content: 'Getting ready for the event! Here are some photos from last time.',
    photos: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400'
    ],
    privacy: 'Public',
    eventName: eventTitle,
    likes: 15,
    comments: 4
  },
  {
    id: '4',
    type: 'share',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    content: `Shared ${eventTitle} with my network. This is going to be amazing!`,
    privacy: 'Public',
    eventName: eventTitle,
    likes: 12,
    comments: 3
  },
  {
    id: '5',
    type: 'check_in',
    user: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    content: 'Checked in early! The venue looks great. See you all soon!',
    privacy: 'Public',
    eventName: eventTitle,
    likes: 20,
    comments: 6
  },
  {
    id: '6',
    type: 'like',
    user: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    content: `Liked ${eventTitle}. Can't wait to attend!`,
    privacy: 'Public',
    eventName: eventTitle,
    likes: 7,
    comments: 1
  }
];

const EventFeed: React.FC<EventFeedProps> = ({ eventId, eventTitle }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [activities] = useState<EventActivity[]>(generateEventActivities(eventId, eventTitle));
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const handleLike = (activityId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(activityId)) {
        newLiked.delete(activityId);
      } else {
        newLiked.add(activityId);
      }
      return newLiked;
    });
  };

  const getActivityIcon = (type: EventActivity['type']) => {
    switch (type) {
      case 'attend':
        return FaUserPlus;
      case 'comment':
        return FaComment;
      case 'like':
        return FaHeart;
      case 'share':
        return FaShare;
      case 'photo':
        return FaCamera;
      case 'check_in':
        return FaCalendarCheck;
      default:
        return FaUserPlus;
    }
  };

  const getActivityText = (activity: EventActivity) => {
    switch (activity.type) {
      case 'attend':
        return 'is attending this event';
      case 'comment':
        return 'commented on this event';
      case 'like':
        return 'liked this event';
      case 'share':
        return 'shared this event';
      case 'photo':
        return 'shared photos for this event';
      case 'check_in':
        return 'checked in to this event';
      default:
        return 'performed an action';
    }
  };

  const getPrivacyBadgeProps = (privacy: EventActivity['privacy']) => {
    switch (privacy) {
      case 'Public':
        return {
          bgGradient: 'linear(to-r, green.400, teal.400)',
          color: 'white'
        };
      case 'Members Only':
        return {
          bgGradient: 'linear(to-r, blue.400, cyan.400)',
          color: 'white'
        };
      case 'Private':
        return {
          bgGradient: 'linear(to-r, red.400, pink.400)',
          color: 'white'
        };
      default:
        return {
          bgGradient: 'linear(to-r, gray.400, gray.500)',
          color: 'white'
        };
    }
  };

  return (
    <Box>
      <Box
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
      >
        <VStack spacing={0} align="stretch" divider={<Divider />}>
          {activities.map((activity) => (
            <Box key={activity.id} p={6}>
              <HStack spacing={4} align="flex-start">
                <Avatar size="md" name={activity.user.name} src={activity.user.avatar} />
                <VStack align="stretch" flex={1} spacing={3}>
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
                    <Text color={textColor} lineHeight="1.6">
                      {activity.content}
                    </Text>
                  )}
                  
                  {activity.photos && (
                    <Box mt={2}>
                      <SimpleGrid columns={Math.min(3, activity.photos.length)} spacing={2} maxW="100%">
                        {activity.photos.map((photo, index) => (
                          <Box
                            key={index}
                            position="relative"
                            width="100%"
                            paddingBottom="56.25%" // 16:9 aspect ratio
                            overflow="hidden"
                          >
                            <Image
                              position="absolute"
                              top={0}
                              left={0}
                              width="100%"
                              height="100%"
                              src={`${photo}?w=300&h=169&fit=crop&crop=edges`}
                              alt={`Event photo ${index + 1}`}
                              objectFit="cover"
                              borderRadius="md"
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  
                  <HStack spacing={6} fontSize="sm" color={textColor}>
                    <HStack spacing={1}>
                      <Icon as={getActivityIcon(activity.type)} />
                      <Text>{format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}</Text>
                    </HStack>
                    
                    <HStack spacing={4}>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Icon as={FaHeart} color={likedPosts.has(activity.id) ? "red.500" : "gray.400"} />}
                        color={textColor}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                        onClick={() => handleLike(activity.id)}
                      >
                        {(activity.likes || 0) + (likedPosts.has(activity.id) ? 1 : 0)}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Icon as={FaComment} color="gray.400" />}
                        color={textColor}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        {activity.comments || 0}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<Icon as={FaShare} color="gray.400" />}
                        color={textColor}
                        _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                      >
                        Share
                      </Button>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
        
        <Box p={4} textAlign="center" borderTop="1px" borderColor={borderColor}>
          <Button
            variant="outline"
            size="sm"
            colorScheme="blue"
          >
            Load More Activity
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventFeed; 