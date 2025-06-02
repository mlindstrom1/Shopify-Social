import { 
  Box, 
  VStack,
  useColorModeValue,
  Icon,
  Text,
  HStack,
  Link,
  Flex
} from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaCalendarAlt, FaUsers, FaCog, FaStream } from 'react-icons/fa'

const mainNavItems = [
  { name: 'Home', path: '/home', icon: FaHome },
  { name: 'Events', path: '/events/explore-events', icon: FaCalendarAlt },
  { name: 'Groups', path: '/groups/explore-groups', icon: FaUsers },
  { name: 'Activity Feed', path: '/activity-feed', icon: FaStream }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const bgColor = useColorModeValue('white', 'gray.800')
  const selectedBg = useColorModeValue('blue.50', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  const isPathActive = (path: string) => {
    if (path === '/home') {
      return location.pathname === '/home' || location.pathname === '/'
    }
    if (path === '/activity-feed') {
      return location.pathname.startsWith('/activity-feed')
    }
    return location.pathname.startsWith(path.split('/')[1])
  }

  const NavItem = ({ item }: { item: { name: string; path: string; icon: any } }) => (
    <Link
      onClick={() => navigate(item.path)}
      textDecoration="none"
      _hover={{ textDecoration: 'none' }}
      width="100%"
    >
      <HStack
        px={4}
        py={3}
        spacing={4}
        borderRadius="md"
        bg={isPathActive(item.path) ? selectedBg : 'transparent'}
        _hover={{ bg: isPathActive(item.path) ? selectedBg : hoverBg }}
        cursor="pointer"
      >
        <Icon as={item.icon} boxSize={5} />
        <Text>{item.name}</Text>
      </HStack>
    </Link>
  )

  return (
    <Flex 
      w="250px" 
      bg={bgColor} 
      borderRight="1px" 
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      p={4}
      height="100%"
      direction="column"
    >
      <VStack spacing={2} align="stretch" flex="1">
        {mainNavItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </VStack>
      <NavItem item={{ name: 'Settings', path: '/settings/general', icon: FaCog }} />
    </Flex>
  )
}

export default Sidebar 