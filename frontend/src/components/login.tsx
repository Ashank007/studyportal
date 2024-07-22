"use client"
import React from 'react'
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from '@/app/libs/getdata';
import dotenv from "dotenv";
dotenv.config();
const Login = () => {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const response = await login(formData);
      if (response?.success) {
        toast.success(response.message);
        setTimeout(() => {
          const user = getUser(response.token);
          router.push('/home?name='+user?.name);
        }, 2000);
      }
      else{
        toast.error(response.message);
      }
    } catch (error) {
      type CustomError = {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      };
      const err = error as CustomError;
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl>
            <FormLabel color={'white'}>Email</FormLabel>
            <Input name='email' type='email' isRequired />
          </FormControl>
          <FormControl>
            <FormLabel color={'white'}>Password</FormLabel>
            <Input name='password' type='password' isRequired />
          </FormControl>
          <Button type='submit'>Login</Button>
        </VStack>
      </form>
    </>
  )
}
export const login = async (formdata: FormData) => {
  const email = formdata.get('email');
  const password = formdata.get('password');
  try{

    const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/user/login', { email: email, password: password },{
      withCredentials: true,
    });
    return response?.data;
  }catch(error){
    type CustomError = {
      message: string;
      response: {
        data: {
          message: string;
        };
      };
    };
    const err = error as CustomError;
    return err.response.data;
  }
}
export default Login