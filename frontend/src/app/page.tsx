import { VStack, Flex, Heading, Box } from "@chakra-ui/react";
import Auth from "@/components/auth";
import AnimatedText from "@/components/AnimatedText";
import HandwritingLoading from "@/components/Loading";
import { HomeImage } from "@/components/HomeImage";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <Box >
    <HandwritingLoading/>
    <Flex flexDirection={'column'} >
    <Flex direction={{lg:'row', base:'column'}} minH={'100vh'}  maxW='100vw' bgSize={"cover"} bgRepeat={'no-repeat'} justifyContent={"right"} alignItems={'center'} p={10}
      backgroundPosition="left" backgroundImage="url('https://img.freepik.com/free-photo/blue-surface-with-study-tools_23-2147864592.jpg?w=1060&t=st=1721140280~exp=1721140880~hmac=1d3020c0c8dca264347fab00b306780b985e26a25d437c479537f38810c25aa1')">
        <VStack spacing={5}>
          <AnimatedText text='Welcome to MIET Material Portal'/>
          <Flex direction={['column','column','column','row']} w={'fit-content'} gap={'20px'} justifyContent={'center'} alignItems={'center'}>
          <Box boxShadow='dark-lg' border={'2px'} borderColor={'black'} rounded={'6px'} position={'relative'} width={['90vw','90vw','500px']} height={'300px'}>
            <HomeImage url='homeimg.avif'/>
            </Box>
            <Auth/>
          </Flex>
        </VStack>
        <ToastContainer/>
    </Flex>
    <Footer/>
    </Flex>
    </Box>
  );
}
