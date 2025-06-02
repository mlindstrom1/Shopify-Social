import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  Text,
  Avatar,
  Divider,
  Spacer,
  Badge,
  Image,
  Flex
} from '@chakra-ui/react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowRight, FaUsers, FaUserPlus, FaCalendarCheck, FaCamera, FaComment, FaThumbsUp, FaShare, FaSlack } from 'react-icons/fa'
import { allEvents, isEventPast } from './events'
import HeroSection from './HeroSection'
import EventCard from './EventCard'
import LocationSelector from './LocationSelector'
import GroupCard from './GroupCard'
import { Activity } from '../types/Activity'
import FeedPost from './FeedPost'
import { format } from 'date-fns'

interface SectionContentProps {
  path: string;
  children?: React.ReactNode;
}

const sections: Record<string, { name: string; tabs: string[]; paths?: string[] }> = {
  '/home': {
    name: 'Home',
    tabs: ['For You', 'Following', 'Trending', 'Activity'],
    paths: ['', 'following', 'trending', 'activity']
  },
  '/events': {
    name: 'Events',
    tabs: ['Explore Events', 'My Events', 'Create Event'],
    paths: ['explore-events', 'my-events', 'create-event']
  },
  '/groups': {
    name: 'Groups',
    tabs: ['Explore Groups', 'My Groups', 'Create Group'],
    paths: ['explore-groups', 'my-groups', 'create-group']
  },
  '/activity-feed': {
    name: 'Activity Feed',
    tabs: ['All Activity', 'Groups', 'Events'],
    paths: ['all', 'groups', 'events']
  },
  '/settings': {
    name: 'Settings',
    tabs: ['General', 'Security & Privacy', 'Notifications'],
    paths: ['general', 'security-privacy', 'notifications']
  }
};

// Mock data interface
interface FeedActivity {
  id: string;
  type: 'join' | 'photo' | 'event';
  user: {
    name: string;
    avatar: string;
  };
  group?: {
    name: string;
    image: string;
  };
  content?: string;
  timestamp: string;
  privacy: 'Public' | 'Members Only';
  photos?: string[];
  source?: {
    type: 'slack';
  };
}

// Mock data for the activity feed
const mockActivities: FeedActivity[] = [
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
    content: 'Just joined the Toronto Tech Meetup group! Looking forward to connecting with fellow developers.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    privacy: 'Public',
    source: {
      type: 'slack'
    }
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
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    content: 'Great game yesterday! Here are some highlights',
    photos: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400'
    ],
    privacy: 'Public'
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
    content: 'Excited to announce our next Board Game Night! Check out the event details.',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    privacy: 'Public'
  }
];

