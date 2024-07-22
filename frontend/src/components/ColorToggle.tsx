"use client"
import { Box, IconButton, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { color } from 'framer-motion'

const ColorToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box  width={'fit-content'} height={'fit-content'} textAlign={'right'} p={2} bgColor={'transparent'}>
        <IconButton aria-label='colortoggle' onClick={toggleColorMode} icon={colorMode!='light'?<MoonIcon/>:<SunIcon/>}/>
    </Box>
  )
}

export default ColorToggle