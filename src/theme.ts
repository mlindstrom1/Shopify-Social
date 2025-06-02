import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            borderRadius: '6px',
            fontWeight: 'semibold',
            _selected: {
              color: 'blue.600',
              bg: 'blue.50',
            },
            _hover: {
              bg: 'gray.100',
            },
          },
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'blue',
      },
    },
  },
})

export default theme 