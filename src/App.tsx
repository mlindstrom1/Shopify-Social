import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { useState } from 'react'

const App = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <ChakraProvider>
      <Router basename="/Shopify-Social">
        <Box 
          minHeight="100vh"
          height="100vh"
          width="100vw"
          bg={bgColor} 
          display="flex" 
          flexDirection="column" 
          overflow="hidden"
        >
          <Header 
            onNotificationsClick={() => setIsNotificationsOpen(!isNotificationsOpen)} 
          />
          <Box 
            display="flex" 
            flex="1" 
            overflow="hidden"
            width="100%"
          >
            <Box width="250px" flexShrink={0}>
              <Sidebar />
            </Box>
            <Box 
              flex="1" 
              overflow="hidden"
              minWidth={0}
            >
              <MainContent 
                isNotificationsOpen={isNotificationsOpen}
                onNotificationsOpen={() => setIsNotificationsOpen(!isNotificationsOpen)}
              />
            </Box>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
