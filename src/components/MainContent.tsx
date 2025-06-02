import React from 'react';
import {
  Box,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
  Text,
  Grid,
  GridItem,
  Button,
  Divider,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Image,
  Badge,
  Icon,
  SimpleGrid,
  Spacer,
  Container,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import AIHelpButton from './AIHelpButton'
import NotificationsPanel from './NotificationsPanel'
import HeroSection from './HeroSection'
import NearbyEvents from './NearbyEvents'
import FeedPost from './FeedPost'
import EventCard from './EventCard'
import CreateEventForm from './CreateEventForm'
import EventDetails from './EventDetails'
import ExploreGroups from './ExploreGroups'
import GroupDetails from './GroupDetails'
import CreateGroup from './CreateGroup'
import GroupActivityFeed from './GroupActivityFeed'
import ActivityFeed from './ActivityFeed'
import { FaUsers, FaLaptopCode, FaBriefcase, FaGraduationCap, FaDice, FaRunning, FaCode, FaGamepad, FaPalette, FaTimes, FaCalendar, FaChalkboardTeacher, FaHandshake, FaLightbulb, FaSearch, FaUtensils, FaMusic, FaMountain, FaHeart, FaArrowRight } from 'react-icons/fa'
import ExploreEvents from './ExploreEvents'
import { allEvents, Event, upcomingEvents, myEvents } from './events'
import GroupCard from './GroupCard'
import LocationIndicator from './LocationIndicator'
import { Activity, EventActivity, GroupActivity } from '../types/Activity'
import { Event as MockEvent, EventType, EventPrivacy, EventStatus, EventMedia, EventAttendee } from '../types/Event'
import { generateMockData } from '../data/mockData'
import { exploreGroups, Group } from './ExploreGroups'
import MyEvents from './MyEvents'
import LocationSelector from './LocationSelector'
import SectionContent from './SectionContent'
import MyGroups from './MyGroups'
import ProfileSettings from './ProfileSettings'
import NotificationSettings from './NotificationSettings'
import PrivacySettings from './PrivacySettings'

interface MainContentProps {
  isNotificationsOpen: boolean;
  onNotificationsOpen: () => void;
}

interface Author {
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  author: Author;
  content: string;
  time: string;
  likes: number;
}

interface Post {
  id: string;
  content: string;
  likes: number;
  author: Author;
  timestamp: string;
  image?: string;
  privacy: 'Public' | 'Members Only' | 'Private';
  link?: string;
}

interface ComponentEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: string;
  venue: {
    name: string;
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    }
  };
  type: EventType;
  image: string;
  attendees: EventAttendee[];
  maxAttendees: number;
  organizer: string;
  price: string;
  groupId: string;
  guidelines: string[];
  topics: string[];
  status: EventStatus;
  privacy: EventPrivacy;
  media: EventMedia[];
  currentAttendees: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Initialize mock data
const mockData = generateMockData();
const { users, groups: rawGroups, events: rawEvents } = mockData;

// Convert mock events to component format
const componentEvents = rawEvents
  .filter((event: MockEvent) => event.location.city.includes('Toronto'))
  .filter((event: MockEvent) => {
    const eventDate = new Date(event.date);
    return eventDate > new Date();
  })
  .slice(0, 3)
  .map((event: MockEvent): Event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    endDate: event.endDate,
    location: event.location.formattedAddress || '',
    venue: {
      name: event.venue.name,
      address: event.venue.address,
      city: event.venue.city,
      coordinates: event.venue.coordinates
    },
    type: event.type,
    privacy: event.privacy,
    status: event.status,
    image: event.image,
    attendees: event.attendees.length,
    maxAttendees: event.maxAttendees,
    currentAttendees: event.attendees.length,
    organizer: typeof event.organizer === 'string' ? event.organizer : event.organizer.name,
    price: event.price,
    topics: event.topics || [],
    guidelines: Array.isArray(event.guidelines) ? event.guidelines : [],
    tags: event.tags || [],
    createdAt: event.createdAt,
    updatedAt: event.updatedAt
  }));

// Convert mock groups to component format
interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  image: string;
  location: string;
  meetingFrequency: string;
  organizer: string;
  role: string;
}

