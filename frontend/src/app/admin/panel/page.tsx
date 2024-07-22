import AdminHeader from '@/components/AdminHeader';
import { Box,Flex, Text } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import React from 'react'
type tokenProps={
  searchParams: Record<string, string | string[]>;
}
const page:React.FC<tokenProps> = async ({ searchParams }) => {
  let login:boolean=false;
    if(searchParams.token==process.env.LOGIN_TOKEN) {
     login = true;
    }
  return (

    <Box>
      { login ?
        <AdminHeader/>
        :
        <Flex flexDirection={'column'} h={'100vh'} justifyContent={'center'} alignItems={'center'} >
          <Heading textAlign={'center'} >Unauthorized Access</Heading>
          <Text py={'5'} color={'red'} fontWeight={'bold'} fontSize={'2xl'} >Error 404 Not Found</Text>
        </Flex>
      }
    </Box>
  )
}

export default page