import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { FaUsers, FaCalendarAlt, FaComments } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()
  const bgGradient = useColorModeValue(
    'linear(to-r, pink.50, purple.50)',
    'linear(to-r, pink.900, purple.900)'
  )
  const textColor = useColorModeValue('gray.700', 'gray.200')
  const headingGradient = 'linear(to-r, pink.500, purple.500, yellow.300)'

  // Dynamic base path for video - works for both localhost and GitHub Pages
  const getVideoPath = () => {
    const isGitHubPages = window.location.hostname === 'mlindstrom1.github.io'
    return isGitHubPages ? '/Shopify-Social/videos/board-game.mp4' : '/videos/board-game.mp4'
  }

  return (
    <Box
      bg={bgGradient}
      py={16}
      overflow="hidden"
      position="relative"
      mt="-60px"
      pt="76px"
      borderRadius="xl"
    >
      <Container maxW="container.xl">
        <Box position="relative" zIndex={2}>
          <VStack spacing={6} align="flex-start" maxW="600px">
            <Heading
              size="2xl"
              bgGradient={headingGradient}
              bgClip="text"
              lineHeight="1.2"
            >
              Connect, Create, Collaborate
            </Heading>
            
            <Text fontSize="lg" color={textColor}>
              Join a vibrant community of fellow Shopifolk. Discover events, shared interests, and grow your network.
            </Text>

            <HStack spacing={8} pt={4}>
              <VStack align="flex-start" spacing={1}>
                <Icon as={FaUsers} boxSize={6} color="pink.500" />
                <Text fontWeight="bold">500+</Text>
                <Text fontSize="sm" color={textColor}>Active Members</Text>
              </VStack>

              <VStack align="flex-start" spacing={1}>
                <Icon as={FaCalendarAlt} boxSize={6} color="purple.500" />
                <Text fontWeight="bold">50+</Text>
                <Text fontSize="sm" color={textColor}>Monthly Events</Text>
              </VStack>

              <VStack align="flex-start" spacing={1}>
                <Icon as={FaComments} boxSize={6} color="yellow.400" />
                <Text fontWeight="bold">1000+</Text>
                <Text fontSize="sm" color={textColor}>Discussions</Text>
              </VStack>
            </HStack>

            <HStack spacing={4} pt={4}>
              <Button
                bgGradient="linear(to-r, pink.400, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, pink.500, purple.600)"
                }}
                color="white"
                size="lg"
                onClick={() => navigate('/events/explore-events')}
                border="none"
                _focus={{ boxShadow: 'none' }}
              >
                Explore Events
              </Button>
              <Button
                variant="ghost"
                color="purple.500"
                _hover={{
                  bg: "purple.50",
                  color: "purple.600"
                }}
                size="lg"
                onClick={() => navigate('/groups/explore-groups')}
                border="none"
                _focus={{ boxShadow: 'none' }}
              >
                Join Groups
              </Button>
            </HStack>
          </VStack>
        </Box>

        {/* Video background */}
        <Box 
          position="absolute" 
          right={0} 
          top={0} 
          height="100%" 
          width="100%" 
          overflow="hidden"
          zIndex={1}
        >
          {/* Video container */}
          <Box
            position="absolute"
            inset={0}
            overflow="hidden"
            sx={{
              filter: 'saturate(0.8) brightness(0.9) contrast(1.1) grayscale(0.2)',
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.85,
                transform: 'scale(1)',
                transformOrigin: 'center center'
              }}
            >
              <source src={getVideoPath()} type="video/mp4" />
            </video>
          </Box>

          {/* Overlay to ensure text readability */}
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-r, white 30%, rgba(255,255,255,0.98) 35%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.1) 60%, transparent)"
            zIndex={2}
          />

          {/* Color overlay */}
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(45deg, rgba(255,192,203,0.2), rgba(147,112,219,0.2), rgba(255,223,186,0.15))"
            mixBlendMode="multiply"
            zIndex={3}
          />

          {/* Soft light blend */}
          <Box
            position="absolute"
            inset={0}
            bg="rgba(0,0,0,0.1)"
            mixBlendMode="multiply"
            zIndex={4}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection 