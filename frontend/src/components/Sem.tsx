"use client"
import { Box, Tab,Tabs,TabPanel, TabPanels, TabList, Text, Center, Flex } from '@chakra-ui/react'
import Subject from './Subject';
import React, {useEffect,useState} from 'react'
import { subject } from '@/app/libs/type';
import { getUnit } from '@/app/libs/getdata';
import { unit } from '@/app/libs/type';
type Semprops ={
    sem:string;
    subject:subject[]|null|undefined
}
const Sem: React.FC<Semprops> = ({sem,subject}) => {
   const [unit, setunit] = useState<unit[]|null>(null);
   const [width, setwidth] = useState<number>(window.innerWidth);
   const handleResize = ()=>{
        setwidth(window.innerWidth);
   }
   useEffect(() => {
       window.addEventListener('resize', handleResize);
       return () => window.removeEventListener('resize', handleResize);
   }, [])
   let unitdata:unit[]|null=null;
   const handleOnClick = async (subject:string) => {
       unitdata = await getUnit(subject)
      setunit(unitdata);
   }
  return (
    <Box w={'100vw'} >
         <Tabs display={'flex'} flexDirection={['column','column','row']} isFitted variant={'soft-rounded'} orientation={width<640?'horizontal':'vertical'} >
        <TabList  borderBottom={['2px','2px','none']} borderColor={'gray.400'}   css={
           `-ms-overflow-style: none;
           scrollbar-width: none; 
           &::-webkit-scrollbar {
             display: none;
           }`
        }>
          <Flex flexWrap={'wrap'} flexDirection={['row','row','column']} >
        {
          subject&&
          subject.map((subject, index) => (
            <Tab onClick={()=>handleOnClick(subject.name)}  borderRightRadius={'20px'} rounded={0} _selected={{borderLeftRadius:'sm', backgroundColor:'purple.600'}} _hover={{backgroundColor:'purple.400'}} px={10} key={index} color={'auto'}>{subject.name}</Tab>
          ))
        }
        </Flex>
        </TabList>
      <TabPanels p={0} pt={2}>
      {
          subject && unit &&
          subject.map((subject, index) => {
            return(
            <TabPanel p={0} key={index}>
              <Subject subject={subject.name} units={unit} />
            </TabPanel>)
          })
        }
      </TabPanels>
        </Tabs>
    </Box>
  )
}

export default Sem