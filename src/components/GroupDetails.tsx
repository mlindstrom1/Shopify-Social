import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Avatar,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Divider,
  AvatarGroup,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { FaUsers, FaMapMarkerAlt, FaClock, FaShare, FaLock, FaHeart, FaComment } from 'react-icons/fa'
import EventCard from './EventCard'
import { isEventPast } from './events'
import { allEvents } from './events'
import { exploreGroups } from './ExploreGroups'

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
}

interface Post {
  id: string;
  author: Member;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  images?: string[];
}

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

const getRoleBadgeProps = (role: string) => {
  switch (role) {
    case 'admin':
      return {
        colorScheme: 'red',
        bgGradient: 'linear(to-r, red.400, orange.400)',
        color: 'white'
      }
    case 'moderator':
      return {
        colorScheme: 'purple',
        bgGradient: 'linear(to-r, purple.400, pink.400)',
        color: 'white'
      }
    default:
      return {
        colorScheme: 'gray',
        bgGradient: 'linear(to-r, gray.400, gray.500)',
        color: 'white'
      }
  }
}

const GroupDetails = () => {
  const { id } = useParams()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Find the actual group data
  const group = exploreGroups.find(g => g.id === id) || {
    id: "1",
    name: "Data Drinks Toronto 🍻",
    description: "Welcome to Data Drinks, where data scientists, machine learning professionals, data analytics specialists, and AI knowledge workers can gather to share their knowledge and passion for the field. We are also open to those 'data and AI curious' as well.\n\nOur gatherings will be focused on fostering meaningful discussions and promoting genuine connections. We uphold a strict non-promotional and non-commercial policy to create an environment dedicated to open thought, networking, socializing, and learning grounded in authenticity.",
    members: 1135,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Monthly",
    organizer: "Mike Chen",
    guidelines: [
      "🤝 Human First: We prioritize genuine relationships over transactions. While business and partnerships may emerge naturally, our focus is on respectful, people-centered interactions—not sales pitches.",
      "🙂 Embracing Respect and Positivity: We foster a supportive environment where everyone feels comfortable expressing their thoughts, learning from each other, and meeting new people.",
      "🌱 Building an Authentic and Supportive Community: We seek to cultivate a membership who engage sincerely, share experiences and insights openly, and contribute positively to collective learning and growth."
    ]
  }

  // Mock members data with more members and varied roles
  const members: Member[] = [
    {
      id: "1",
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      role: "admin"
    },
    {
      id: "2",
      name: "Sarah Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      role: "moderator"
    },
    {
      id: "3",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      role: "moderator"
    },
    {
      id: "4",
      name: "Emily Wang",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
      role: "member"
    },
    {
      id: "5",
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      role: "member"
    },
    {
      id: "6",
      name: "Jessica Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      role: "member"
    },
    {
      id: "7",
      name: "Michael Park",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
      role: "member"
    },
    {
      id: "8",
      name: "Lisa Wong",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
      role: "member"
    },
    // Hidden members represented by blank avatars
    { id: "9", name: "Hidden Member", avatar: "", role: "member" },
    { id: "10", name: "Hidden Member", avatar: "", role: "member" },
    { id: "11", name: "Hidden Member", avatar: "", role: "member" },
    { id: "12", name: "Hidden Member", avatar: "", role: "member" }
  ]

  // Mock posts data based on group category
  const getGroupPosts = (groupCategory: string, groupMembers: Member[]): Post[] => {
    const categoryPosts: { [key: string]: Post[] } = {
      'Technology': [
        {
          id: "1",
          author: groupMembers[0],
          content: "Exciting news! 🎉 Our next tech meetup will feature a special guest speaker from Google's AI research team. They'll be sharing insights on the latest developments in machine learning. Don't forget to RSVP for next Thursday's event!",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 24,
          comments: 8,
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Great turnout at yesterday's coding workshop! Thanks to everyone who participated in our hands-on session on modern web development. Here are some highlights from the event:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 45,
          comments: 12,
          images: [
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
            "https://images.unsplash.com/photo-1591267990532-e5bdb1b0ceb8?w=800"
          ]
        }
      ],
      'Gaming': [
        {
          id: "1",
          author: groupMembers[0],
          content: "🎮 Game Night Alert! Join us this Friday for our monthly board game tournament. We'll be featuring Catan, Ticket to Ride, and some exciting new additions to our collection. Snacks and refreshments will be provided!",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 32,
          comments: 15,
          images: [
            "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800"
          ]
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Last night's strategy game session was epic! Special thanks to everyone who joined our Dungeons & Dragons campaign. Here are some moments from our adventure:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 28,
          comments: 10,
          images: [
            "https://images.unsplash.com/photo-1611380333523-5826f14d964b?w=800",
            "https://images.unsplash.com/photo-1610890690846-5149750c8634?w=800"
          ]
        }
      ],
      'Sports': [
        {
          id: "1",
          author: groupMembers[0],
          content: "🏃‍♂️ Perfect weather for our morning run! Join us this Saturday at 7 AM for our weekly group run. All paces welcome - we'll have groups for beginners, intermediate, and advanced runners.",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 19,
          comments: 7,
          images: [
            "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800"
          ]
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Incredible energy at today's training session! Proud of everyone who pushed their limits. Here's a glimpse of our workout:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 34,
          comments: 9,
          images: [
            "https://images.unsplash.com/photo-1539794830467-1f1755804d13?w=800"
          ]
        }
      ],
      'Wellness': [
        {
          id: "1",
          author: groupMembers[0],
          content: "🧘‍♀️ Join us for sunrise yoga in the park this weekend! We'll be practicing mindfulness and gentle flow sequences suitable for all levels. Don't forget to bring your mat and water bottle!",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 42,
          comments: 11,
          images: [
            "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800"
          ]
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Thank you everyone who joined our meditation workshop today. Such a peaceful and centering experience. Here are some moments from our session:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 38,
          comments: 8,
          images: [
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
            "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800"
          ]
        }
      ],
      'Arts': [
        {
          id: "1",
          author: groupMembers[0],
          content: "🎨 Exhibition Opening Night! Join us this Friday as we showcase amazing works from our talented community members. Live music, refreshments, and great conversations await!",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 56,
          comments: 14,
          images: [
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800"
          ]
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Wonderful turnout at today's watercolor workshop! Everyone created such beautiful pieces. Here's a peek at some of the artwork:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 45,
          comments: 12,
          images: [
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
            "https://images.unsplash.com/photo-1513364389922-6912e1665a40?w=800"
          ]
        }
      ],
      'Business': [
        {
          id: "1",
          author: groupMembers[0],
          content: "📈 Entrepreneurship Workshop Series! Next week, we're hosting a special session on 'Building a Sustainable Business Model' with guest speaker Sarah Chen from TechVentures. Limited spots available!",
          timestamp: "2024-03-15T14:30:00Z",
          likes: 29,
          comments: 13
        },
        {
          id: "2",
          author: groupMembers[1],
          content: "Successful networking event yesterday! Great discussions on startup funding and scaling strategies. Here are some highlights:",
          timestamp: "2024-03-10T18:15:00Z",
          likes: 41,
          comments: 16,
          images: [
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
            "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800"
          ]
        }
      ]
    }

    const defaultPosts = [
      {
        id: "1",
        author: groupMembers[0],
        content: "Welcome to our group! Looking forward to connecting with all of you and sharing experiences.",
        timestamp: "2024-03-15T14:30:00Z",
        likes: 15,
        comments: 5
      },
      {
        id: "2",
        author: groupMembers[1],
        content: "Great to see this community growing! Don't forget to check out our upcoming events.",
        timestamp: "2024-03-10T18:15:00Z",
        likes: 12,
        comments: 3
      }
    ]

    return categoryPosts[groupCategory] || defaultPosts
  }

  // Get posts based on group category
  const posts = getGroupPosts(group.category, members)

  // Filter events for this group
  const groupEvents = allEvents.filter(event => 
    event.location.includes(group.location) && 
    event.type.toLowerCase().includes(group.category.toLowerCase())
  )

  const upcomingEvents = groupEvents.filter(event => !isEventPast(event))
  const pastEvents = groupEvents.filter(event => isEventPast(event))

  const organizers = members.filter(m => m.role === 'admin' || m.role === 'moderator')
  const visibleMembers = members.filter(m => m.role === 'member' && m.avatar)
  const hiddenMembers = members.filter(m => m.role === 'member' && !m.avatar)

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        height="300px" 
        position="relative" 
        bgImage={`url(${group.image})`}
        bgSize="cover"
        bgPosition="center"
      >
        <Box 
          position="absolute" 
          top={0} 
          left={0} 
          right={0} 
          bottom={0} 
          bg="blackAlpha.600"
        />
        <Container maxW="container.xl" height="100%" position="relative">
          <VStack 
            height="100%" 
            justify="flex-end" 
            align="flex-start" 
            spacing={4} 
            pb={8}
            color="white"
          >
            <Badge
              px={3}
              py={1}
              fontSize="md"
              bgGradient={getGroupCategoryColor(group.category)}
              color="white"
              borderRadius="full"
            >
              {group.category}
            </Badge>
            <Heading size="2xl">{group.name}</Heading>
            <HStack spacing={6}>
              <HStack>
                <Icon as={FaUsers} />
                <Text>{group.members} members</Text>
              </HStack>
              <HStack>
                <Icon as={FaMapMarkerAlt} />
                <Text>{group.location}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{group.meetingFrequency}</Text>
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <HStack spacing={8} align="flex-start">
          {/* Left Column - Group Info */}
          <Box flex="2">
            <Tabs variant="line" colorScheme="blue" size="lg">
              <TabList mb={6} borderBottom="1px" borderColor={borderColor}>
                <Tab fontSize="md" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Home</Tab>
                <Tab fontSize="md" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Events</Tab>
                <Tab fontSize="md" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Members</Tab>
                <Tab fontSize="md" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Photos</Tab>
                <Tab fontSize="md" fontWeight="semibold" _selected={{ color: 'blue.500', borderColor: 'blue.500' }}>Discussions</Tab>
              </TabList>

              <TabPanels>
                {/* Home Tab (formerly About) */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={6}>
                    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                      <Heading size="md" mb={4}>What we're about</Heading>
                      <Text whiteSpace="pre-wrap">{group.description}</Text>
                    </Box>

                    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                      <Heading size="md" mb={6}>Group Feed</Heading>
                      <VStack align="stretch" spacing={6}>
                        {posts.map(post => (
                          <Box key={post.id} pb={6} borderBottom={post.id !== posts[posts.length - 1].id ? "1px" : "none"} borderColor={borderColor}>
                            <HStack spacing={4} mb={3}>
                              <Avatar size="md" src={post.author.avatar} name={post.author.name} />
                              <Box>
                                <HStack>
                                  <Text fontWeight="bold">{post.author.name}</Text>
                                  <Badge
                                    {...getRoleBadgeProps(post.author.role)}
                                    textTransform="capitalize"
                                    fontSize="xs"
                                  >
                                    {post.author.role}
                                  </Badge>
                                </HStack>
                                <Text fontSize="sm" color="gray.500">
                                  {new Date(post.timestamp).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric'
                                  })}
                                </Text>
                              </Box>
                            </HStack>
                            <Text mb={4}>{post.content}</Text>
                            {post.images && (
                              <SimpleGrid columns={post.images.length > 1 ? 2 : 1} spacing={2} mb={4}>
                                {post.images.map((image, index) => (
                                  <Image
                                    key={index}
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    borderRadius="md"
                                    objectFit="cover"
                                    height="200px"
                                    width="100%"
                                  />
                                ))}
                              </SimpleGrid>
                            )}
                            <HStack spacing={4} color="gray.500">
                              <HStack spacing={1}>
                                <Icon as={FaHeart} />
                                <Text>{post.likes}</Text>
                              </HStack>
                              <HStack spacing={1}>
                                <Icon as={FaComment} />
                                <Text>{post.comments}</Text>
                              </HStack>
                            </HStack>
                          </Box>
                        ))}
                      </VStack>
                    </Box>

                    {group.guidelines && (
                      <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                        <Heading size="md" mb={4}>Group Guidelines</Heading>
                        <VStack align="stretch" spacing={4}>
                          {group.guidelines.map((guideline, index) => (
                            <Text key={index}>{guideline}</Text>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </TabPanel>

                {/* Events Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={6}>
                    {/* Upcoming Events */}
                    <Box>
                      <Heading size="md" mb={4}>Upcoming Events ({upcomingEvents.length})</Heading>
                      {upcomingEvents.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                          {upcomingEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </SimpleGrid>
                      ) : (
                        <Text color="gray.500">No upcoming events scheduled</Text>
                      )}
                    </Box>

                    <Divider />

                    {/* Past Events */}
                    <Box>
                      <Heading size="md" mb={4}>Past Events ({pastEvents.length})</Heading>
                      {pastEvents.length > 0 ? (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                          {pastEvents.slice(0, 3).map(event => (
                            <EventCard key={event.id} event={event} />
                          ))}
                        </SimpleGrid>
                      ) : (
                        <Text color="gray.500">No past events</Text>
                      )}
                      {pastEvents.length > 3 && (
                        <Button variant="link" colorScheme="blue" mt={4}>
                          See all past events
                        </Button>
                      )}
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Members Tab */}
                <TabPanel px={0}>
                  <VStack align="stretch" spacing={6}>
                    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                      <Heading size="md" mb={6}>Members ({group.members})</Heading>
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {members.map(member => (
                          <HStack key={member.id} spacing={4}>
                            {member.avatar ? (
                              <Avatar size="md" src={member.avatar} name={member.name} />
                            ) : (
                              <Avatar size="md" icon={<FaLock />} bg="gray.300" />
                            )}
                            <Box>
                              <Text fontWeight="bold">{member.avatar ? member.name : "Hidden Member"}</Text>
                              {member.role !== 'member' && (
                                <Badge
                                  {...getRoleBadgeProps(member.role)}
                                  textTransform="capitalize"
                                  fontSize="xs"
                                >
                                  {member.role}
                                </Badge>
                              )}
                            </Box>
                          </HStack>
                        ))}
                      </SimpleGrid>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Photos Tab */}
                <TabPanel px={0}>
                  <Text>Photos feature coming soon...</Text>
                </TabPanel>

                {/* Discussions Tab */}
                <TabPanel px={0}>
                  <Text>Discussions feature coming soon...</Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Right Column - Actions & Info */}
          <Box flex="1">
            <VStack spacing={4} position="sticky" top={4}>
              <Button colorScheme="blue" size="lg" width="100%">
                Join this group
              </Button>
              <Button leftIcon={<FaShare />} variant="outline" width="100%">
                Share
              </Button>

              {/* Organizers Card */}
              <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor} width="100%">
                <VStack align="stretch" spacing={4}>
                  <Heading size="sm">Organizers</Heading>
                  <VStack align="stretch" spacing={3}>
                    {organizers.map(member => (
                      <HStack key={member.id} spacing={3}>
                        <Avatar size="sm" src={member.avatar} name={member.name} />
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">{member.name}</Text>
                          <Badge
                            {...getRoleBadgeProps(member.role)}
                            textTransform="capitalize"
                            fontSize="xs"
                          >
                            {member.role}
                          </Badge>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>

              {/* Members Card */}
              <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor} width="100%">
                <VStack align="stretch" spacing={4}>
                  <Heading size="sm">Members</Heading>
                  <AvatarGroup size="md" max={8}>
                    {visibleMembers.map(member => (
                      <Avatar 
                        key={member.id}
                        name={member.name}
                        src={member.avatar}
                      />
                    ))}
                    {hiddenMembers.map(member => (
                      <Avatar
                        key={member.id}
                        icon={<FaLock />}
                        bg="gray.300"
                      />
                    ))}
                  </AvatarGroup>
                  <Text fontSize="sm" color="gray.500">
                    {group.members} members • {hiddenMembers.length} hidden
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </HStack>
      </Container>
    </Box>
  )
}

export default GroupDetails 