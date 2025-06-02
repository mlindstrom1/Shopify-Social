import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  HStack,
  Icon
} from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useState } from 'react'

interface LocationIndicatorProps {
  initialLocation?: string;
}

const LocationIndicator = ({ initialLocation = "Toronto/Canada" }: LocationIndicatorProps) => {
  const { isOpen, onClose } = useDisclosure()
  const [location, setLocation] = useState(initialLocation)
  const [tempLocation, setTempLocation] = useState(location)
  
  const handleSave = () => {
    setLocation(tempLocation)
    onClose()
  }

  return (
    <>
      <HStack spacing={1} color="gray.500">
        <Icon as={FaMapMarkerAlt} />
        <Text fontSize="sm">{location}</Text>
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Location (City/Country)</FormLabel>
              <Input 
                placeholder="e.g. Toronto/Canada"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LocationIndicator 