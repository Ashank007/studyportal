import { Card, CardBody, CardHeader, Flex, Heading, Link, Text, Tooltip, Box, IconButton, Button } from '@chakra-ui/react'
import React from 'react'
type Custom = {
    icon:string,
}
const Customicon:React.FC<Custom> = ({icon})=>{
    return(
        <Box
        as="span"
        display="inline-block"
        width="27px"
        height="27px"
        backgroundImage={'/'+icon}
        backgroundSize="cover"
    />
    )
}
const Footer = () => {
  return (
    <>
    <Flex flexDirection={['column','row']} maxWidth={'99vw'} minW={'-webkit-fill-available'} width={'99vw'} p={4} bg={'#191919'} justifyContent={'space-around'}>
       <Card color={'white'} bg={'#191919'}>
        <CardHeader>
        <Heading textAlign={'center'} fontSize={['xl','2xl','3xl']} color="#C0C0C0">Created by</Heading>
        </CardHeader>
        <CardBody  alignItems={'center'}>
        <Tooltip label='2023a6r002.mietjammu.in'>
        <Text textAlign={'center'} whiteSpace={'nowrap'}>Sraban Mondal-Frontend</Text>
        </Tooltip>
        <Tooltip label='2023a6r042.mietjammu.in'>
        <Text textAlign={'center'} whiteSpace={'nowrap'}>Ashank Gupta-Backend</Text>
        </Tooltip>
        </CardBody>
       </Card>
       <Card color={'white'} bg={'#191919'}>
        <CardHeader p={4} pb={0}>
         <Heading textAlign={'center'} fontSize={['xl','2xl','3xl']} color="white">Technologies Used</Heading>
        </CardHeader>
        <CardBody display={'flex'} flexDirection={'column'}  alignItems={'center'} >
        <Text>NextJs</Text>
        <Text>Express</Text>
        <Text>Chakra UI</Text>
        <Text>MongoDB</Text>
        </CardBody>
       </Card>
       <Card  bg={'#191919'}>
         <Heading textAlign={'center'} as="h2" color="white">Links</Heading>
        <CardBody color={'white'} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'4px'}>
        <Link href="https://www.linkedin.com/in/sraban-mondal-263856297/">
       <Button colorScheme='teal' variant={'link'} rightIcon={<Customicon icon='linkedin.webp'/>}>Sraban</Button>
        </Link>
        <Link href="https://www.linkedin.com/in/ashank-gupta-7b8619291/">
        <Button colorScheme='teal' variant={'link'} rightIcon={<Customicon icon='linkedin.webp'/>}>Ashank</Button>
        </Link>
        <Link href="https://github.com/Ashank007/mietstudyportal">
        <IconButton aria-label='github' icon={<Customicon icon='github.png'/>}/>
        </Link>
        </CardBody>
       </Card>
    </Flex>
    </>  )
}

export default Footer
