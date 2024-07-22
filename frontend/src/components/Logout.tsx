"use client"
import React,{ useState } from 'react'
import { IconButton, Box, Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import dotenv from "dotenv";
dotenv.config();
const CustomIcon: React.FC = () => (
    <Box
        as="span"
        display="inline-block"
        width="27px"
        height="27px"
        backgroundImage='/logut.webp'
        backgroundSize="cover"
    />
);
const Logout = () => {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>()
    const handleonClick= async () => {
        setLoading(true)
        try{
            const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/user/logout',{
                withCredentials:true
            });
            if(response.data.success){
                localStorage.removeItem('user');
                toast.success(response.data.message);
                setTimeout(() => {
                    router.push('/');
                }, 2000);
            }
            else{
                setLoading(false)
                toast.error(response.data.message);
            }
        }catch(err){
            setLoading(false)
        }
    }
  return (
    <Tooltip label='Logout'>
    <IconButton colorScheme='red' isDisabled={loading} aria-label='logout' icon={<CustomIcon/>} onClick={handleonClick}/>
    </Tooltip>
  )
}

export default Logout
