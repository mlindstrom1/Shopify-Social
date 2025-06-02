import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Icon,
  useDisclosure,
} from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const locations = [
  "Toronto, Canada",
  "Dublin, Ireland",
  "San Francisco, USA",
  "New York, USA",
  "London, UK"
];

const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        variant="ghost"
        onClick={onOpen}
        leftIcon={<Icon as={FaMapMarkerAlt} />}
        color="gray.600"
        _hover={{ color: "blue.500" }}
      >
        {currentLocation}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={2} align="stretch">
              {locations.map((location) => (
                <Button
                  key={location}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => {
                    onLocationChange(location)
                    onClose()
                  }}
                  leftIcon={<Icon as={FaMapMarkerAlt} />}
                  color={location === currentLocation ? "blue.500" : "gray.600"}
                  bg={location === currentLocation ? "blue.50" : "transparent"}
                  _hover={{
                    bg: "blue.50",
                    color: "blue.500"
                  }}
                >
                  {location}
                </Button>
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LocationSelector 