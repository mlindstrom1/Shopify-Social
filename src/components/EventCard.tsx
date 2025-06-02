import { Box, Image, Text, VStack, Badge, useColorModeValue, Button, Heading, Icon, HStack } from '@chakra-ui/react'
import { FaUsers, FaLaptopCode, FaBriefcase, FaGraduationCap, FaDice, FaRunning, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Event, isEventPast } from './events'

interface EventCardProps {
  event: Event
  showBooking?: boolean
  showPreview?: boolean
}

const formatEventDateTime = (dateStr: string, endDateStr?: string) => {
  const date = new Date(dateStr);
  const endDate = endDateStr ? new Date(endDateStr) : null;
  
  const dateFormatted = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const timeFormatted = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const endTimeFormatted = endDate?.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return {
    date: dateFormatted,
    time: `${timeFormatted}${endTimeFormatted ? ` - ${endTimeFormatted}` : ''}`
  };
};

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
    Social: FaUsers,
    Workshop: FaLaptopCode,
    Professional: FaBriefcase,
    Educational: FaGraduationCap,
    Games: FaDice,
    Sports: FaRunning
  }
  return icons[type as keyof typeof icons] || FaUsers
}

const EventCard = ({ event, showBooking = true, showPreview = false }: EventCardProps) => {
  const navigate = useNavigate()
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const isPast = isEventPast(event)

  const handleViewDetails = () => {
    navigate(`/events/${event.id}`)
  }

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ 
        transform: 'translateY(-6px)',
        shadow: 'xl',
        borderColor: 'blue.400',
        cursor: 'pointer'
      }}
      onClick={handleViewDetails}
      opacity={isPast ? 0.8 : 1}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" flex="0 0 auto">
        <Image
          src={event.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800'}
          alt={event.title}
          height="250px"
          width="100%"
          objectFit="cover"
          filter={isPast ? 'grayscale(100%)' : 'none'}
        />
        {isPast && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            bg="gray.600"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="sm"
          >
            Past Event
          </Badge>
        )}
        <Badge 
          position="absolute"
          bottom={4}
          left={4}
          bgGradient={getEventTypeColor(event.type)}
          color="white"
          display="flex"
          alignItems="center"
          px={3}
          py={1.5}
          borderRadius="full"
          fontSize="sm"
          boxShadow="md"
        >
          <Icon as={getEventTypeIcon(event.type)} mr={2} />
          {event.type}
        </Badge>
      </Box>
      <VStack 
        align="stretch" 
        p={6} 
        spacing={4}
        flex="1"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Heading size="lg" lineHeight="1.2">{event.title}</Heading>
        <VStack align="stretch" spacing={1}>
          <HStack spacing={2}>
            <Text fontSize="md" color={textColor} fontWeight="bold">Date:</Text>
            <Text fontSize="md" color={textColor}>{formatEventDateTime(event.date, event.endDate).date}</Text>
          </HStack>
          <HStack spacing={2}>
            <Text fontSize="md" color={textColor} fontWeight="bold">Time:</Text>
            <Text fontSize="md" color={textColor}>{formatEventDateTime(event.date, event.endDate).time}</Text>
          </HStack>
        </VStack>
        <Text fontSize="md" color={textColor}>{event.location}</Text>
        <Text fontSize="md" color={textColor} display="flex" alignItems="center">
          <Icon as={FaUsers} mr={2} />
          {event.attendees} attending
        </Text>

        {showPreview && (
          <VStack align="stretch" spacing={3} mt={2}>
            <Text fontSize="md" color={textColor} noOfLines={3}>
              {event.description}
            </Text>
            <HStack spacing={4} color={textColor}>
              <HStack>
                <Icon as={FaMapMarkerAlt} />
                <Text fontSize="sm">{event.venue.name}</Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text fontSize="sm">
                  {event.endDate ? 
                    `${new Date(event.endDate).getHours() - new Date(event.date).getHours()} hours` :
                    'Duration not specified'}
                </Text>
              </HStack>
            </HStack>
            {event.topics && event.topics.length > 0 && (
              <HStack spacing={2} flexWrap="wrap">
                {event.topics.map(topic => (
                  <Badge 
                    key={topic}
                    colorScheme="blue"
                    variant="subtle"
                    fontSize="xs"
                  >
                    {topic}
                  </Badge>
                ))}
              </HStack>
            )}
          </VStack>
        )}

        {showBooking && (
          <Button 
            size="md" 
            colorScheme="blue" 
            variant={isPast ? "outline" : "solid"}
            mt="auto"
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
            isDisabled={isPast}
            height="48px"
            fontSize="md"
            _hover={{
              transform: 'translateY(-2px)',
              shadow: 'md'
            }}
          >
            {isPast ? 'View Event' : 'View Details'}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default EventCard 