const myGroups = [
  {
    id: "1",
    name: "Toronto Social Sports",
    description: "A friendly community for recreational sports and social activities. Join us for volleyball, basketball, soccer and more!",
    members: 245,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "Mike Chen",
    role: "admin"
  },
  {
    id: "2",
    name: "Creative Writing Circle",
    description: "A supportive space for writers to share their work, get feedback, and connect with fellow authors.",
    members: 85,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Bi-weekly",
    organizer: "Emily Brooks",
    role: "member"
  },
  {
    id: "3",
    name: "Weekend Hikers Club",
    description: "Explore beautiful trails around Toronto with friendly people. All skill levels welcome!",
    members: 165,
    category: "Outdoors",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "Sarah Martinez",
    role: "moderator"
  },
  {
    id: "4",
    name: "Mindful Meditation",
    description: "Practice meditation and mindfulness in a group setting. Perfect for beginners and experienced practitioners.",
    members: 120,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "Lisa Chang",
    role: "member"
  },
  {
    id: "5",
    name: "Social Board Games",
    description: "Weekly meetups to play modern board games and make new friends. From party games to strategy games!",
    members: 195,
    category: "Games",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "David Chen",
    role: "moderator"
  }
];

const getGroupCategoryColor = (category: string) => {
  const colors = {
    Technology: 'linear(to-r, blue.400, cyan.400)',
    Gaming: 'linear(to-r, purple.400, pink.400)',
    Sports: 'linear(to-r, green.400, teal.400)',
    Wellness: 'linear(to-r, orange.400, yellow.400)',
    Arts: 'linear(to-r, pink.400, red.400)',
    Business: 'linear(to-r, gray.400, blue.400)'
  }
  return colors[category as keyof typeof colors] || 'gray.500'
}

const getGroupCategoryIcon = (category: string) => {
  const icons = {
    Technology: FaCode,
    Gaming: FaGamepad,
    Sports: FaRunning,
    Wellness: FaUsers,
    Arts: FaPalette,
    Business: FaBriefcase
  }
  return icons[category as keyof typeof icons] || FaUsers
}

const getEventTypeColor = (type: string) => {
  const colors = {
    Workshop: 'linear(to-r, purple.400, pink.400)',
    Professional: 'linear(to-r, blue.400, cyan.400)',
    Games: 'linear(to-r, orange.400, yellow.400)',
    Social: 'linear(to-r, green.400, teal.400)',
    Tech: 'linear(to-r, red.400, orange.400)',
    Sports: 'linear(to-r, blue.500, cyan.500)',
    Arts: 'linear(to-r, pink.400, red.400)',
    Crafts: 'linear(to-r, teal.400, green.400)',
    Food: 'linear(to-r, red.500, orange.400)',
    Music: 'linear(to-r, purple.500, pink.500)',
    Outdoors: 'linear(to-r, green.500, teal.500)',
    Wellness: 'linear(to-r, cyan.400, blue.400)',
    Educational: 'linear(to-r, blue.400, purple.400)',
    Business: 'linear(to-r, blue.500, cyan.400)',
    Other: 'linear(to-r, purple.400, blue.400)'
  }
  return colors[type as keyof typeof colors] || colors.Other
}

const getEventTypeIcon = (type: string) => {
  const icons = {
    Workshop: FaChalkboardTeacher,
    Professional: FaBriefcase,
    Games: FaGamepad,
    Social: FaUsers,
    Tech: FaLaptopCode,
    Sports: FaRunning,
    Arts: FaPalette,
    Crafts: FaHandshake,
    Food: FaUtensils,
    Music: FaMusic,
    Outdoors: FaMountain,
    Wellness: FaHeart
  }
  return icons[type as keyof typeof icons] || FaCalendar
}

interface Section {
  name: string;
  tabs: string[];
  paths?: string[];
}

