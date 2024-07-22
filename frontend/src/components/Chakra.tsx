"use client"
import { ChakraProvider, extendTheme, ColorModeScript, CSSReset } from '@chakra-ui/react'
import React, { AwaitedReactNode, ReactElement, ReactNode } from 'react'
const config={
    initialColorMode: "light",
    useSystemColorMode: false,
  }
  const theme = extendTheme({config});
  type Props={
    children:ReactNode;
  }
const Chakra: React.FC<Props> = ({children}) => {
  return (
    <ChakraProvider theme={theme}>
        <CSSReset/>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    {children}
    </ChakraProvider>
  )
}

export default Chakra