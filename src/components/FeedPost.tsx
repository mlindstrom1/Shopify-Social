import {
  Box,
  HStack,
  Avatar,
  Text,
  Button,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { formatDistanceToNow } from 'date-fns'

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  content: string;
  likes: number;
  author: Author;
  timestamp: string;
  link?: string;
}

interface FeedPostProps {
  post: Post;
  onLike: () => void;
}

const FeedPost = ({ post, onLike }: FeedPostProps) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      p={4}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      shadow="sm"
    >
      <HStack spacing={4} align="start">
        <Avatar 
          size="md" 
          name={post.author.name} 
          src={post.author.avatar} 
        />
        <Box flex="1">
          <HStack justify="space-between" mb={1}>
            <Text fontWeight="bold">{post.author.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
            </Text>
          </HStack>
          <Text>{post.content}</Text>
          <HStack mt={4} spacing={4}>
            <Button
              size="sm"
              leftIcon={<Icon as={FaHeart} />}
              variant="ghost"
              colorScheme="red"
              onClick={onLike}
            >
              {post.likes} Likes
            </Button>
          </HStack>
        </Box>
      </HStack>
    </Box>
  )
}

export default FeedPost 