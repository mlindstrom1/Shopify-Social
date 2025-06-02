import { Heading } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

const ActivityFeedHeader = () => {
  const location = useLocation()
  const currentPath = location.pathname.split('/').pop() || 'all'

  const getHeaderText = () => {
    switch (currentPath) {
      case 'groups':
        return 'Group Activity'
      case 'events':
        return 'Event Activity'
      default:
        return 'All Activity'
    }
  }

  return (
    <Heading size="lg" mb={6} textAlign="left">
      {getHeaderText()}
    </Heading>
  )
}

export default ActivityFeedHeader 