import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Button,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Tabs,
  TabList,
  Tab
} from '@chakra-ui/react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { allEvents, isEventPast } from '../components/events'
import { Group } from '../components/ExploreGroups'
import HeroSection from './HeroSection'
import EventCard from './EventCard'
import LocationSelector from './LocationSelector'
import GroupCard from './GroupCard'
import ActivityFeed from './ActivityFeed'
import CreateEventButton from './CreateEventButton'

interface SectionContentProps {
  path: string;
  children?: React.ReactNode;
}

// Mock data for suggested groups
const suggestedGroups: Group[] = [
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
    role: 'member',
    guidelines: [
      'Be respectful',
      'No spoilers',
      'Must love books',
      'Bring your favorite book'
    ]
  },
  {
    id: '2',
    name: 'Tech Enthusiasts Toronto',
    description: 'A community of tech professionals and enthusiasts in Toronto',
    members: 250,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Weekly',
    organizer: 'Sarah Chen',
    role: 'member'
  },
  {
    id: '3',
    name: 'Toronto Developers Network',
    description: 'Connect with fellow developers in the Greater Toronto Area',
    members: 180,
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Bi-weekly',
    organizer: 'Alex Rodriguez',
    role: 'member'
  },
  {
    id: '4',
    name: 'Board Game Enthusiasts',
    description: 'From classic board games to the latest releases',
    members: 150,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Weekly',
    organizer: 'David Chen',
    role: 'member'
  },
  {
    id: '5',
    name: 'Digital Marketing Pros',
    description: 'Share digital marketing strategies and industry trends',
    members: 185,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800',
    location: 'Toronto, ON',
    meetingFrequency: 'Bi-weekly',
    organizer: 'Mark Johnson',
    role: 'member'
  }
];

const sections: Record<string, { title: string; paths?: string[]; tabs?: string[] }> = {
  '/home': {
    title: 'Home',
  },
  '/events': {
    title: 'Events',
    paths: ['explore-events', 'my-events', 'create-event'],
    tabs: ['Explore Events', 'My Events', 'Create Event']
  },
  '/groups': {
    title: 'Groups',
    paths: ['explore-groups', 'my-groups', 'create-group'],
    tabs: ['Explore Groups', 'My Groups', 'Create Group']
  },
  '/activity-feed': {
    title: 'Activity Feed',
    paths: ['all', 'groups', 'events'],
    tabs: ['All Activity', 'Groups', 'Events']
  },
  '/settings': {
    title: 'Settings',
    paths: ['general', 'security-privacy', 'notifications'],
    tabs: ['General', 'Security & Privacy', 'Notifications']
  }
};

const SectionContent: React.FC<SectionContentProps> = ({ path, children }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const section = sections[path as keyof typeof sections]
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
    .filter(event => {
      // Extract city from userLocation (e.g., "Toronto" from "Toronto, Canada")
      const userCity = userLocation.split(',')[0].trim();
      return event.location.toLowerCase().includes(userCity.toLowerCase());
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleTabChange = (index: number) => {
    if (section.paths) {
      navigate(`${path}/${section.paths[index]}`);
    }
  }

  return (
    <>
      <Box 
        position="sticky" 
        top={0} 
        px={6}
        zIndex={2}
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Box position="relative" height={0}>
          <Box position="absolute" top={2} right={0}>
            <CreateEventButton />
          </Box>
        </Box>
      </Box>
      {path === '/home' ? (
        <VStack spacing={12} width="100%" align="stretch" pl={6} pr={6}>
          <Box position="relative">
            <HeroSection />
          </Box>
          
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
              <Heading size="lg">Recent Activity</Heading>
              <Button
                rightIcon={<Icon as={FaArrowRight} />}
                variant="ghost"
                colorScheme="blue"
                onClick={() => navigate('/activity-feed/all')}
              >
                View All
              </Button>
            </HStack>
            <Box>
              <ActivityFeed filter="all" showHeader={false} />
            </Box>
          </Box>
        </VStack>
      ) : path === '/events' || path === '/groups' || path === '/activity-feed' || path === '/settings' ? (
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
                  {section.tabs?.map((tab: string, i: number) => (
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
                  {path !== '/activity-feed' && <Heading size="lg" mb={8}>{getTabHeader()}</Heading>}
                  {children || <Outlet />}
                </Box>
              </Tabs>
            </Box>
          </VStack>
        </Box>
      ) : null}
    </>
  );
}

export default SectionContent 