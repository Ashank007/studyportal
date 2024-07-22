"use client"
import { Box, TabList, Tabs, Tab, TabPanel, TabPanels, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import AnimatedText from './AnimatedText'
import UserBase from './UserBase'
import axios from 'axios'
import AllData from './AllData'
import { alldata } from '@/app/libs/type'
import { getAllUsers } from '@/app/libs/getdata'
type user={
    name: string,
    email: string
}
const AdminHeader = () => {
    const [users, setUsers] = useState<user[]>();
    const handleOnClick = async () =>{
        const user= await getAllUsers();
        setUsers(user);
    }
    const [refresh, setrefresh] = useState(false)
    const [data, setdata] = useState<alldata[]>();
    useEffect(() => {
        const fetchdata = async ()=>{
            try{
                const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+'api/v1/sem/admingetall');
                setdata(response.data.message);
            }catch(err){
                console.log(err);
            }
        }
        fetchdata();
    }, [refresh]);
  return (
    <Box py={4} bg='#191919' minH={'100vh'}>
        <Box px={2}>
        <AnimatedText text='Admin Panel'/>
        </Box>
        <Tabs orientation={`horizontal`} variant={'solid-rounded'} py={5} px={0}>
            <TabList >
                <Tab onClick={()=>setrefresh(!refresh)} px={10} rounded={0} borderRightRadius={'20px'} _selected={{backgroundColor:'teal.600', fontSize:'xl'}}>
                    Study Data
                </Tab>
                <Tab onClick={handleOnClick} px={10}  _selected={{backgroundColor:'teal.600', fontSize:'xl'}}>User Base</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                 { data &&  <AllData data={data} refresh={setrefresh}/>}
                </TabPanel>
                <TabPanel>
                  {users &&  <UserBase users={users}/>}
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>
  )
}

export default AdminHeader