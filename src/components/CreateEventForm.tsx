import { 
  Box, 
  VStack, 
  FormControl, 
  FormLabel, 
  Input, 
  Textarea, 
  Button, 
  SimpleGrid, 
  Text, 
  Badge, 
  HStack, 
  useColorModeValue,
  Select,
  Icon,
  Grid,
  GridItem,
  FormHelperText,
  Switch,
  Divider,
  useToast,
  InputGroup,
  InputLeftElement,
  Heading
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaTimes, FaImage, FaMapMarkerAlt, FaUsers, FaTag, FaCalendar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Event } from './events'
import EventCard from './EventCard'

const CreateEventForm = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [location, setLocation] = useState('')
  const [venue, setVenue] = useState({
    name: '',
    address: '',
    city: ''
  })
  const [type, setType] = useState('')
  const [maxAttendees, setMaxAttendees] = useState('')
  const [price, setPrice] = useState<{ amount: number; currency: string; refundPolicy?: string } | undefined>()
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [previewEvent, setPreviewEvent] = useState<Event | null>(null)

  useEffect(() => {
    if (title && description && date) {
      setPreviewEvent({
        id: 'preview',
        title,
        description,
        date,
        endDate,
        location: location || 'Location TBD',
        type: type || 'Social',
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
        attendees: 0,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined,
        currentAttendees: 0,
        organizer: 'You',
        price: price || undefined,
        venue: {
          name: venue.name || 'Venue TBD',
          address: venue.address || 'Address TBD',
          city: venue.city || 'City TBD',
          coordinates: {
            lat: 43.6532,
            lng: -79.3832
          }
        },
        privacy: isPublic ? 'public' : 'private',
        status: 'upcoming',
        guidelines: [],
        topics: tags,
        tags: tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    } else {
      setPreviewEvent(null)
    }
  }, [title, description, date, endDate, location, type, venue, tags, maxAttendees, price, isPublic])

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      if (!tags.includes(newTag.trim().toLowerCase())) {
        setTags([...tags, newTag.trim().toLowerCase()])
      }
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handlePriceChange = (value: string) => {
    if (!value) {
      setPrice(undefined)
    } else {
      const amount = Number(value)
      if (!isNaN(amount)) {
        setPrice({
          amount,
          currency: 'USD',
          refundPolicy: 'Full refund up to 48 hours before the event'
        } as const)
      }
    }
  }

  const handleSubmit = () => {
    // Validate form
    if (!title || !description || !date || !location || !type) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    // Submit form logic here
    toast({
      title: 'Event created!',
      description: 'Your event has been created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    navigate('/events/my-events')
  }

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={4} align="stretch">
        <Box
          bg={bgColor}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="xl"
          p={8}
        >
          <VStack spacing={6} align="stretch" mb={8}>
            <Button
              bg="black"
              color="white"
              size="lg"
              leftIcon={<Icon as={FaCalendar} />}
              _hover={{ bg: 'gray.800' }}
              alignSelf="center"
            >
              Book Using Port Booking App
            </Button>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
            <GridItem>
              <VStack spacing={6} align="stretch">
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Event Title</FormLabel>
                  <Input
                    placeholder="Enter event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    size="lg"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Description</FormLabel>
                  <Textarea
                    placeholder="Describe your event"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                    rows={6}
                  />
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Start Date & Time</FormLabel>
                    <Input
                      type="datetime-local"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      size="lg"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="bold">End Date & Time</FormLabel>
                    <Input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      size="lg"
                    />
                  </FormControl>
                </SimpleGrid>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Location</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaMapMarkerAlt} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="Event location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Venue Details</FormLabel>
                  <VStack spacing={4}>
                    <Input
                      placeholder="Venue name"
                      value={venue.name}
                      onChange={(e) => setVenue({ ...venue, name: e.target.value })}
                      size="lg"
                    />
                    <Input
                      placeholder="Street address"
                      value={venue.address}
                      onChange={(e) => setVenue({ ...venue, address: e.target.value })}
                      size="lg"
                    />
                    <Input
                      placeholder="City"
                      value={venue.city}
                      onChange={(e) => setVenue({ ...venue, city: e.target.value })}
                      size="lg"
                    />
                  </VStack>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Event Type</FormLabel>
                    <Select
                      placeholder="Select event type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      size="lg"
                    >
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
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight="bold">Associated Group</FormLabel>
                    <Select
                      placeholder="Select a group (optional)"
                      value={selectedGroup}
                      onChange={(e) => setSelectedGroup(e.target.value)}
                      size="lg"
                    >
                      <option value="group1">Tech Enthusiasts Toronto</option>
                      <option value="group2">Toronto Developers Network</option>
                      <option value="group3">Shopify Partners Community</option>
                    </Select>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel fontWeight="bold">Tags</FormLabel>
                  <VStack spacing={2} align="stretch">
                    <HStack spacing={2} flexWrap="wrap">
                      {tags.map(tag => (
                        <Badge
                          key={tag}
                          colorScheme="blue"
                          p={2}
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                        >
                          {tag}
                          <Icon
                            as={FaTimes}
                            ml={2}
                            cursor="pointer"
                            onClick={() => handleRemoveTag(tag)}
                          />
                        </Badge>
                      ))}
                    </HStack>
                    <InputGroup size="lg">
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaTag} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        placeholder="Add tags (press Enter to add)"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleAddTag}
                      />
                    </InputGroup>
                  </VStack>
                </FormControl>
              </VStack>
            </GridItem>

            <GridItem>
              <VStack spacing={6} align="stretch" position="sticky" top={8}>
                <Box
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor={borderColor}
                  borderRadius="lg"
                  p={6}
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
                >
                  <Icon as={FaImage} boxSize={8} color="gray.400" mb={4} />
                  <Text>Upload Event Image</Text>
                  <Text fontSize="sm" color="gray.500">
                    Recommended size: 1200x600px
                  </Text>
                </Box>

                {previewEvent && (
                  <Box>
                    <Heading size="md" mb={4}>Preview</Heading>
                    <EventCard event={previewEvent} showPreview={true} />
                  </Box>
                )}

                <Divider />

                <FormControl>
                  <FormLabel fontWeight="bold">Maximum Attendees</FormLabel>
                  <InputGroup size="lg">
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUsers} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="number"
                      placeholder="Leave blank for unlimited"
                      value={maxAttendees}
                      onChange={(e) => setMaxAttendees(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">Price</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      placeholder="Enter price (leave blank if free)"
                      value={price?.amount.toString() || ''}
                      onChange={(e) => handlePriceChange(e.target.value)}
                    />
                  </InputGroup>
                  <FormHelperText>Enter 0 for free events</FormHelperText>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0" fontWeight="bold">Make this event public</FormLabel>
                  <Switch
                    isChecked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    colorScheme="blue"
                  />
                </FormControl>

                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleSubmit}
                  isDisabled={!title || !description || !date || !location || !type}
                >
                  Create Event
                </Button>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Box>
  )
}

export default CreateEventForm