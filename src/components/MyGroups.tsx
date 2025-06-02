import { useState } from 'react';
import {
  Box,
  VStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  InputRightElement,
  IconButton,
  Select
} from '@chakra-ui/react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Group } from './ExploreGroups'
import GroupCard from './GroupCard'

interface MyGroupsProps {
  groups: Group[];
}

const MyGroups = ({ groups }: MyGroupsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={4} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4}>
          <InputGroup size="lg" mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search my groups..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              pr="4.5rem"
            />
            {searchQuery && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<Icon as={FaTimes} />}
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  variant="ghost"
                />
              </InputRightElement>
            )}
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Select
              value={selectedLocation}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLocation(e.target.value)}
              placeholder="Location"
              size="lg"
            >
              <option value="All Locations">All Locations</option>
              <option value="Toronto, ON">Toronto, ON</option>
              <option value="Virtual">Virtual</option>
            </Select>

            <Select
              value={selectedRole}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRole(e.target.value)}
              placeholder="Role"
              size="lg"
            >
              <option value="All Roles">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Member">Member</option>
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              placeholder="Category"
              size="lg"
            >
              <option value="All Categories">All Categories</option>
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
          </SimpleGrid>
        </Box>

        {filteredGroups.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">No groups found matching your criteria</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {filteredGroups.map(group => (
              <GroupCard key={group.id} group={group} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default MyGroups; 