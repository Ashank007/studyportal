import { Box, TabList, Tab, TabPanels,TabPanel,Tabs, TabIndicator } from '@chakra-ui/react'
import React from 'react'
import Register from './register'
import Login from './login'
const Auth = () => {
  return (
    <Box bg={'#191919'} w={'fit-content'} maxH={'fit-content'} rounded={'20px'} p={6} boxShadow='outline'>
        <Tabs isFitted>
        <TabList>
          <Tab color={'white'}>Login</Tab>
          <Tab color={'white'}>Register</Tab>
        </TabList>
      <TabPanels>
        <TabPanel>
            <Login/>
        </TabPanel>
        <TabPanel>
         <Register/>
        </TabPanel>
      </TabPanels>
        </Tabs>
    </Box>
  )
}

export default Auth