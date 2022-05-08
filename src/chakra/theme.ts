import { extendTheme } from "@chakra-ui/react"
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';

export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff3c00",
    },
  },
  font: {
    body: 'Open Sans, sams-serif'
  },
  styles: {
    global: () => ({
      body: {
        bg: 'gray.200'
      }
    })
  },
  components: {
  }
})