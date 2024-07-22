"use client"
import React, { useEffect, useRef } from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);


const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
        },
    }),
};

const HandwritingLoading: React.FC = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
      const timeout = setTimeout(() =>{
        if(ref.current) {
          ref.current.style.display='none';
          document.body.style.overflow = 'auto';
        }
      },3000);
      return () => {
      }
    }, [])
    const text = "MIET-MATERIAL-PORTAL";
    const ref = useRef<HTMLDivElement|null>(null);
    return (
      <Box ref={ref} display="flex" justifyContent="center" alignItems="center" height="100vh">
        {text.split("").map((letter, index) => (
          <MotionText
            key={index}
            fontSize={['2xl','3xl','4xl','5xl']}
            fontWeight="bold"
            color="blue.300"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            {letter}
          </MotionText>
        ))}
      </Box>
  );
};

export default HandwritingLoading;
