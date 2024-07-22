"use client"
import React, { useState, useEffect } from 'react'
import { Box, Tab,Tabs,TabPanel, TabPanels, TabList, Heading, Text, Flex } from '@chakra-ui/react'
import Material from './Material'
import { getMaterals, getUnit } from '@/app/libs/getdata'
import { material, unit } from '@/app/libs/type'
type SubjectProps={
    subject: string
    units: unit[]
}
const Subject: React.FC<SubjectProps> = ({subject, units}) => {
  const [material, setmaterial] = useState<material[]|null>(null);
  const [width, setwidth] = useState<number>(window.innerWidth);
  const handleResize = ()=>{
       setwidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [])
  const handleOnClick = async (unitname:string)=>{
    const fetchedMaterials = await getMaterals(unitname);
    setmaterial(fetchedMaterials);
  }
  return (
    <Box maxWidth={'fit-content'} display="flex" justifyContent="flex-end" minW={'-webkit-fill-available'} >
        <Tabs minW={'-webkit-fill-available'} orientation={width<766?"horizontal":"vertical"} variant="soft-rounded" >
        {width<766 && <TabList  filter={'brightness(1.5)'} borderLeft="1px solid" borderColor="transparent">
            {false && <Text align={'center'} fontWeight={'bold'} fontSize={'2xl'} marginBottom={'25px'} pr={2}>Units</Text>}
            <Flex wrap={'wrap'} direction={['row','row','column']}>
           {
             units&&
            units.map((unit, index) => (
              <Tab onClick={()=>{handleOnClick(unit.title)}} key={index} flex={'1'} color={'auto'}
              borderLeftRadius={'20px'} rounded={0} _selected={{ backgroundColor:'purple.600'}} _hover={{backgroundColor:'purple.500'}}>
                {unit.title} Unit
              </Tab>
            ))
           }
              </Flex>
          </TabList>
}
          <TabPanels w={'auto'}  >
            {
              units && material &&
                units.map((unit, index) => (
                  <TabPanel key={index} minW={'-webkit-fill-available'} >
                    <Material unit={unit.title} material={material}/>
                  </TabPanel>
                ))
            }
          </TabPanels>
          { width>766 &&
          <TabList display={['none','none','initial']}  filter={'brightness(1.5)'} borderLeft="1px solid" borderColor="transparent">
            {false && <Text align={'center'} fontWeight={'bold'} fontSize={'2xl'} marginBottom={'25px'} pr={2}>Units</Text>}
            <Flex wrap={'wrap'} direction={['row','row','column']}>
           {
             units&&
            units.map((unit, index) => (
              <Tab onClick={()=>{handleOnClick(unit.title)}} key={index} flex={'1'} color={'auto'}
              borderLeftRadius={'20px'} rounded={0} _selected={{ backgroundColor:'purple.600'}} _hover={{backgroundColor:'purple.500'}}>
                {unit.title} Unit
              </Tab>
            ))
           }
              </Flex>
          </TabList>
          }
        </Tabs>
        </Box>
        )
}

export default Subject