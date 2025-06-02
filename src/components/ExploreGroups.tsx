import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Select,
  VStack,
  Text,
  useColorModeValue,
  Icon,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { FaSearch, FaTimes, FaUsers, FaBriefcase, FaRunning, FaCode, FaGamepad, FaPalette } from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GroupCard from './GroupCard'

export interface Group {
  id: string
  name: string
  description: string
  members: number
  category: string
  image: string
  location: string
  meetingFrequency: string
  organizer: string
  role?: string
  guidelines?: string[]
}

export const exploreGroups: Group[] = [
  {
    id: "1",
    name: "Tech Enthusiasts Toronto",
    description: "A community of tech professionals and enthusiasts in Toronto. We discuss latest trends in AI, web development, and emerging technologies. Regular workshops, hackathons, and networking events.",
    members: 250,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "Sarah Chen",
    role: "member"
  },
  {
    id: "2",
    name: "Toronto Developers Network",
    description: "Connect with fellow developers in the Greater Toronto Area. Share knowledge, collaborate on projects, and grow your professional network. All skill levels welcome!",
    members: 180,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Bi-weekly",
    organizer: "Alex Rodriguez",
    role: "member"
  },
  {
    id: "3",
    name: "Board Game Enthusiasts",
    description: "From classic board games to the latest releases, join us for regular game nights and strategy discussions. Perfect for both casual and serious gamers!",
    members: 150,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Weekly",
    organizer: "David Chen",
    role: "member"
  },
  {
    id: "4",
    name: "SF Running Collective",
    description: "Group runs through the beautiful streets of San Francisco. All paces welcome! Regular training sessions and social events for runners of all levels.",
    members: 200,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Weekly",
    organizer: "Sarah Martinez",
    role: "member"
  },
  {
    id: "5",
    name: "NYC Chess Masters",
    description: "Dedicated to the art of chess. Regular tournaments, strategy sessions, and casual play. From beginners to masters, everyone is welcome to join and learn.",
    members: 120,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800",
    location: "New York, NY",
    meetingFrequency: "Weekly",
    organizer: "Emma Wilson",
    role: "member"
  },
  {
    id: "6",
    name: "Central Park Yoga Community",
    description: "Practice yoga in the heart of NYC. Classes for all levels, meditation sessions, and wellness workshops. Join us for outdoor sessions when weather permits!",
    members: 180,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=800",
    location: "New York, NY",
    meetingFrequency: "Daily",
    organizer: "Lisa Chang",
    role: "member"
  },
  {
    id: "7",
    name: "Seattle Game Developers",
    description: "A community for game developers in Seattle. Share knowledge, get feedback on projects, and collaborate with other developers. Regular workshops and game jams.",
    members: 160,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=800",
    location: "Seattle, WA",
    meetingFrequency: "Monthly",
    organizer: "Alex Rivera",
    role: "member"
  },
  {
    id: "8",
    name: "Boston Art Collective",
    description: "Connect with fellow artists in Boston. Regular exhibitions, workshops, and collaborative projects. All mediums and skill levels welcome!",
    members: 140,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    location: "Boston, MA",
    meetingFrequency: "Weekly",
    organizer: "Maria Garcia",
    role: "member"
  },
  {
    id: "9",
    name: "Startup Founders Hub",
    description: "Network with other startup founders, share experiences, and get advice. Regular pitch practice sessions and networking events.",
    members: 200,
    category: "Business",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Monthly",
    organizer: "James Wilson",
    role: "member"
  },
  {
    id: "10",
    name: "Data Science Network",
    description: "Explore the world of data science, machine learning, and AI. Regular workshops, study groups, and project collaborations.",
    members: 170,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Bi-weekly",
    organizer: "Michael Chang",
    role: "member"
  },
  {
    id: "11",
    name: "Creative Writers Circle",
    description: "A supportive community for writers of all genres. Writing workshops, critique sessions, and literary discussions.",
    members: 90,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
    location: "Boston, MA",
    meetingFrequency: "Weekly",
    organizer: "Emily Brooks",
    role: "member"
  },
  {
    id: "12",
    name: "Urban Photography Club",
    description: "Explore urban photography with fellow enthusiasts. Photo walks, technique workshops, and group exhibitions.",
    members: 130,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800",
    location: "New York, NY",
    meetingFrequency: "Weekly",
    organizer: "Chris Lee",
    role: "member"
  },
  {
    id: "13",
    name: "Digital Marketing Pros",
    description: "Share digital marketing strategies, discuss industry trends, and network with fellow marketers. Regular workshops on SEO, social media, and content marketing.",
    members: 185,
    category: "Business",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Bi-weekly",
    organizer: "Mark Johnson",
    role: "member"
  },
  {
    id: "14",
    name: "Mindful Meditation Group",
    description: "Daily guided meditations, mindfulness workshops, and discussions about mental wellness. Perfect for beginners and experienced practitioners.",
    members: 140,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Daily",
    organizer: "Amy Chen",
    role: "member"
  },
  {
    id: "15",
    name: "Mobile App Developers",
    description: "Connect with other mobile app developers. Share knowledge about iOS, Android, and cross-platform development. Regular code reviews and hackathons.",
    members: 210,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    location: "Seattle, WA",
    meetingFrequency: "Weekly",
    organizer: "Tom Wilson",
    role: "member"
  },
  {
    id: "16",
    name: "Outdoor Adventure Club",
    description: "Experience exciting outdoor activities including hiking, rock climbing, and camping. All skill levels welcome!",
    members: 230,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    location: "Boston, MA",
    meetingFrequency: "Weekly",
    organizer: "Chris Thompson",
    role: "member"
  },
  {
    id: "17",
    name: "Music Production Lab",
    description: "Learn music production, share your work, and collaborate with other producers. Regular workshops on different aspects of music production.",
    members: 160,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Weekly",
    organizer: "David Kim",
    role: "member"
  },
  {
    id: "18",
    name: "Indie Game Developers",
    description: "A community for independent game developers. Share your projects, get feedback, and collaborate on game development.",
    members: 145,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800",
    location: "New York, NY",
    meetingFrequency: "Bi-weekly",
    organizer: "Sarah Lee",
    role: "member"
  },
  {
    id: "19",
    name: "Blockchain Innovators",
    description: "Explore blockchain technology, cryptocurrency, and decentralized applications. Regular discussions and technical workshops.",
    members: 175,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Weekly",
    organizer: "Mike Zhang",
    role: "member"
  },
  {
    id: "20",
    name: "Culinary Arts Society",
    description: "Share recipes, cooking techniques, and food photography tips. Regular cooking workshops and food tasting events.",
    members: 190,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    location: "Seattle, WA",
    meetingFrequency: "Weekly",
    organizer: "Julia Martinez",
    role: "member"
  },
  {
    id: "21",
    name: "E-commerce Entrepreneurs",
    description: "Network with other e-commerce business owners. Share strategies, tools, and tips for growing online businesses.",
    members: 165,
    category: "Business",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    location: "Toronto, ON",
    meetingFrequency: "Monthly",
    organizer: "Rachel Wong",
    role: "member"
  },
  {
    id: "22",
    name: "Virtual Reality Explorers",
    description: "Discover and discuss the latest in VR technology. Regular demos, development workshops, and networking events.",
    members: 130,
    category: "Technology",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800",
    location: "Boston, MA",
    meetingFrequency: "Bi-weekly",
    organizer: "Alex Turner",
    role: "member"
  },
  {
    id: "23",
    name: "Yoga & Mindfulness",
    description: "Practice yoga and mindfulness together. Classes for all levels, meditation sessions, and wellness discussions.",
    members: 220,
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800",
    location: "New York, NY",
    meetingFrequency: "Daily",
    organizer: "Emma Davis",
    role: "member"
  },
  {
    id: "24",
    name: "Social Impact Network",
    description: "Connect with others passionate about social change. Regular discussions, volunteer opportunities, and impact project collaborations.",
    members: 195,
    category: "Business",
    image: "https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?w=800",
    location: "San Francisco, CA",
    meetingFrequency: "Monthly",
    organizer: "Daniel Park",
    role: "member"
  },
  {
    id: "25",
    name: "Urban Sketchers Club",
    description: "Join fellow artists for outdoor sketching sessions around the city. All skill levels welcome. Regular workshops on urban sketching techniques and materials.",
    members: 110,
    category: "Arts",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    location: "Boston, MA",
    meetingFrequency: "Weekly",
    organizer: "Maya Patel",
    role: "member"
  }
]

const locations = ["All Locations", "Toronto, ON", "San Francisco, CA", "New York, NY", "Boston, MA", "Seattle, WA"]
const categories = ["All Categories", "Technology", "Gaming", "Sports", "Wellness", "Arts", "Business"]

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

const ExploreGroups = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const clearSearch = () => setSearchQuery("")

  const filteredGroups = exploreGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "All Locations" || group.location === selectedLocation
    const matchesCategory = selectedCategory === "All Categories" || group.category === selectedCategory

    return matchesSearch && matchesLocation && matchesCategory
  })

  const handleViewDetails = (groupId: string) => {
    navigate(`/groups/${groupId}`)
  }

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={6} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4}>
          <InputGroup size="lg" mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pr="4.5rem"
            />
            {searchQuery && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<FaTimes />}
                  size="sm"
                  onClick={clearSearch}
                  variant="ghost"
                />
              </InputRightElement>
            )}
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder="Category"
              size="lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>

            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Location"
              size="lg"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>
          </SimpleGrid>
        </Box>

        {filteredGroups.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">No groups found matching your criteria</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}>
            {filteredGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onClick={handleViewDetails}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  )
}

export default ExploreGroups 