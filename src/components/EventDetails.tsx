import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Image,
  Badge,
  HStack,
  Avatar,
  Button,
  Textarea,
  Input,
  useColorModeValue,
  Divider,
  Icon,
  Grid,
  GridItem,
  Tag,
  Wrap,
  WrapItem,
  Link,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaUsers, FaMapMarkerAlt, FaCalendar, FaUserCircle, FaClock, FaInfoCircle, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa'
import { allEvents } from './events'

// Import the getEventTypeColor function
const getEventTypeColor = (type: string) => {
  const colors = {
    Workshop: 'linear(to-r, purple.400, pink.400)',
    Professional: 'linear(to-r, blue.400, cyan.400)',
    Games: 'linear(to-r, orange.400, yellow.400)',
    Social: 'linear(to-r, green.400, teal.400)',
    Tech: 'linear(to-r, red.400, orange.400)',
    Sports: 'linear(to-r, blue.500, cyan.500)',
    Arts: 'linear(to-r, pink.400, red.400)',
    Crafts: 'linear(to-r, teal.400, green.400)',
    Food: 'linear(to-r, yellow.400, orange.400)',
    Music: 'linear(to-r, purple.500, pink.500)',
    Outdoors: 'linear(to-r, green.500, teal.500)',
    Wellness: 'linear(to-r, cyan.400, blue.400)'
  }
  return colors[type as keyof typeof colors] || 'linear(to-r, gray.400, gray.500)'
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  replies: Comment[]
}

const EventDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = allEvents.find(e => e.id === id)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.300')
  const mutedColor = useColorModeValue('gray.500', 'gray.400')

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`event-${id}-comments`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    }
  }, [id])

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`event-${id}-comments`, JSON.stringify(comments))
    }
  }, [comments, id])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User", // In a real app, this would be the logged-in user
      content: newComment,
      timestamp: new Date().toISOString(),
      replies: []
    }

    setComments(prev => [comment, ...prev])
    setNewComment('')
  }

  const handleAddReply = (parentCommentId: string) => {
    if (!replyContent.trim()) return

    const reply: Comment = {
      id: Date.now().toString(),
      author: "Current User", // In a real app, this would be the logged-in user
      content: replyContent,
      timestamp: new Date().toISOString(),
      replies: []
    }

    setComments(prev => prev.map(comment => {
      if (comment.id === parentCommentId) {
        return {
          ...comment,
          replies: [...comment.replies, reply]
        }
      }
      return comment
    }))

    setReplyingTo(null)
    setReplyContent('')
  }

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId))
  }

  const CommentComponent = ({ comment, isReply = false }: { comment: Comment, isReply?: boolean }) => (
    <Box
      p={4}
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      width="100%"
      ml={isReply ? 8 : 0}
    >
      <HStack spacing={4} mb={2} justify="space-between">
        <HStack spacing={4}>
          <Avatar size="sm" name={comment.author} />
          <Text fontWeight="bold">{comment.author}</Text>
          <Text fontSize="sm" color={textColor}>
            {new Date(comment.timestamp).toLocaleDateString()}
          </Text>
        </HStack>
        {!isReply && (
          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteComment(comment.id)
            }}
          >
            Delete
          </Button>
        )}
      </HStack>
      <Text mb={4}>{comment.content}</Text>
      {!isReply && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setReplyingTo(comment.id)}
          mb={replyingTo === comment.id ? 4 : 0}
        >
          Reply
        </Button>
      )}
      {replyingTo === comment.id && (
        <VStack spacing={4} align="stretch">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            size="sm"
          />
          <HStack>
            <Button size="sm" colorScheme="blue" onClick={() => handleAddReply(comment.id)}>
              Post Reply
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
              Cancel
            </Button>
          </HStack>
        </VStack>
      )}
      {comment.replies.length > 0 && (
        <VStack spacing={4} mt={4} align="stretch">
          {comment.replies.map(reply => (
            <CommentComponent key={reply.id} comment={reply} isReply />
          ))}
        </VStack>
      )}
    </Box>
  )

  if (!event) {
    return (
      <Container maxW="container.lg" p={8}>
        <Heading>Event not found</Heading>
        <Button mt={4} onClick={() => navigate('/events')}>Back to Events</Button>
      </Container>
    )
  }

  const spotsLeft = event.maxAttendees ? event.maxAttendees - event.attendees : 'unlimited'

  return (
    <Container maxW="container.xl" p={8}>
      <Button mb={4} onClick={() => navigate(-1)} leftIcon={<Icon as={FaCalendar} />}>
        Back to Events
      </Button>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            {/* Main Event Info */}
            <Box>
              <Image
                src={event.image}
                alt={event.title}
                height="400px"
                width="100%"
                objectFit="cover"
                borderRadius="lg"
              />
              
              <Box mt={6}>
                <HStack spacing={4} mb={4}>
                  <Badge
                    bgGradient={getEventTypeColor(event.type)}
                    color="white"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="md"
                  >
                    {event.type}
                  </Badge>
                  {event.topics?.map(topic => (
                    <Tag key={topic} size="md" variant="subtle" colorScheme="blue">
                      {topic}
                    </Tag>
                  ))}
                </HStack>

                <Heading size="xl" mb={4}>{event.title}</Heading>

                <HStack spacing={6} mb={6} color={mutedColor}>
                  <HStack>
                    <Icon as={FaUserCircle} />
                    <Text>Hosted by {event.organizer}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaUsers} />
                    <Text>{event.attendees} attending</Text>
                  </HStack>
                </HStack>

                <Box p={6} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                    <Box>
                      <HStack mb={4}>
                        <Icon as={FaCalendar} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Date and Time</Text>
                          <HStack spacing={2}>
                            <Text fontWeight="bold">Date:</Text>
                            <Text color={textColor}>{new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Text fontWeight="bold">Time:</Text>
                            <Text color={textColor}>{new Date(event.date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}</Text>
                            {event.endDate && (
                              <>
                                <Text color={textColor}>-</Text>
                                <Text color={textColor}>{new Date(event.endDate).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}</Text>
                              </>
                            )}
                          </HStack>
                        </Box>
                      </HStack>

                      <HStack>
                        <Icon as={FaMapMarkerAlt} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Location</Text>
                          <Text color={textColor}>{event.venue.name}</Text>
                          <Text color={textColor}>{event.venue.address}</Text>
                          <Text color={textColor}>{event.venue.city}</Text>
                        </Box>
                      </HStack>
                    </Box>

                    <Box>
                      <HStack mb={4}>
                        <Icon as={FaClock} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Duration</Text>
                          <Text color={textColor}>
                            {event.endDate ? 
                              `${new Date(event.endDate).getHours() - new Date(event.date).getHours()} hours` :
                              'Duration not specified'}
                          </Text>
                        </Box>
                      </HStack>

                      <HStack>
                        <Icon as={FaInfoCircle} color="blue.500" boxSize={5} />
                        <Box>
                          <Text fontWeight="bold">Price</Text>
                          <Text color={textColor}>
                            {event.price ? `$${event.price.amount} ${event.price.currency}` : 'Free'}
                          </Text>
                          {event.price?.refundPolicy && (
                            <Text fontSize="sm" color={mutedColor}>
                              {event.price.refundPolicy}
                            </Text>
                          )}
                        </Box>
                      </HStack>
                    </Box>
                  </Grid>
                </Box>
              </Box>
            </Box>

            {/* Event Details */}
            <Box>
              <Heading size="lg" mb={4}>About this event</Heading>
              <Text whiteSpace="pre-line" color={textColor}>
                {event.description}
              </Text>
            </Box>

            {/* Guidelines */}
            {event.guidelines && (
              <Box>
                <Heading size="lg" mb={4}>Group Guidelines</Heading>
                <List spacing={3}>
                  {event.guidelines.map((guideline, index) => (
                    <ListItem key={index} display="flex" alignItems="center">
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      <Text color={textColor}>{guideline}</Text>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Comments Section */}
            <Box>
              <Heading size="lg" mb={6}>Discussion</Heading>
              <VStack spacing={6} align="stretch">
                <Box>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or ask a question..."
                    mb={4}
                  />
                  <Button colorScheme="blue" onClick={handleAddComment}>
                    Post Comment
                  </Button>
                </Box>
                {comments.map(comment => (
                  <CommentComponent key={comment.id} comment={comment} />
                ))}
              </VStack>
            </Box>
          </VStack>
        </GridItem>

        {/* Sidebar */}
        <GridItem>
          <Box
            p={6}
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="lg"
            position="sticky"
            top={8}
          >
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontSize="2xl" fontWeight="bold" mb={2}>
                  {typeof spotsLeft === 'number' ? `${spotsLeft} spots left` : 'Open attendance'}
                </Text>
                <Button 
                  colorScheme="blue" 
                  size="lg" 
                  width="full"
                  leftIcon={<Icon as={FaUsers} />}
                >
                  Attend Event
                </Button>
              </Box>

              <Box>
                <Text fontWeight="bold" mb={2}>Attendees ({event.attendees})</Text>
                <Wrap>
                  {[...Array(Math.min(8, event.attendees))].map((_, i) => (
                    <WrapItem key={i}>
                      <Avatar
                        size="md"
                        name={`Attendee ${i + 1}`}
                        src={`https://i.pravatar.cc/150?u=${i}`}
                      />
                    </WrapItem>
                  ))}
                  {event.attendees > 8 && (
                    <WrapItem>
                      <Box
                        w="48px"
                        h="48px"
                        borderRadius="full"
                        bg="gray.100"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color={textColor}
                      >
                        +{event.attendees - 8}
                      </Box>
                    </WrapItem>
                  )}
                </Wrap>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="bold" mb={2}>Share Event</Text>
                <HStack>
                  <Button 
                    variant="outline" 
                    flex={1}
                    leftIcon={<Icon as={FaExternalLinkAlt} />}
                  >
                    Copy Link
                  </Button>
                  <Button 
                    variant="outline" 
                    flex={1}
                    leftIcon={<Icon as={FaUsers} />}
                  >
                    Share
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default EventDetails 