// Mock data for suggested groups
const suggestedGroups = [
  {
    id: '1',
    name: 'Book & Coffee Club',
    description: 'Monthly book discussions over coffee in a cozy atmosphere',
    members: 85,
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Monthly',
    organizer: 'Emma Wilson',
    role: 'member'
  },
  {
    id: '2',
    name: 'Social Volleyball',
    description: 'Casual volleyball meetups for all skill levels',
    members: 120,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Weekly',
    organizer: 'Mike Chen',
    role: 'member'
  },
  {
    id: '3',
    name: 'Cooking Together',
    description: 'Learn and share recipes while making new friends',
    members: 95,
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Bi-weekly',
    organizer: 'Sarah Martinez',
    role: 'member'
  },
  {
    id: '4',
    name: 'Photography Walks',
    description: 'Explore the city and capture moments with fellow photographers',
    members: 75,
    category: 'Arts',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Weekly',
    organizer: 'Chris Lee',
    role: 'member'
  },
  {
    id: '5',
    name: 'Board Game Night',
    description: 'Regular meetups for board games and social interaction',
    members: 110,
    category: 'Games',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Weekly',
    organizer: 'David Chen',
    role: 'member'
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

const SectionContent: React.FC<SectionContentProps> = ({ path, children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const section = sections[path]
  const [userLocation, setUserLocation] = useState("Toronto, Canada")

  if (!section) return null;

  const currentPath = location.pathname.split('/').pop() || '';
  const tabIndex = section.paths ? section.paths.indexOf(currentPath) : 0;

  const getTabHeader = () => {
    if (path === '/events') {
      switch (currentPath) {
        case 'explore-events':
          return 'Explore Events';
        case 'my-events':
          return 'My Events';
        case 'create-event':
          return 'Create a New Event';
        default:
          return '';
      }
    }
    if (path === '/groups') {
      switch (currentPath) {
        case 'explore-groups':
          return 'Explore Groups';
        case 'my-groups':
          return 'My Groups';
        case 'create-group':
          return 'Create a New Group';
        default:
          return '';
      }
    }
    return '';
  };

  // Get specific events for the home page
  const selectedEvents = allEvents
    .filter(event => !isEventPast(event))
    .filter(event => event.location.includes('Toronto'))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleTabChange = (index: number) => {
    if (section.paths) {
      navigate(`${path}/${section.paths[index]}`);
    }
  }

  if (path === '/home') {
    return (
      <VStack spacing={12} width="100%" align="stretch" pl={6} pr={6}>
        <HeroSection />
        
        {/* Events Near You */}
        <Box>
          <HStack justify="space-between" mb={8}>
            <HStack spacing={4}>
              <Heading size="lg">Events Near You</Heading>
              <LocationSelector 
                currentLocation={userLocation}
                onLocationChange={setUserLocation}
              />
            </HStack>
            <Button
              rightIcon={<Icon as={FaArrowRight} />}
              variant="ghost"
              colorScheme="blue"
              onClick={() => navigate('/events/explore-events')}
            >
              View All Events
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {selectedEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                showPreview={true} 
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Suggested Groups */}
        <Box>
          <HStack justify="space-between" mb={6}>
            <Heading size="lg">Suggested Groups</Heading>
            <Button
              rightIcon={<Icon as={FaArrowRight} />}
              variant="ghost"
              colorScheme="blue"
              onClick={() => navigate('/groups/explore-groups')}
            >
              View All
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}>
            {suggestedGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Activity Feed */}
        <Box>
          <HStack justify="space-between" mb={6}>
            <Heading size="lg">Activity Feed</Heading>
            <Button
              as="a"
              href="/activity-feed/all"
              rightIcon={<Icon as={FaArrowRight} />}
              variant="ghost"
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                navigate('/activity-feed/all');
              }}
            >
              View All
            </Button>
          </HStack>
          <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderWidth="1px"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            borderRadius="lg"
            overflow="hidden"
          >
            <VStack spacing={0} align="stretch" divider={<Divider />}>
              {mockActivities.map((activity) => (
                <Box key={activity.id} p={4}>
                  <HStack spacing={4} align="flex-start">
                    <Avatar size="md" name={activity.user.name} src={activity.user.avatar} />
                    <VStack align="stretch" flex={1} spacing={2}>
                      <HStack>
                        <Text fontWeight="bold">{activity.user.name}</Text>
                        <Text color={useColorModeValue('gray.500', 'gray.400')}>{activity.type === 'join' ? `joined ${activity.group?.name}` : `posted in ${activity.group?.name}`}</Text>
                        <Spacer />
                        <Badge colorScheme={activity.privacy === 'Public' ? 'green' : 'blue'} size="sm">
                          {activity.privacy}
                        </Badge>
                      </HStack>
                      {activity.content && (
                        <Text>{activity.content}</Text>
                      )}
                      {activity.photos && (
                        <SimpleGrid columns={Math.min(2, activity.photos.length)} spacing={2}>
                          {activity.photos.map((photo, index) => (
                            <Image key={index} src={photo} alt={`Activity photo ${index + 1}`} borderRadius="md" />
                          ))}
                        </SimpleGrid>
                      )}
                      <HStack spacing={2} color={useColorModeValue('gray.500', 'gray.400')} fontSize="sm">
                        <Text>{new Date(activity.timestamp).toLocaleString()}</Text>
                        {activity.source?.type === 'slack' && (
                          <>
                            <Text>•</Text>
                            <HStack spacing={1}>
                              <Box display="flex" alignItems="center">
                                <SlackLogo />
                              </Box>
                              <Text color="blue.500">Imported from Slack</Text>
                            </HStack>
                          </>
                        )}
                      </HStack>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </VStack>
    )
  }

  if (path === '/events') {
    return (
      <Box width="100%" minH="100%" pb={8}>
        <VStack spacing={4} align="stretch">
          <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4} px={8}>
            <Tabs 
              index={tabIndex !== -1 ? tabIndex : 0} 
              onChange={handleTabChange}
              variant="unstyled"
              colorScheme="blue"
            >
              <TabList mb={8} ml={-2}>
                {section.tabs.map((tab, i) => (
                  <Tab 
                    key={i} 
                    mr={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    _selected={{ 
                      color: 'blue.600',
                      bg: 'blue.50',
                      borderColor: 'blue.200',
                      fontWeight: 'bold'
                    }}
                    _hover={{
                      bg: 'blue.50'
                    }}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>
              <Box mt={8}>
                <Heading size="lg" mb={8}>{getTabHeader()}</Heading>
                {children || <Outlet />}
              </Box>
            </Tabs>
          </Box>
        </VStack>
      </Box>
    );
  }

  if (path === '/activity-feed') {
    const getActivityTabHeader = () => {
      switch (currentPath) {
        case 'all':
          return 'All Activity';
        case 'groups':
          return 'Groups';
        case 'events':
          return 'Events';
        default:
          return 'All Activity';
      }
    };

    return (
      <Box width="100%" minH="100%" pb={8}>
        <VStack spacing={4} align="stretch">
          <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4} px={8}>
            <Tabs 
              index={tabIndex !== -1 ? tabIndex : 0} 
              onChange={handleTabChange}
              variant="unstyled"
              colorScheme="blue"
            >
              <TabList mb={8} ml={-2}>
                {section.tabs.map((tab, i) => (
                  <Tab 
                    key={i} 
                    mr={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    _selected={{ 
                      color: 'blue.600',
                      bg: 'blue.50',
                      borderColor: 'blue.200',
                      fontWeight: 'bold'
                    }}
                    _hover={{
                      bg: 'blue.50'
                    }}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>
              <Box mt={8}>
                <Heading size="lg" mb={8}>{getActivityTabHeader()}</Heading>
                {children || <Outlet />}
              </Box>
            </Tabs>
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={4} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4} px={8}>
          <Tabs 
            index={tabIndex !== -1 ? tabIndex : 0} 
            onChange={handleTabChange}
            variant="unstyled"
            colorScheme="blue"
          >
            <TabList mb={8} ml={-2}>
              {section.tabs.map((tab, i) => (
                <Tab 
                  key={i} 
                  mr={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  _selected={{ 
                    color: 'blue.600',
                    bg: 'blue.50',
                    borderColor: 'blue.200',
                    fontWeight: 'bold'
                  }}
                  _hover={{
                    bg: 'blue.50'
                  }}
                >
                  {tab}
                </Tab>
              ))}
            </TabList>
            <Box mt={8}>
              <Heading size="lg" mb={8}>{path === '/activity-feed' ? 'Activity Feed' : getTabHeader()}</Heading>
              {children || <Outlet />}
            </Box>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  )
}

export default SectionContent 