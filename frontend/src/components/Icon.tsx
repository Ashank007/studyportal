"use client"
import { ChevronRightIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React from 'react'

const Icon = () => {
  return (
    <IconButton backgroundColor={'transparent'} aria-label='icon' icon={<ChevronRightIcon/>}/>
  )
}

export default Icon