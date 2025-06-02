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
  Select,
  HStack,
  Badge
} from '@chakra-ui/react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Group } from './ExploreGroups'
import GroupCard from './GroupCard'

interface MyGroupsProps {
  groups: Group[];
}

const locations = [
  "All Locations",
  "Toronto, ON",
  "San Francisco, CA",
  "New York, NY",
  "Boston, MA",
  "Seattle, WA"
];

const categories = [
  "All Categories",
  "Technology",
  "Gaming",
  "Sports",
  "Wellness",
  "Arts",
  "Business"
];

const roles = [
  "All Roles",
  "Admin",
  "Moderator",
  "Member"
];

const MyGroups = ({ groups }: MyGroupsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const clearFilters = () => {
    setSelectedLocation("All Locations");
    setSelectedRole("All Roles");
    setSelectedCategory("All Categories");
  };

  const activeFilters = [
    selectedLocation !== "All Locations",
    selectedRole !== "All Roles",
    selectedCategory !== "All Categories"
  ].filter(Boolean).length;

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === "All Locations" || group.location === selectedLocation;
    const matchesRole = selectedRole === "All Roles" || (group.role && group.role.toLowerCase() === selectedRole.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || group.category === selectedCategory;

    return matchesSearch && matchesLocation && matchesRole && matchesCategory;
  });

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

          <HStack mb={4} justify="space-between">
            <Text color="gray.600" fontSize="sm">
              Filters {activeFilters > 0 && <Badge ml={2} colorScheme="blue">{activeFilters}</Badge>}
            </Text>
            {activeFilters > 0 && (
              <IconButton
                aria-label="Clear filters"
                icon={<Icon as={FaTimes} />}
                size="sm"
                onClick={clearFilters}
                variant="ghost"
              />
            )}
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Select
              value={selectedLocation}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedLocation(e.target.value)}
              size="lg"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </Select>

            <Select
              value={selectedRole}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRole(e.target.value)}
              size="lg"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </Select>

            <Select
              value={selectedCategory}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
              size="lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
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