"use client"
import React from 'react'
import { Box, Flex, Heading, FormControl, Input, Button, VStack } from '@chakra-ui/react'
import { admin } from '../libs/getdata'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
const Page = () => {
  const router = useRouter()
  const handlesubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await admin(formData);
    console.log(response)
    if(response) {
      if(response.success) {
      toast.success(response.message)
      setTimeout(() => {
        router.push('/admin/panel?token='+formData.get('token'));
      }, 2000);
      }
      else{
        toast.error(response.message)
      }
    }
    else{
      toast.error('Login failed');;
    }
  }
  return (
    <Flex w={'100vw'} h={'100vh'} direction={'column'}  alignItems={'center'}>
      <Box width={'100vw'} p={8} borderWidth={'1px'} borderRadius={'5px'} >
        <Heading as={'h3'}>Welcome to the Admin Panel</Heading>
      </Box>
      <Flex flex={1} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={'20px'} >
        <Heading as={'h2'}>Enter your secret code</Heading>
        <form onSubmit={handlesubmit}>
       <VStack>
          <FormControl>
            <Input type="password" name='token' isRequired />
          </FormControl>
          <Button type="submit">Submit</Button>
       </VStack>
        </form>
      </Flex>
      <ToastContainer/>
    </Flex>
  )
}

export default Page