import { Box, Heading, Text } from '@chakra-ui/react'

interface TabContentProps {
  title: string
}

const TabContent = ({ title }: TabContentProps) => {
  return (
    <Box>
      <Heading size="lg" mb={4}>{title}</Heading>
      <Text>This is the content for {title}. Add your specific content here.</Text>
    </Box>
  )
}

export default TabContent 