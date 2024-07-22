"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Link, useDisclosure,Input, Flex } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { alldata } from '@/app/libs/type'
import CreateSub from './CreateSub'
import DeleteSem from './DeleteSem'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react'
  import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import CreateSem from './CreateSem'
import CreateUnit from './CreateUnit'
import CreateMat from './CreateMat'
import DeleteSub from './DeleteSub'
import DeleteUnit from './DeleteUnit'
import DeleteMat from './DeleteMat'
type DataProps={
    data:alldata[];
    refresh:Dispatch<SetStateAction<boolean>>
}
const AllData:React.FC<DataProps> = ({data,refresh}) => {
    const {isOpen, onClose, onOpen}=useDisclosure();
  return (
    <Box> 
        <CreateSem refresh={refresh} number={data.length}/>

            <Accordion  allowMultiple gap={'10px'}>
        {data && data.map((data,index)=>(

            <AccordionItem key={index} p={4} border={3} my={5} rounded={'20px'} borderColor={'black'} shadow={'outline'}>
                 <Flex alignItems={'center'}>
                <AccordionButton rounded={'20px'} _expanded={{ bg: '#434343', color: 'white' }}>
                    <Box as='span' flex='1' textAlign='left' fontSize={['2xl','3xl']}>
                       {data.semname}
                     </Box>
                 <AccordionIcon />
                    </AccordionButton>
                 <Box px={4}>
                 <DeleteSem refresh={refresh} name={data.semname}/>
                 </Box>
                </Flex>
                <AccordionPanel pb={4}>
                {data.subjects &&
                    data.subjects.map((subject,index)=>(
                        <AccordionItem  key={index} p={1}  my={2} rounded={'20px'} borderColor={'black'} shadow={'lg'}>
                        <Flex alignItems={'center'}>
                       <AccordionButton  rounded={'20px'}>
                           <Box as='span' flex='1' textAlign='left' fontSize={['xl','2xl']}>
                              {subject.name}
                            </Box>
                            <AccordionIcon />
                           </AccordionButton>
                            <DeleteSub refresh={refresh} sem={data.semname} name={subject.name} />
                       </Flex>
                       <AccordionPanel pb={4} >
                       {subject.units &&
                           subject.units.map((unit,index)=>(
                               <AccordionItem key={index} p={1}  my={2} rounded={'20px'} borderColor={'black'} shadow={'lg'}>
                                     <Flex alignItems={'center'}>
                                    <AccordionButton rounded={'20px'} >
                                    <Box as='span' flex='1' textAlign='left' fontSize={['base','xl']}>
                                     {unit.title
                                     }
                                    </Box>
                                    <AccordionIcon />
                                    </AccordionButton>
                                    <DeleteUnit refresh={refresh} sem={data.semname} subject={subject.name} name={unit.title} />
                                    </Flex>
                                <AccordionPanel>
                                    {
                                        unit.materials.map((material,index) =>{
                                            let color:string;
                                            if(material.materialtype =='Docs'){
                                                color='blue.500'
                                            }
                                            else if(material.materialtype=='Pdf'){
                                                color='red.700'
                                            }
                                            else{
                                                color='orange.500'
                                            }
                                            return (
                                            <AccordionItem key={index} p={1}  my={2} rounded={'20px'} borderColor={'black'} shadow={'lg'}>
                                                  <Flex alignItems={'center'}>
                                                <AccordionButton bg={color} rounded={'20px'} _expanded={{ color: 'white' }} >
                                                 <Box as='span' flex='1' textAlign='left' fontSize={['lg','base']}>
                                                 {material.title}
                                                </Box>
                                                <AccordionIcon />
                                                </AccordionButton>
                                                <DeleteMat refresh={refresh} sem={data.semname} subject={subject.name} unit={unit.title} material={material.title} />
                                                </Flex>
                                                <AccordionPanel>
                                                    <Link isExternal href={material.url}>{material.materialtype}</Link>
                                                </AccordionPanel>
                                            </AccordionItem>
                                        )})
                                    }
                                    <CreateMat refresh={refresh} sem={data.semname} subject={subject.name} unit={unit.title} />
                                   
                                </AccordionPanel>
                               </AccordionItem>
                           ))
                       }
                        <CreateUnit refresh={refresh} sem={data.semname} subject={subject.name}/>
                       </AccordionPanel>
                        </AccordionItem>
                    ))
                }
                <CreateSub refresh={refresh} sem={data.semname}/>
                </AccordionPanel>

                 </AccordionItem>
            ))
        }
        </Accordion>
        <ToastContainer className='w-3/5 sm:w-auto'/>
    </Box>
  )
}

export default AllData