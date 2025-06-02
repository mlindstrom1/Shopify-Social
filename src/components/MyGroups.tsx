import React, { useState } from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Icon,
  Select,
  HStack,
  useColorModeValue
} from '@chakra-ui/react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import GroupCard from './GroupCard';
import { Group } from './ExploreGroups';

interface MyGroupsProps {
  groups: Group[];
}

const categories = ["All Categories", "Technology", "Gaming", "Sports", "Wellness", "Arts", "Business"];
const locations = ["All Locations", "Toronto, ON", "San Francisco, CA", "New York, NY", "Boston, MA", "Seattle, WA"];
const membershipStatuses = ["All Roles", "Admin", "Moderator", "Member"];

const MyGroups: React.FC<MyGroupsProps> = ({ groups }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const clearSearch = () => setSearchQuery("");

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "All Locations" || group.location === selectedLocation;
    const matchesCategory = selectedCategory === "All Categories" || group.category === selectedCategory;
    const matchesRole = selectedRole === "All Roles" || group.role?.toLowerCase() === selectedRole.toLowerCase();

    return matchesSearch && matchesLocation && matchesCategory && matchesRole;
  });

  if (!groups || groups.length === 0) {
    return (
      <Box p={6} textAlign="center">
        <Text>You haven't joined any groups yet.</Text>
      </Box>
    );
  }

  return (
    <Box width="100%" minH="100%" pb={8}>
      <VStack spacing={6} align="stretch">
        <Box bg={useColorModeValue('gray.50', 'gray.900')} pt={2} pb={4}>
          <InputGroup size="lg" mb={6}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search my groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              pr="4.5rem"
            />
            {searchQuery && (
              <InputRightElement>
                <IconButton
                  aria-label="Clear search"
                  icon={<FaTimes />}
                  size="sm"
                  onClick={clearSearch}
                  variant="ghost"
                />
              </InputRightElement>
            )}
          </InputGroup>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              placeholder="Category"
              size="lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </Select>

            <Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              placeholder="Location"
              size="lg"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>

            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              placeholder="Membership Status"
              size="lg"
            >
              {membershipStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
          </SimpleGrid>
        </Box>

        {filteredGroups.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">No groups found matching your criteria</Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}>
            {filteredGroups.map(group => (
              <GroupCard 
                key={group.id} 
                group={group}
                showRole={true}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Box>
  );
};

export default MyGroups; 