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
  Heading,
  SimpleGrid,
  Flex
} from '@chakra-ui/react'
import { FaUserPlus, FaComment, FaThumbsUp, FaShare, FaCalendarCheck, FaCamera, FaUsers } from 'react-icons/fa'
import { format } from 'date-fns'
import { useLocation } from 'react-router-dom'

interface Activity {
  id: string;
  type: 'join' | 'comment' | 'photo' | 'event' | 'post';
  user: {
    name: string;
    avatar: string;
  };
  group?: {
    name: string;
    image: string;
  };
  timestamp: string;
  content?: string;
  photos?: string[];
  privacy: 'Public' | 'Members Only' | 'Private';
  slack_import?: boolean;
}

// Mock data for group activities
const mockActivities: Activity[] = [
  {
    id: '4',
    type: 'post',
    user: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    group: {
      name: 'Toronto Foodies',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4b?w=800'
    },
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    content: 'Just discovered an amazing new ramen place downtown! Who wants to join for a group dinner next week?',
    privacy: 'Members Only',
    slack_import: true
  },
  {
    id: '1',
    type: 'join',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    group: {
      name: 'Toronto Tech Meetup',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800'
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    privacy: 'Public'
  },
  {
    id: '2',
    type: 'photo',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    group: {
      name: 'Photography Enthusiasts',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800'
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    content: 'Added 3 new photos from our last meetup',
    photos: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400'
    ],
    privacy: 'Members Only',
    slack_import: true
  },
  {
    id: '3',
    type: 'event',
    user: {
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    group: {
      name: 'Board Game Nights',
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800'
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    content: 'Created a new event: Board Game Night - June Edition',
    privacy: 'Public'
  },
  {
    id: '5',
    type: 'event',
    user: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    group: {
      name: 'Toronto Tech Meetup',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800'
    },
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    content: 'Created a new event: AI & Machine Learning Workshop',
    privacy: 'Public'
  },
  {
    id: '6',
    type: 'join',
    user: {
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    group: {
      name: 'Yoga & Wellness',
      image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800'
    },
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    privacy: 'Public'
  },
  {
    id: '7',
    type: 'photo',
    user: {
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100'
    },
    group: {
      name: 'Toronto Social Sports',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'
    },
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    content: 'Great game yesterday! Here are some highlights',
    photos: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
    ],
    privacy: 'Public'
  },
  {
    id: '8',
    type: 'post',
    user: {
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    group: {
      name: 'Toronto Artists Collective',
      image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
    },
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    content: 'Opening our new exhibition next week! Everyone is welcome to join the vernissage on Friday evening.',
    privacy: 'Public'
  }
];

const SlackLogo = () => (
  <svg width="16" height="16" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
      <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
      <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
      <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
    </g>
  </svg>
)

const GroupActivityFeed = () => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const location = useLocation()
  const currentTab = location.pathname.split('/').pop() || 'all'

  const filteredActivities = mockActivities.filter(activity => {
    switch (currentTab) {
      case 'groups':
        return activity.type === 'join' || activity.type === 'post'
      case 'events':
        return activity.type === 'event'
      default:
        return true
    }
  })

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'join':
        return FaUserPlus
      case 'comment':
        return FaComment
      case 'photo':
        return FaCamera
      case 'event':
        return FaCalendarCheck
      case 'post':
        return FaComment
      default:
        return FaUsers
    }
  }

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'join':
        return `joined ${activity.group?.name}`
      case 'comment':
        return `commented in ${activity.group?.name}`
      case 'photo':
        return `shared photos in ${activity.group?.name}`
      case 'event':
        return `created an event in ${activity.group?.name}`
      case 'post':
        return `posted in ${activity.group?.name}`
      default:
        return 'performed an action'
    }
  }

  const getPrivacyColor = (privacy: Activity['privacy']) => {
    switch (privacy) {
      case 'Public':
        return 'green'
      case 'Members Only':
        return 'blue'
      case 'Private':
        return 'red'
      default:
        return 'gray'
    }
  }

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
          {filteredActivities.map((activity) => (
            <Box key={activity.id} p={4}>
              <HStack spacing={4} align="flex-start">
                <Avatar size="md" name={activity.user.name} src={activity.user.avatar} />
                <VStack align="stretch" flex={1} spacing={2}>
                  <HStack>
                    <Text fontWeight="bold">{activity.user.name}</Text>
                    <Text color={textColor}>{getActivityText(activity)}</Text>
                    <Spacer />
                    <Badge colorScheme={getPrivacyColor(activity.privacy)} size="sm">
                      {activity.privacy}
                    </Badge>
                  </HStack>
                  {activity.content && (
                    <Text color={textColor}>{activity.content}</Text>
                  )}
                  {activity.photos && (
                    <Box mt={2}>
                      <SimpleGrid columns={Math.min(3, activity.photos.length)} spacing={3}>
                        {activity.photos.map((photo, index) => (
                          <Box
                            key={index}
                            position="relative"
                            paddingTop="100%"
                            overflow="hidden"
                            borderRadius="md"
                          >
                            <Image
                              position="absolute"
                              top={0}
                              left={0}
                              width="100%"
                              height="100%"
                              src={photo}
                              alt={`Activity photo ${index + 1}`}
                              objectFit="cover"
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    </Box>
                  )}
                  <HStack spacing={4} fontSize="sm" color={textColor}>
                    <Icon as={getActivityIcon(activity.type)} />
                    <Text>{format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}</Text>
                    {activity.slack_import && (
                      <HStack spacing={1} alignItems="center">
                        <Box display="flex" alignItems="center">
                          <SlackLogo />
                        </Box>
                        <Text 
                          color="blue.500" 
                          textDecoration="underline" 
                          cursor="pointer"
                          _hover={{ color: 'blue.600' }}
                        >
                          Imported from Slack
                        </Text>
                      </HStack>
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default GroupActivityFeed 