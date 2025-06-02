import { Box, Heading, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'
import { Event } from './events'
import EventCard from './EventCard'

interface NearbyEventsProps {
  events: Event[];
}

const NearbyEvents = ({ events }: NearbyEventsProps) => {
  return (
    <Box>
      <Heading size="lg" mb={4}>Events Near You</Heading>
      {events.length === 0 ? (
        <Text color={useColorModeValue('gray.600', 'gray.400')}>No nearby events found</Text>
      ) : (
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {events.map(event => (
            <EventCard key={event.id} event={event} showPreview={true} />
        ))}
      </SimpleGrid>
      )}
    </Box>
  )
}

export default NearbyEvents 