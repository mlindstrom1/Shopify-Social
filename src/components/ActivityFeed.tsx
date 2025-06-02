import {
  VStack,
  Box,
  HStack,
  Avatar,
  Text,
  Button,
  Icon,
  Image,
  useColorModeValue,
  Badge,
  Spacer,
  SimpleGrid
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaHeart, FaComment, FaShare, FaCalendar, FaUsers, FaMapMarkerAlt, FaSlack } from 'react-icons/fa'
import { exploreGroups } from './ExploreGroups'
import { allEvents } from './events'
import { format } from 'date-fns'
import ActivityFeedHeader from './ActivityFeedHeader'

interface ActivityPost {
  id: string
  type: 'event_created' | 'event_rsvp' | 'group_joined' | 'group_post' | 'event_photo' | 'group_photo'
  user: {
    id: string
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  media?: {
    type: 'image' | 'link'
    url?: string
    title?: string
    urls?: string[]
  }
  eventId?: string
  groupId?: string
  location?: string
  source?: {
    type: 'slack'
  }
  privacy: 'Public' | 'Members Only' | 'Private'
}

interface ActivityFeedProps {
  filter?: 'all' | 'events' | 'groups' | 'following';
  showHeader?: boolean;
}

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

// Generate realistic activity data based on our existing users, groups, and events
const activityFeed: ActivityPost[] = [
  {
    id: '1',
    type: 'event_created',
    user: {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    content: 'Just created a new tech workshop! Join us for "Introduction to AI & Machine Learning" next week.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 24,
    comments: 8,
    eventId: allEvents[0].id,
    location: 'Toronto, ON',
    source: {
      type: 'slack'
    },
    privacy: 'Public'
  },
  {
    id: '2',
    type: 'group_post',
    user: {
      id: '2',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    content: 'Just discovered an amazing new ramen place downtown! Who wants to join for a group dinner next week?',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 15,
    comments: 3,
    groupId: exploreGroups[1].id,
    location: 'Toronto, ON',
    privacy: 'Members Only'
  },
  {
    id: '3',
    type: 'group_photo',
    user: {
      id: '3',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    content: 'Added 3 new photos from our last meetup',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    likes: 42,
    comments: 12,
    media: {
      type: 'image',
      urls: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
        'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429'
      ]
    },
    groupId: exploreGroups[2].id,
    location: 'Toronto, ON',
    privacy: 'Members Only',
    source: {
      type: 'slack'
    }
  },
  {
    id: '7',
    type: 'group_photo',
    user: {
      id: '7',
      name: 'James Wilson',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100'
    },
    content: 'Great game yesterday! Here are some highlights from our match',
    timestamp: new Date(Date.now() - 12000000).toISOString(),
    likes: 38,
    comments: 16,
    media: {
      type: 'image',
      urls: [
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018'
      ]
    },
    groupId: exploreGroups[4].id,
    location: 'Toronto, ON',
    privacy: 'Public'
  },
  {
    id: '4',
    type: 'event_created',
    user: {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    content: 'Created a new event: Board Game Night - June Edition',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    likes: 31,
    comments: 15,
    eventId: allEvents[2].id,
    location: 'Toronto, ON',
    privacy: 'Public'
  },
  {
    id: '5',
    type: 'event_created',
    user: {
      id: '5',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    content: 'Created a new event: AI & Machine Learning Workshop',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    likes: 8,
    comments: 2,
    eventId: allEvents[4].id,
    location: 'Toronto, ON',
    privacy: 'Public'
  },
  {
    id: '6',
    type: 'group_joined',
    user: {
      id: '6',
      name: 'Lisa Wang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    content: 'Joined Yoga & Wellness',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    likes: 56,
    comments: 23,
    groupId: exploreGroups[3].id,
    location: 'Toronto, ON',
    privacy: 'Public'
  }
]

const ActivityFeed: React.FC<ActivityFeedProps> = ({ filter = 'all', showHeader = true }) => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

  const filteredPosts = activityFeed.filter(post => {
    switch (filter) {
      case 'events':
        return post.type.includes('event');
      case 'groups':
        return post.type.includes('group');
      case 'following':
        // For now, show all posts in following feed
        return true;
      default:
        return true;
    }
  });

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(postId)) {
        newLiked.delete(postId)
      } else {
        newLiked.add(postId)
      }
      return newLiked
    })
  }

  const getActivityIcon = (type: ActivityPost['type']) => {
    switch (type) {
      case 'event_created':
      case 'event_rsvp':
        return FaCalendar
      case 'group_joined':
      case 'group_post':
        return FaUsers
      case 'event_photo':
      case 'group_photo':
        return FaShare
      default:
        return FaUsers
    }
  }

  const getPrivacyColor = (privacy: ActivityPost['privacy']) => {
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
    <VStack spacing={6} align="stretch" width="100%" pb={8}>
      {showHeader && <ActivityFeedHeader />}
      {filteredPosts.map(post => (
        <Box
          key={post.id}
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
        >
          <Box p={6}>
            <HStack spacing={4} mb={4}>
              <Avatar size="md" src={post.user.avatar} name={post.user.name} />
              <Box flex="1">
                <HStack spacing={2}>
                  <Text fontWeight="bold">{post.user.name}</Text>
                  {getActivityIcon(post.type) && (
                    <Icon as={getActivityIcon(post.type)} color="blue.500" />
                  )}
                  <Spacer />
                  <Badge colorScheme={getPrivacyColor(post.privacy)} size="sm">
                    {post.privacy}
                  </Badge>
                </HStack>
                <HStack spacing={2} color={textColor} fontSize="sm">
                  <Text>{format(new Date(post.timestamp), 'MMM d, yyyy h:mm a')}</Text>
                  {post.location && (
                    <>
                      <Text>•</Text>
                      <HStack spacing={1}>
                        <Icon as={FaMapMarkerAlt} />
                        <Text>{post.location}</Text>
                      </HStack>
                    </>
                  )}
                  {post.source?.type === 'slack' && (
                    <>
                      <Text>•</Text>
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
                    </>
                  )}
                </HStack>
              </Box>
            </HStack>

            <Text mb={4}>{post.content}</Text>

            {post.media && post.media.type === 'image' && (
              <Box mb={4}>
                <SimpleGrid columns={post.media.urls ? Math.min(post.media.urls.length, 4) : 1} spacing={2}>
                  {post.media.urls ? (
                    post.media.urls.map((url, index) => (
                      <Box
                        key={index}
                        position="relative"
                        width="100%"
                        paddingBottom="56.25%"
                        overflow="hidden"
                      >
                        <Image
                          position="absolute"
                          top={0}
                          left={0}
                          width="100%"
                          height="100%"
                          src={`${url}?w=300&h=169&fit=crop&crop=edges`}
                          alt="Activity"
                          objectFit="cover"
                          borderRadius="lg"
                        />
                      </Box>
                    ))
                  ) : (
                    <Box
                      position="relative"
                      width="100%"
                      paddingBottom="56.25%"
                      overflow="hidden"
                    >
                      <Image
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        src={`${post.media.url}?w=300&h=169&fit=crop&crop=edges`}
                        alt="Activity"
                        objectFit="cover"
                        borderRadius="lg"
                      />
                    </Box>
                  )}
                </SimpleGrid>
              </Box>
            )}

            <HStack spacing={4} mb={2}>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon as={FaHeart} color={likedPosts.has(post.id) ? 'red.500' : 'gray.500'} />}
                onClick={() => handleLike(post.id)}
              >
                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon as={FaComment} color="gray.500" />}
              >
                {post.comments}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<Icon as={FaShare} color="gray.500" />}
              >
                Share
              </Button>
            </HStack>
          </Box>
        </Box>
      ))}
    </VStack>
  )
}

export default ActivityFeed 