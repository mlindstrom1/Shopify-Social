import { Button, Box } from '@chakra-ui/react'

const HelpButton = () => {
  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex={1000}
    >
      <Button
        bgGradient="linear(to-r, blue.400, blue.500)"
        _hover={{
          bgGradient: "linear(to-r, blue.500, blue.600)"
        }}
        color="white"
        size="lg"
        border="none"
        _focus={{ boxShadow: 'none' }}
        borderRadius="lg"
        onClick={() => {}}
      >
        Have a question?
      </Button>
    </Box>
  )
}

export default HelpButton 