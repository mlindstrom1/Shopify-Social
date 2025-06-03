import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Avatar,
  Badge,
  Icon,
  Wrap,
  WrapItem,
  useColorModeValue,
  Divider,
  List,
  ListItem,
  ListIcon,
  Tag,
  Image
} from '@chakra-ui/react'
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaExternalLinkAlt,
  FaClock,
  FaInfoCircle,
  FaCheckCircle,
  FaUserCircle
} from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import { allEvents } from './events'
import EventFeed from './EventFeed'

// Import the getEventTypeColor function
const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'workshop':
      return 'linear(to-r, blue.400, purple.500)'
    case 'networking':
      return 'linear(to-r, green.400, teal.500)'
    case 'social':
      return 'linear(to-r, pink.400, red.500)'
    case 'meetup':
      return 'linear(to-r, orange.400, yellow.500)'
    case 'conference':
      return 'linear(to-r, purple.400, pink.500)'
    default:
      return 'linear(to-r, gray.400, gray.600)'
  }
}

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = allEvents.find(e => e.id === id)

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const mutedColor = useColorModeValue('gray.500', 'gray.400')

  if (!event) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Event not found</Text>
      </Container>
    )
  }

  const maxAttendees = event.maxAttendees || 999
  const spotsLeft = maxAttendees - event.currentAttendees

  return (
    <Container maxW="container.xl" p={8}>
      <Button mb={4} onClick={() => navigate(-1)} leftIcon={<Icon as={FaCalendarAlt} />}>
        Back to Events
      </Button>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            {/* Main Event Info */}
            <Box>
              <Image
                src={event.image}
                alt={event.title}
                height="400px"
                width="100%"
                objectFit="cover"
                borderRadius="lg"
              />
              
              <Box mt={6}>
                <HStack spacing={4} mb={4}>
                  <Badge
                    bgGradient={getEventTypeColor(event.type)}
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="md"
                  >
                    {event.type}
                  </Badge>
                  {event.topics?.map(topic => (
                    <Tag key={topic} size="md" variant="subtle" colorScheme="blue">
                      {topic}
                    </Tag>
                  ))}
                </HStack>

                <Heading size="xl" mb={4}>{event.title}</Heading>

                <HStack spacing={6} mb={6} color={mutedColor}>
                  <HStack>
                    <Icon as={FaUserCircle} />
                    <Text>Hosted by {event.organizer}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUsers} />
                    <Text>{event.attendees} attending</Text>
                  </HStack>
                </HStack>

                <Box p={6} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <Box>
                      <HStack mb={4}>
                        <Icon as={FaCalendarAlt} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Date and Time</Text>
                          <HStack spacing={2}>
                            <Text fontWeight="bold">Date:</Text>
                            <Text color={textColor}>{new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Text fontWeight="bold">Time:</Text>
                            <Text color={textColor}>{new Date(event.date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}</Text>
                            {event.endDate && (
                              <>
                                <Text color={textColor}>-</Text>
                                <Text color={textColor}>{new Date(event.endDate).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}</Text>
                              </>
                            )}
                          </HStack>
                        </Box>
                      </HStack>

                      <HStack>
                        <Icon as={FaMapMarkerAlt} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Location</Text>
                          <Text color={textColor}>{event.venue.name}</Text>
                          <Text color={textColor}>{event.venue.address}</Text>
                          <Text color={textColor}>{event.venue.city}</Text>
                        </Box>
                      </HStack>
                    </Box>

                    <Box>
                      <HStack mb={4}>
                        <Icon as={FaClock} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Duration</Text>
                          <Text color={textColor}>
                            {event.endDate ? 
                              `${new Date(event.endDate).getHours() - new Date(event.date).getHours()} hours` :
                              'Duration not specified'}
                          </Text>
                        </Box>
                      </HStack>

                      <HStack>
                        <Icon as={FaInfoCircle} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Price</Text>
                          <Text color={textColor}>
                            {event.price ? `$${event.price.amount} ${event.price.currency}` : 'Free'}
                          </Text>
                          {event.price?.refundPolicy && (
                            <Text fontSize="sm" color={mutedColor}>
                              {event.price.refundPolicy}
                            </Text>
                          )}
                        </Box>
                      </HStack>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Box>

            {/* Event Details */}
            <Box>
              <Heading size="lg" mb={4}>About this event</Heading>
              <Text whiteSpace="pre-line" color={textColor}>
                {event.description}
              </Text>
            </Box>

            {/* Guidelines */}
            {event.guidelines && (
              <Box>
                <Heading size="lg" mb={4}>Group Guidelines</Heading>
                <List spacing={3}>
                  {event.guidelines.map((guideline, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      <Text color={textColor}>{guideline}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Event Feed Section */}
            <Box>
              <Heading size="lg" mb={6}>Event Activity</Heading>
              <EventFeed eventTitle={event.title} />
            </Box>
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <Box
            p={6}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            position="sticky"
            top={8}
          >
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {typeof spotsLeft === 'number' ? `${spotsLeft} spots left` : 'Open attendance'}
                </Text>
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  width="full"
                  leftIcon={<Icon as={FaUsers} />}
                >
                  Attend Event
                </Button>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Attendees ({event.attendees})</Text>
                <Wrap>
                  {[...Array(Math.min(8, event.attendees))].map((_, i) => (
                    <WrapItem key={i}>
                      <Avatar
                        size="md"
                        name={`Attendee ${i + 1}`}
                        src={`https://i.pravatar.cc/150?u=${i}`}
                      />
                    </WrapItem>
                  ))}
                  {event.attendees > 8 && (
                    <WrapItem>
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="full"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={textColor}
                      >
                        +{event.attendees - 8}
                      </Box>
                    </WrapItem>
                  )}
                </Wrap>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb={2}>Share Event</Text>
                <HStack>
                  <Button 
                    variant="outline" 
                    flex={1}
                    leftIcon={<Icon as={FaExternalLinkAlt} />}
                  >
                    Copy Link
                  </Button>
                  <Button 
                    variant="outline" 
                    flex={1}
                    leftIcon={<Icon as={FaUsers} />}
                  >
                    Share
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default EventDetails 