const sections: Section[] = [
  {
    name: 'Home',
    tabs: ['For You', 'Following', 'Trending', 'Activity'],
    paths: ['/home', '/home/following', '/home/trending', '/home/activity']
  },
  {
    name: 'Events',
    tabs: ['Explore Events', 'My Events', 'Create Event'],
    paths: ['/events/explore-events', '/events/my-events', '/events/create-event']
  },
  {
    name: 'Groups',
    tabs: ['Explore Groups', 'My Groups', 'Create Group'],
    paths: ['/groups/explore-groups', '/groups/my-groups', '/groups/create-group']
  },
  {
    name: 'Activity Feed',
    tabs: ['All Activity', 'Groups', 'Events', 'Following'],
    paths: ['/activity-feed/all', '/activity-feed/groups', '/activity-feed/events', '/activity-feed/following']
  },
  {
    name: 'Settings',
    tabs: ['General', 'Security & Privacy', 'Notifications'],
    paths: ['/settings/general', '/settings/security-privacy', '/settings/notifications']
  }
]

const categories = ["All Categories", "Technology", "Gaming", "Sports", "Wellness", "Arts", "Business"]
const locations = ["All Locations", "Toronto, ON", "Virtual Event"]
const dates = ["All Dates", "Today", "This Week", "This Month"]

interface GroupVisibilities {
  [key: string]: 'public' | 'private';
}

