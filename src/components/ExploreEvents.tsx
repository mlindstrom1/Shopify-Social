import {
  Box,
  VStack,
  Container,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
  Icon,
  HStack,
  Select,
  SimpleGrid,
  useColorModeValue,
  Heading,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import EventCard from './EventCard';
import { Event, isEventPast } from './events';

interface ExploreEventsProps {
  events: Event[];
}

const eventTypes = [
  'All Types',
  'Social',
  'Workshop',
  'Professional',
  'Games',
  'Sports',
  'Arts',
  'Crafts',
  'Food',
  'Music',
  'Outdoors',
  'Wellness'
];

const locations = [
  'All Locations',
  'Toronto, ON',
  'Virtual Event',
  'New York, NY',
  'San Francisco, CA',
  'Boston, MA'
];

const dates = [
  'All Dates',
  'Today',
  'This Week',
  'This Month',
  'Next Month'
];

const ExploreEvents = ({ events = [] }: ExploreEventsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedDate, setSelectedDate] = useState('All Dates');
  const [sortBy, setSortBy] = useState('date-asc');

  const clearSearch = () => setSearchTerm('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === 'all' || event.type.toLowerCase() === eventType.toLowerCase();
    const matchesLocation = selectedLocation === 'All Locations' || event.location.includes(selectedLocation);
    const matchesDate = selectedDate === 'All Dates' || true; // TODO: Implement date filtering
    return matchesSearch && matchesType && matchesLocation && matchesDate;
  });

  const upcomingEvents = filteredEvents.filter(event => !isEventPast(event));
  const pastEvents = filteredEvents.filter(event => isEventPast(event));

  // Sort events by date
  const sortedUpcomingEvents = [...upcomingEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const sortedPastEvents = [...pastEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const allEvents = [...sortedUpcomingEvents, ...sortedPastEvents];

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={4} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4}>
          <InputGroup size="lg" mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              pr="4.5rem"
            />
            {searchTerm && (
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
              {allEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {allEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            <TabPanel px={0}>
              {sortedUpcomingEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No upcoming events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {sortedUpcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>

            <TabPanel px={0}>
              {sortedPastEvents.length === 0 ? (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color="gray.500">No past events found matching your criteria</Text>
                </Box>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {sortedPastEvents.map(event => (
                    <EventCard key={event.id} event={event} showPreview={true} />
                  ))}
                </SimpleGrid>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default ExploreEvents; 