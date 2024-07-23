"use client"
import React, { useEffect, useState } from 'react'
import { Box, Tab, Tabs, TabList, TabPanel, TabPanels, Flex, Heading, Text,Button, VStack } from '@chakra-ui/react'
import Sem from '@/components/Sem'
import ColorToggle from '@/components/ColorToggle'
import { getsem, getSubject } from '../libs/getdata'
import { sem, subject, user } from '../libs/type'
import Logout from '@/components/Logout'
import { ToastContainer } from 'react-toastify'
import { useColorMode } from '@chakra-ui/react'
import ContactUs from '@/components/ContactUs'
import Image from 'next/image'
import { usePathname, useRouter} from 'next/navigation'
type params = {
  name?:string
}
const Page = () => {
  const pathname = usePathname();
  const [queryParams, setQueryParams] = useState<params>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(searchParams.entries());
      setQueryParams(params);
    }
  }, [pathname]);
  const { colorMode } = useColorMode();
  const router = useRouter()
  let user:user|null;
  const name = queryParams?.name;
  const [sems, setSems] = useState<sem[] | null>(null);
  const [subjects, setSubjects] = useState<subject[] | null>(null);
  const [refresh, setrefresh] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const fetchedSems = await getsem();
      setSems(fetchedSems);
    }
    fetchData();
  }, [refresh]);

  const handleOnClick = async (sem: string) => {
    const fetchedSubjects = await getSubject(sem);
    setSubjects(fetchedSubjects);
    setrefresh(prev=>!prev);
  }
  const emote = ['😊', '😄', '❤️', '😉', '😎', '😺', '😙', '😂', '😁', '😍', '🥰', '🤣', '😘', '🫡', '😜', '🤡', '🥹', '🥸', '💀', '👽', '😻', '🤖', '😸'];
  const randomEmote = emote[Math.floor(Math.random() * emote.length)];
  return (
    <Box overflow={'hidden'} minH={'100vh'}>
      <Flex  justifyContent={'space-between'} p={3} pr={[1,2,3]}>
        <Flex alignItems={'center'}>
            <Image src={'/MIET.png'} alt={'MIET'} width={60} height={60} />
        <Heading fontSize={['xl','2xl','3xl']} pl={5}>Material Portal</Heading>
        </Flex>
        <Flex alignItems={'center'} direction={['column-reverse','row']}>
         {name && <Text whiteSpace={'nowrap'} p={4} pr={['0px','30px','60px']} fontSize={['md','xl','4xl']}>Welcome, {name} {randomEmote}</Text>}
          <Flex alignItems={'center'}>
          <Logout/>
          <ColorToggle />
          <ContactUs/>
          </Flex>
        </Flex>
      </Flex>
      {
        name ?
      <Tabs variant={'line'} isFitted>
        <TabList border={'4px'} borderColor={colorMode=='dark'?'#D3D3D3':'#00FFFF'} rounded={'4px'} boxShadow={'lg'}>
          <Flex wrap={'wrap'}>
          {sems &&
            sems.map((sem, index) => (
              <Tab 
             
              onClick={() => handleOnClick(sem.semname)} 
                py={5}
                key={index}
                px={[3,4,5]}
                whiteSpace={'nowrap'}
                borderBottom={'0px'}
                _selected={{color:'purple.500', borderBottomColor:'purple.500'}}
                _hover={{backgroundColor: colorMode=='dark'? '#d3d3d3':'#00ffff'}}
                >
                {sem.semname}
              </Tab>
            ))
          }
          </Flex>
        </TabList>
        <TabPanels>
          {sems && subjects &&
            sems.map((sem, index) => (
              <TabPanel key={index} px={0}>
                <Sem sem={sem.semname} subject={subjects} />
              </TabPanel>
            ))
          }
        </TabPanels>
      </Tabs>
      :
      <Flex minW={'-webkit-fill-available'} minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <VStack>
        <Heading textAlign={'center'} fontSize={['xl','2xl','3xl']}>Please Login to Continue</Heading>
        <Button variant={'solid'} colorScheme={'blue'} onClick={() => router.push('/')}>Login</Button>
        </VStack>
      </Flex>
}
      <ToastContainer />
    </Box>
  )
}

export default Page
