import { createGlobalStyle } from 'styled-components'
import { defaultTheme } from './themes/default'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => defaultTheme['green-500']};
  }

  body {
      background: ${(props) => defaultTheme['gray-900']};
      color: ${(props) => defaultTheme['gray-300']};
      font-family: 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
      font-size: 1rem;
    }
  `
