import {
  Box,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import EventCard from './EventCard'
import { Event, isEventPast } from './events'

interface MyEventsProps {
  events: Event[];
  locations: string[];
  dates: string[];
}

const MyEvents = ({ events, locations }: MyEventsProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [eventType, setEventType] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedDate] = useState('All Dates')
  const [sortBy, setSortBy] = useState('date-asc')

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = eventType === 'all' || event.type === eventType
    const matchesLocation = selectedLocation === "All Locations" || event.location.includes(selectedLocation)
    const matchesDate = selectedDate === "All Dates" || true
    return matchesSearch && matchesType && matchesLocation && matchesDate
  })

  const upcomingEvents = filteredEvents
    .filter(event => !isEventPast(event))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEvents = filteredEvents
    .filter(event => isEventPast(event))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={4} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4}>
          <InputGroup size="lg" mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search my events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pr="4.5rem"
            />
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              placeholder="Event Type"
              size="lg"
            >
              <option value="all">All Types</option>
              <option value="Workshop">Workshop</option>
              <option value="Social">Social</option>
              <option value="Professional">Professional</option>
              <option value="Games">Games</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Crafts">Crafts</option>
              <option value="Food">Food</option>
              <option value="Music">Music</option>
              <option value="Outdoors">Outdoors</option>
              <option value="Wellness">Wellness</option>
            </Select>

            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Location"
              size="lg"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>

            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              placeholder="Sort By"
              size="lg"
            >
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
            </Select>
          </SimpleGrid>
        </Box>

        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={6}>
            <Tab _selected={{ bg: 'green.500', color: 'white' }} mr={4}>All Events</Tab>
            <Tab _selected={{ bg: 'green.500', color: 'white' }} mr={4}>Upcoming Events</Tab>
            <Tab _selected={{ bg: 'green.500', color: 'white' }}>Past Events</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              {filteredEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            <TabPanel px={0}>
              {upcomingEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No upcoming events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            <TabPanel px={0}>
              {pastEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No past events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  )
}

export default MyEvents 