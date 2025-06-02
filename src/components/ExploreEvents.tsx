import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  HStack,
  Badge
} from '@chakra-ui/react';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import EventCard from './EventCard';
import { Event, isEventPast } from './events';

interface ExploreEventsProps {
  events: Event[];
}

const locations = [
  'All Locations',
  'Toronto, ON',
  'Virtual Event',
  'New York, NY',
  'San Francisco, CA',
  'Boston, MA'
];

const eventTypes = [
  'All Types',
  'Workshop',
  'Social',
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

const ExploreEvents = ({ events = [] }: ExploreEventsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [eventType, setEventType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('date-asc');
  const [showFilters, setShowFilters] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);

  const clearSearch = () => setSearchTerm('');
  const clearFilters = () => {
    setEventType('All Types');
    setSelectedLocation('All Locations');
    setSortBy('date-asc');
    setActiveFilters(0);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === 'All Types' || event.type === eventType;
    const matchesLocation = selectedLocation === 'All Locations' || event.location.includes(selectedLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

  const upcomingEvents = filteredEvents.filter(event => !isEventPast(event));
  const pastEvents = filteredEvents.filter(event => isEventPast(event));

  // Sort events
  const sortEvents = (eventsToSort: Event[]) => {
    return [...eventsToSort].sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const sortedUpcomingEvents = sortEvents(upcomingEvents);
  const sortedPastEvents = sortEvents(pastEvents);
  const allEvents = [...sortedUpcomingEvents, ...sortedPastEvents];

  // Update active filters count
  useEffect(() => {
    let count = 0;
    if (eventType !== 'All Types') count++;
    if (selectedLocation !== 'All Locations') count++;
    if (sortBy !== 'date-asc') count++;
    setActiveFilters(count);
  }, [eventType, selectedLocation, sortBy]);

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

          <HStack mb={4} justify="space-between">
            <Button
              leftIcon={<Icon as={FaFilter} />}
              onClick={() => setShowFilters(!showFilters)}
              variant="ghost"
              size="sm"
            >
              Filters {activeFilters > 0 && <Badge ml={2} colorScheme="blue">{activeFilters}</Badge>}
            </Button>
            {activeFilters > 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={clearFilters}
              >
                Clear All
              </Button>
            )}
          </HStack>

          {showFilters && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              <Select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                size="lg"
              >
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>

              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                size="lg"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </Select>

              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="lg"
              >
                <option value="date-asc">Date (Earliest First)</option>
                <option value="date-desc">Date (Latest First)</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
              </Select>
            </SimpleGrid>
          )}
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