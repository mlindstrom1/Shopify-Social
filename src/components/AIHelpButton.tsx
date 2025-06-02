import { IconButton } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

const AIHelpButton = () => {
  return (
    <IconButton
      aria-label="AI Help"
      icon={<QuestionIcon />}
      colorScheme="blue"
      size="lg"
      isRound
      boxShadow="lg"
    />
  )
}

export default AIHelpButton 