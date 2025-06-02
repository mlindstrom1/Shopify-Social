import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Icon,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Box,
  Divider
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa'

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const locations = [
  "Toronto, Canada",
  "Vancouver, Canada",
  "Montreal, Canada",
  "New York, USA",
  "San Francisco, USA",
  "Los Angeles, USA",
  "Chicago, USA",
  "Boston, USA",
  "Seattle, USA",
  "London, UK",
  "Manchester, UK",
  "Dublin, Ireland",
  "Sydney, Australia",
  "Melbourne, Australia",
  "Singapore",
  "Tokyo, Japan",
  "Berlin, Germany",
  "Paris, France",
  "Amsterdam, Netherlands",
  "Barcelona, Spain"
];

const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const popularLocations = [
    "Toronto, Canada",
    "New York, USA",
    "London, UK",
    "San Francisco, USA",
    "Vancouver, Canada"
  ]

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

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputGroup mb={4}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>

            {!searchTerm && (
              <>
                <Text fontWeight="bold" mb={2}>Popular Locations</Text>
                <VStack spacing={2} align="stretch" mb={4}>
                  {popularLocations.map((location) => (
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
                <Divider my={4} />
                <Text fontWeight="bold" mb={2}>All Locations</Text>
              </>
            )}

            <VStack spacing={2} align="stretch" maxH="300px" overflowY="auto">
              {filteredLocations.map((location) => (
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
              {filteredLocations.length === 0 && (
                <Box textAlign="center" py={4} color="gray.500">
                  No locations found matching your search
                </Box>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LocationSelector 