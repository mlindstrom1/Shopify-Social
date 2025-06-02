import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Select,
  useColorModeValue,
  SimpleGrid,
  Text,
  Icon,
  InputGroup,
  InputLeftElement,
  useToast,
  Switch
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaImage } from 'react-icons/fa'

const CreateGroup = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [meetingFrequency, setMeetingFrequency] = useState('')
  const [image, setImage] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [guidelines, setGuidelines] = useState('')
  const [settings, setSettings] = useState({
    allowMemberEvents: true,
    requireMemberApproval: false,
    allowMemberPosts: true,
    showInSearch: true
  })

  const handleSubmit = () => {
    // Here you would typically make an API call to create the group
    toast({
      title: 'Group created!',
      description: 'Your group has been created successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    navigate('/groups/explore-groups')
  }

  return (
    <Box>
      <VStack spacing={8} align="stretch">
        <Box bg={bgColor} p={6} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Group Name</FormLabel>
              <Input
                placeholder="Enter group name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                size="lg"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="What is your group about?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                size="lg"
                minH="200px"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Group Guidelines</FormLabel>
              <Textarea
                placeholder="Enter group guidelines and rules"
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                size="lg"
                minH="150px"
                maxLength={1000}
              />
              <Text fontSize="sm" color="gray.500" mt={2}>
                {guidelines.length}/1000 characters
              </Text>
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  size="lg"
                >
                  <option value="Technology">Technology</option>
                  <option value="Professional">Professional</option>
                  <option value="Social">Social</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Sports">Sports</option>
                  <option value="Arts">Arts</option>
                  <option value="Education">Education</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Food">Food</option>
                  <option value="Music">Music</option>
                  <option value="Outdoors">Outdoors</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Meeting Frequency</FormLabel>
                <Select
                  placeholder="Select frequency"
                  value={meetingFrequency}
                  onChange={(e) => setMeetingFrequency(e.target.value)}
                  size="lg"
                >
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Monthly">Monthly</option>
                </Select>
              </FormControl>
            </SimpleGrid>

            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaMapMarkerAlt} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Where is your group based?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Cover Image URL</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaImage} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Enter image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Group Privacy</FormLabel>
              <Switch
                isChecked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                colorScheme="green"
              />
            </FormControl>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Allow Member Events</FormLabel>
                <Switch
                  isChecked={settings.allowMemberEvents}
                  onChange={(e) => setSettings({...settings, allowMemberEvents: e.target.checked})}
                  colorScheme="green"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Require Member Approval</FormLabel>
                <Switch
                  isChecked={settings.requireMemberApproval}
                  onChange={(e) => setSettings({...settings, requireMemberApproval: e.target.checked})}
                  colorScheme="green"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Show in Search</FormLabel>
                <Switch
                  isChecked={settings.showInSearch}
                  onChange={(e) => setSettings({...settings, showInSearch: e.target.checked})}
                  colorScheme="green"
                />
              </FormControl>

              <FormControl display="flex" alignItems="center">
                <FormLabel mb="0">Allow Member Posts</FormLabel>
                <Switch
                  isChecked={settings.allowMemberPosts}
                  onChange={(e) => setSettings({...settings, allowMemberPosts: e.target.checked})}
                  colorScheme="green"
                />
              </FormControl>
            </SimpleGrid>

            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSubmit}
              isDisabled={!name || !description || !category || !location || !meetingFrequency}
            >
              Create Group
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default CreateGroup 