const SettingsContent = ({ tabIndex }: { tabIndex: number }) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  // General Settings State
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  // Security & Privacy State
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private'>('public')
  const [onlineStatus, setOnlineStatus] = useState(true)
  const [emailSearch, setEmailSearch] = useState(false)
  const [defaultGroupVisibility, setDefaultGroupVisibility] = useState<'public' | 'private'>('public')
  const [defaultEventPostVisibility, setDefaultEventPostVisibility] = useState<'public' | 'private'>('public')
  const [groupVisibilities, setGroupVisibilities] = useState<GroupVisibilities>({
    'Tech Enthusiasts Toronto': 'public',
    'Toronto Developers Network': 'private',
    'Shopify Partners Community': 'public'
  })
  const [eventPostVisibilities, setEventPostVisibilities] = useState<GroupVisibilities>({
    'Board Game Night': 'public',
    'Social Tennis Mixer': 'private',
    'Paint & Sip Social': 'public'
  })
  const [connectedAccounts, setConnectedAccounts] = useState({
    github: true,
    google: false
  })

  // Notifications State
  const [emailNotifications, setEmailNotifications] = useState({
    eventReminders: true,
    newMessages: true,
    groupUpdates: false,
    newsletter: true
  })
  const [pushNotifications, setPushNotifications] = useState({
    eventInvites: true,
    directMessages: true,
    groupActivity: true,
    mentions: true
  })
  const [desktopNotifications, setDesktopNotifications] = useState(false)

  const toggleEmailNotification = (key: keyof typeof emailNotifications) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const togglePushNotification = (key: keyof typeof pushNotifications) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleGroupVisibility = (groupName: string) => {
    setGroupVisibilities(prev => ({
      ...prev,
      [groupName]: prev[groupName] === 'public' ? 'private' : 'public'
    }))
  }

  const toggleEventPostVisibility = (eventName: string) => {
    setEventPostVisibilities(prev => ({
      ...prev,
      [eventName]: prev[eventName] === 'public' ? 'private' : 'public'
    }))
  }

  return (
    <Box 
      width="100%" 
      bg={bgColor} 
      borderRadius="lg" 
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      p={6}
      mb={6}
    >
      {tabIndex === 0 ? (
        <VStack spacing={6} align="stretch">
          <Heading size="lg" mb={4}>General Settings</Heading>
          
          <FormControl>
            <FormLabel fontWeight="bold">Display Name</FormLabel>
            <Input defaultValue="Mike Lindstrom" />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Email</FormLabel>
            <Input defaultValue="mike.lindstrom@shopify.com" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Time Zone</FormLabel>
            <Input defaultValue="Eastern Time (ET)" />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Language</FormLabel>
            <Input defaultValue="English (US)" />
          </FormControl>

          <FormControl>
            <FormLabel fontWeight="bold">Theme</FormLabel>
            <HStack spacing={4}>
              <Button 
                variant={theme === 'light' ? 'solid' : 'outline'} 
                onClick={() => setTheme('light')}
                colorScheme={theme === 'light' ? 'blue' : 'gray'}
              >
                Light
              </Button>
              <Button 
                variant={theme === 'dark' ? 'solid' : 'outline'} 
                onClick={() => setTheme('dark')}
                colorScheme={theme === 'dark' ? 'blue' : 'gray'}
              >
                Dark
              </Button>
              <Button 
                variant={theme === 'system' ? 'solid' : 'outline'} 
                onClick={() => setTheme('system')}
                colorScheme={theme === 'system' ? 'blue' : 'gray'}
              >
                System
              </Button>
            </HStack>
          </FormControl>
        </VStack>
      ) : tabIndex === 1 ? (
        <VStack spacing={6} align="stretch">
          <Heading size="lg" mb={4}>Security & Privacy</Heading>
          
          {/* Password Section */}
          <Box>
            <Heading size="md" mb={4}>Password</Heading>
            <VStack spacing={3} align="stretch">
              <Input type="password" placeholder="Current Password" />
              <Input type="password" placeholder="New Password" />
              <Input type="password" placeholder="Confirm New Password" />
              <Button colorScheme="blue" alignSelf="flex-start">Change Password</Button>
              </VStack>
            </Box>

          <Divider />

          {/* Two-Factor Authentication */}
          <Box>
            <Heading size="md" mb={4}>Two-Factor Authentication</Heading>
            <Text color={textColor} mb={4}>Add an extra layer of security to your account by enabling two-factor authentication.</Text>
            <Button colorScheme="blue">Enable 2FA</Button>
          </Box>

          <Divider />

          {/* Privacy Settings */}
          <Box>
            <Heading size="md" mb={4}>Privacy Settings</Heading>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Profile Visibility</Text>
                  <Text fontSize="sm" color="gray.500">Control who can see your profile information</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => setProfileVisibility(prev => prev === 'public' ? 'private' : 'public')}
                >
                  {profileVisibility === 'public' ? 'Public' : 'Private'}
                </Button>
              </HStack>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Online Status</Text>
                  <Text fontSize="sm" color="gray.500">Show when you're active on the platform</Text>
        </Box>
                <Button 
            colorScheme="blue" 
                  onClick={() => setOnlineStatus(prev => !prev)}
                >
                  {onlineStatus ? 'On' : 'Off'}
                </Button>
              </HStack>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Email Search</Text>
                  <Text fontSize="sm" color="gray.500">Allow others to find you using your email address</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => setEmailSearch(prev => !prev)}
                >
                  {emailSearch ? 'On' : 'Off'}
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Divider />

          {/* Group & Event Privacy */}
          <Box>
            <Heading size="md" mb={4}>Group & Event Privacy</Heading>
            
            {/* Default Settings */}
            <VStack spacing={6} align="stretch">
              <Box>
                <Heading size="sm" mb={4}>Default Settings</Heading>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Box>
                      <Text fontWeight="semibold">Default Group Visibility</Text>
                      <Text fontSize="sm" color="gray.500">This setting applies to all new groups you join</Text>
                    </Box>
                    <Button 
                      colorScheme="blue"
                      onClick={() => setDefaultGroupVisibility(prev => prev === 'public' ? 'private' : 'public')}
                    >
                      {defaultGroupVisibility}
                    </Button>
                  </HStack>

                  <HStack justify="space-between">
                    <Box>
                      <Text fontWeight="semibold">Default Event Post Visibility</Text>
                      <Text fontSize="sm" color="gray.500">This setting controls who can see your posts in events by default</Text>
                    </Box>
                    <Button 
                      colorScheme="blue"
                      onClick={() => setDefaultEventPostVisibility(prev => prev === 'public' ? 'private' : 'public')}
                    >
                      {defaultEventPostVisibility}
                    </Button>
                  </HStack>
                </VStack>
              </Box>
              
              {/* Individual Group Settings */}
              <Box>
                <Heading size="sm" mb={4}>Individual Group Settings</Heading>
                <VStack spacing={3} align="stretch" bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md">
                  {Object.entries(groupVisibilities).map(([groupName, visibility]) => (
                    <HStack key={groupName} justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">{groupName}</Text>
                        <Text fontSize="sm" color="gray.500">
                          {groupName === 'Tech Enthusiasts Toronto' ? '250 members' :
                           groupName === 'Toronto Developers Network' ? '180 members' :
                           '520 members'}
                        </Text>
                      </VStack>
                      <Button 
                        colorScheme="blue"
                        onClick={() => toggleGroupVisibility(groupName)}
                      >
                        {visibility === 'public' ? 'Public' : 'Private'}
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Individual Event Post Settings */}
              <Box>
                <Heading size="sm" mb={4}>Individual Event Post Settings</Heading>
                <VStack spacing={3} align="stretch" bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md">
                  {Object.entries(eventPostVisibilities).map(([eventName, visibility]) => (
                    <HStack key={eventName} justify="space-between">
                      <VStack align="start" spacing={0}>
                        <Text fontWeight="semibold">{eventName}</Text>
                        <Text fontSize="sm" color="gray.500">Your posts in this event</Text>
                      </VStack>
                      <Button 
                        colorScheme="blue"
                        onClick={() => toggleEventPostVisibility(eventName)}
                      >
                        {visibility === 'public' ? 'Public' : 'Private'}
                      </Button>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>

          <Divider />

          {/* Connected Accounts */}
          <Box>
            <Heading size="md" mb={4}>Connected Accounts</Heading>
            <Text color={textColor} mb={4}>Link your accounts to enable additional features and easier sign-in.</Text>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">GitHub</Text>
                  <Text fontSize="sm" color="gray.500">Connect to share repositories and collaborate</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => setConnectedAccounts(prev => ({ ...prev, github: !prev.github }))}
                >
                  {connectedAccounts.github ? 'Disconnect' : 'Connect'}
                </Button>
                  </HStack>
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Google</Text>
                  <Text fontSize="sm" color="gray.500">Connect for calendar integration and easy sign-in</Text>
                </Box>
                <Button 
            colorScheme="blue" 
                  onClick={() => setConnectedAccounts(prev => ({ ...prev, google: !prev.google }))}
                >
                  {connectedAccounts.google ? 'Disconnect' : 'Connect'}
                </Button>
              </HStack>
            </VStack>
        </Box>
        </VStack>
      ) : (
        <VStack spacing={6} align="stretch">
          <Heading size="lg" mb={4}>Notifications</Heading>
          
          {/* Email Notifications */}
          <Box>
            <Heading size="md" mb={4}>Email Notifications</Heading>
            <Text color={textColor} mb={4}>Choose which email notifications you'd like to receive.</Text>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Event Reminders</Text>
                  <Text fontSize="sm" color="gray.500">Get notified about upcoming events you're attending</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => toggleEmailNotification('eventReminders')}
                >
                  {emailNotifications.eventReminders ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">New Messages</Text>
                  <Text fontSize="sm" color="gray.500">Receive notifications for new direct messages</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => toggleEmailNotification('newMessages')}
                >
                  {emailNotifications.newMessages ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Group Updates</Text>
                  <Text fontSize="sm" color="gray.500">Stay informed about activity in your groups</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => toggleEmailNotification('groupUpdates')}
                >
                  {emailNotifications.groupUpdates ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Newsletter</Text>
                  <Text fontSize="sm" color="gray.500">Receive our monthly newsletter with platform updates</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => toggleEmailNotification('newsletter')}
                >
                  {emailNotifications.newsletter ? 'On' : 'Off'}
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Divider />

          {/* Push Notifications */}
          <Box>
            <Heading size="md" mb={4}>Push Notifications</Heading>
            <Text color={textColor} mb={4}>Control your in-app and mobile push notifications.</Text>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Event Invites</Text>
                  <Text fontSize="sm" color="gray.500">Get notified when you're invited to events</Text>
                </Box>
                <Button 
          colorScheme="blue" 
                  onClick={() => togglePushNotification('eventInvites')}
                >
                  {pushNotifications.eventInvites ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Direct Messages</Text>
                  <Text fontSize="sm" color="gray.500">Receive notifications for instant messages</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => togglePushNotification('directMessages')}
                >
                  {pushNotifications.directMessages ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Group Activity</Text>
                  <Text fontSize="sm" color="gray.500">Get updates about posts and events in your groups</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => togglePushNotification('groupActivity')}
                >
                  {pushNotifications.groupActivity ? 'On' : 'Off'}
                </Button>
              </HStack>

              <HStack justify="space-between">
                <Box>
                  <Text fontWeight="semibold">Mentions</Text>
                  <Text fontSize="sm" color="gray.500">Get notified when someone mentions you</Text>
                </Box>
                <Button 
                  colorScheme="blue"
                  onClick={() => togglePushNotification('mentions')}
                >
                  {pushNotifications.mentions ? 'On' : 'Off'}
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Divider />

          {/* Desktop Notifications */}
          <Box>
            <Heading size="md" mb={4}>Desktop Notifications</Heading>
            <Text color={textColor} mb={4}>Get notifications on your computer when your browser is open.</Text>
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="semibold">Enable Desktop Notifications</Text>
                <Text fontSize="sm" color="gray.500">Show notifications on your desktop when you're using the website</Text>
              </Box>
              <Button 
                colorScheme="blue"
                onClick={() => setDesktopNotifications(prev => !prev)}
              >
                {desktopNotifications ? 'On' : 'Off'}
              </Button>
            </HStack>
          </Box>
        </VStack>
      )}
    </Box>
  )
}

const MainContent = ({ isNotificationsOpen, onNotificationsOpen }: MainContentProps) => {
  const navigate = useNavigate()

  const handleNewEventClick = () => {
    navigate('/events/create-event')
  }

  return (
    <Box 
      width="100%"
      height="100vh"
      position="relative"
      bg={useColorModeValue('gray.50', 'gray.900')}
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      <Box 
        position="absolute"
        top="24px"
        right="48px"
        zIndex={99}
      >
        <Button
          leftIcon={<AddIcon />}
          colorScheme="blue"
          onClick={handleNewEventClick}
          size="md"
          boxShadow="lg"
          _hover={{ transform: 'translateY(-2px)' }}
          transition="all 0.2s"
        >
          Create Event
        </Button>
      </Box>

      <Box 
        width="100%"
        flex="1"
        pt="60px"
        overflow="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            width: '10px',
            background: useColorModeValue('gray.100', 'gray.900'),
          },
          '&::-webkit-scrollbar-thumb': {
            background: useColorModeValue('gray.300', 'gray.700'),
            borderRadius: '24px',
          },
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<SectionContent path="/home" />}>
            <Route index element={<HeroSection />} />
            <Route path="following" element={<ActivityFeed />} />
            <Route path="trending" element={<ActivityFeed />} />
            <Route path="activity" element={<ActivityFeed />} />
          </Route>

          <Route path="/events" element={<SectionContent path="/events" />}>
            <Route index element={<Navigate to="explore-events" replace />} />
            <Route path="explore-events" element={<ExploreEvents events={upcomingEvents} />} />
            <Route path="my-events" element={<MyEvents events={myEvents} locations={locations} dates={dates} />} />
            <Route path="create-event" element={<CreateEventForm step={1} />} />
            <Route path=":id" element={<EventDetails />} />
          </Route>

          <Route path="/groups" element={<SectionContent path="/groups" />}>
            <Route index element={<Navigate to="explore-groups" replace />} />
            <Route path="explore-groups" element={<ExploreGroups />} />
            <Route path="my-groups" element={<MyGroups groups={myGroups} />} />
            <Route path="create-group" element={<CreateGroup />} />
            <Route path=":id" element={<GroupDetails />} />
          </Route>

          <Route path="/activity-feed" element={<SectionContent path="/activity-feed" />}>
            <Route index element={<Navigate to="all" replace />} />
            <Route path="all" element={<GroupActivityFeed />} />
            <Route path="groups" element={<GroupActivityFeed />} />
            <Route path="events" element={<GroupActivityFeed />} />
          </Route>

          <Route path="/settings" element={<SectionContent path="/settings" />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<SettingsContent tabIndex={0} />} />
            <Route path="security-privacy" element={<SettingsContent tabIndex={1} />} />
            <Route path="notifications" element={<SettingsContent tabIndex={2} />} />
          </Route>
        </Routes>
      </Box>

      <Box position="fixed" bottom={4} right={4}>
        <AIHelpButton />
      </Box>

      {isNotificationsOpen && (
        <NotificationsPanel isOpen={isNotificationsOpen} onClose={onNotificationsOpen} />
      )}
    </Box>
  )
}

export default MainContent