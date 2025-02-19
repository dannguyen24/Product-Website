import { ChakraProvider } from "@chakra-ui/react"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { system } from "@chakra-ui/react/preset";
import { BrowserRouter } from "react-router-dom";
import { ColorModeProvider } from "./components/ui/color-mode"; 


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <ColorModeProvider>
        
        <ChakraProvider value={system}>
          
          <App />
        </ChakraProvider>
      </ColorModeProvider>
    </BrowserRouter>
  </StrictMode >

)
