import {
  VStack,
  Box,
  HStack,
  Avatar,
  Text,
  Button,
  Icon,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaHeart, FaComment, FaShare, FaCalendar, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { exploreGroups } from './ExploreGroups'
import { allEvents } from './events'

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
    url: string
    title?: string
  }
  eventId?: string
  groupId?: string
  location?: string
}

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
    location: 'Toronto, ON'
  },
  {
    id: '2',
    type: 'group_joined',
    user: {
      id: '2',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    content: 'Joined Toronto Developers Network',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    likes: 15,
    comments: 3,
    groupId: exploreGroups[1].id
  },
  {
    id: '3',
    type: 'event_photo',
    user: {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    content: 'Great turnout at our latest Board Game Night! Thanks everyone for coming!',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    likes: 42,
    comments: 12,
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800'
    },
    eventId: allEvents[2].id,
    location: 'Toronto, ON'
  },
  {
    id: '4',
    type: 'group_post',
    user: {
      id: '4',
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    content: 'Excited to announce our next hackathon in the Tech Enthusiasts Toronto group! Get ready for 24 hours of coding, innovation, and fun.',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    likes: 31,
    comments: 15,
    groupId: exploreGroups[0].id,
    location: 'Toronto, ON'
  },
  {
    id: '5',
    type: 'event_rsvp',
    user: {
      id: '5',
      name: 'Lisa Chang',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    content: 'Just RSVP\'d to "Mindful Morning Meditation" session',
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    likes: 8,
    comments: 2,
    eventId: allEvents[4].id,
    location: 'New York, NY'
  },
  {
    id: '6',
    type: 'group_photo',
    user: {
      id: '6',
      name: 'Mike Zhang',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    content: 'Some shots from our latest Blockchain Innovators meetup. Amazing discussions about the future of Web3!',
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    likes: 56,
    comments: 23,
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800'
    },
    groupId: exploreGroups[18].id,
    location: 'San Francisco, CA'
  },
  {
    id: '7',
    type: 'event_created',
    user: {
      id: '7',
      name: 'Julia Martinez',
      avatar: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=100'
    },
    content: 'New workshop alert! Join us for "Advanced Cooking Techniques" this weekend.',
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    likes: 19,
    comments: 7,
    eventId: allEvents[5].id,
    location: 'Seattle, WA'
  },
  {
    id: '8',
    type: 'group_post',
    user: {
      id: '8',
      name: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100'
    },
    content: 'Looking for beta testers for our new mobile app! Join the Mobile App Developers group to participate.',
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    likes: 27,
    comments: 14,
    groupId: exploreGroups[14].id,
    location: 'Seattle, WA'
  }
]

const ActivityFeed = () => {
  const navigate = useNavigate()
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.400')

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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor(diff / (1000 * 60))

    if (hours >= 24) {
      return date.toLocaleDateString()
    } else if (hours >= 1) {
      return `${hours}h ago`
    } else {
      return `${minutes}m ago`
    }
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

  return (
    <VStack spacing={6} align="stretch" width="100%" pb={8}>
      {activityFeed.map(post => (
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
                </HStack>
                <HStack spacing={2} color={textColor} fontSize="sm">
                  <Text>{formatTimestamp(post.timestamp)}</Text>
                  {post.location && (
                    <>
                      <Text>•</Text>
                      <HStack spacing={1}>
                        <Icon as={FaMapMarkerAlt} />
                        <Text>{post.location}</Text>
                      </HStack>
                    </>
                  )}
                </HStack>
              </Box>
            </HStack>

            <Text mb={4}>{post.content}</Text>

            {post.media && post.media.type === 'image' && (
              <Box mb={4} borderRadius="lg" overflow="hidden">
                <Image src={post.media.url} alt="Activity" width="100%" />
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