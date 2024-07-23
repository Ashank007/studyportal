import { Box, List, ListItem, Text } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'
import React from 'react'
type user={
    name: string
}
type UserProps={
    users:user[]
}
const UserBase:React.FC<UserProps> = ({users}) => {
  return (
    <Box>
        <List>
            <ListItem>
            <Stat bg={'gray.400'} p={4} border={'2px'} borderColor={'gray.600'} rounded={'10px'} w={'fit-content'} mb={'10px'}>
                <StatLabel>Total Users:</StatLabel>
                <StatNumber>{users.length}</StatNumber>
            </Stat>
            </ListItem>
            {users.map((user, index) => (
                <ListItem key={index} display={'flex'} justifyContent={'space-around'} border={'2px'} p={3} borderColor={'gray.700'} rounded={'10px'} >
                    <Text><span className='text-gray-400 font-semibold'>Name:</span> {user.name}</Text>
                </ListItem>
            ))}
        </List>
    </Box>
  )
}

export default UserBase
