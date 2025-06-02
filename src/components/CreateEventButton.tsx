import { Button, Icon, Box } from '@chakra-ui/react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const CreateEventButton = () => {
  const navigate = useNavigate()

  return (
    <Box
      position="absolute"
      top={6}
      right={6}
      zIndex={2}
    >
      <Button
        bgGradient="linear(to-r, blue.400, blue.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.500, blue.600)"
        }}
        color="white"
        size="lg"
        leftIcon={<Icon as={FaPlus} />}
        onClick={() => navigate('/events/create-event')}
        border="none"
        _focus={{ boxShadow: 'none' }}
        borderRadius="lg"
      >
        Create Event
      </Button>
    </Box>
  )
}

export default CreateEventButton 