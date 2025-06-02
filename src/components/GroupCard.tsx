import {
  Box,
  Badge,
  Image,
  Text,
  Heading,
  VStack,
  HStack,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa'
import { Group } from './ExploreGroups'
import { useNavigate } from 'react-router-dom'

interface GroupCardProps {
  group: Group
  showRole?: boolean
  role?: string
  onClick?: (groupId: string) => void
}

const getGroupCategoryColor = (category: string) => {
  const colors = {
    Technology: 'linear(to-r, blue.400, cyan.400)',
    Gaming: 'linear(to-r, purple.400, pink.400)',
    Sports: 'linear(to-r, green.400, teal.400)',
    Wellness: 'linear(to-r, orange.400, yellow.400)',
    Arts: 'linear(to-r, pink.400, red.400)',
    Business: 'linear(to-r, gray.400, blue.400)'
  }
  return colors[category as keyof typeof colors] || 'gray.500'
}

const getRoleBadgeProps = (role: string) => {
  switch (role) {
    case 'admin':
      return {
        bgGradient: 'linear(to-r, red.400, orange.400)',
        color: 'white'
      }
    case 'moderator':
      return {
        bgGradient: 'linear(to-r, purple.400, pink.400)',
        color: 'white'
      }
    case 'member':
      return {
        bgGradient: 'linear(to-r, green.400, teal.400)',
        color: 'white'
      }
    default:
      return {
        bgGradient: 'linear(to-r, gray.400, gray.500)',
        color: 'white'
      }
  }
}

const GroupCard = ({ group, showRole = false, role = group.role, onClick }: GroupCardProps) => {
  const navigate = useNavigate()
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')

  const handleClick = () => {
    if (onClick) {
      onClick(group.id);
    } else {
      navigate(`/groups/${group.id}`);
    }
  }

  return (
    <Box
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={handleClick}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
      }}
    >
      <Box height="140px" overflow="hidden">
        <Image
          src={group.image}
          alt={group.name}
          objectFit="cover"
          width="100%"
          height="100%"
        />
      </Box>
      <VStack p={4} align="stretch" spacing={2}>
        <Text fontWeight="bold" noOfLines={2}>
          {group.name}
        </Text>
        <HStack spacing={2}>
          <Icon as={FaUsers} color="gray.500" />
          <Text fontSize="sm" color="gray.500">
            {group.members} members
          </Text>
        </HStack>
        {showRole && role && (
          <Badge
            {...getRoleBadgeProps(role.toLowerCase())}
            textTransform="capitalize"
            fontSize="xs"
            borderRadius="full"
          >
            {role}
          </Badge>
        )}
      </VStack>
    </Box>
  )
}

export default GroupCard 