import { Box, Flex, IconButton, Text, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { material } from '@/app/libs/type'
import MatList from './MatList'
type MaterialProps={
    unit: string,
    material: material[],
}
type custom={
    icon:string;
}
const CustomIcon:React.FC<custom> = ({icon}) => (
    <Box
      as="span"
      display="inline-block"
      width="27px"
      height="27px"
      backgroundImage={icon}
      backgroundSize="cover"
    />
  );
const Material:React.FC<MaterialProps> = ({unit,material}) => {
  return (
    <Box maxW={'fit-content'} minW={'-webkit-fill-available'} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} p={4} gap={'10px'}>
       <MatList material={material} />
    </Box>
  )
}

export default Material