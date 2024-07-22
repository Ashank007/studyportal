// components/AnimatedText.tsx
"use client"
import React from 'react';
import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionText = motion(Text);
type AnProps={
  text:string;
}
const AnimatedText: React.FC<AnProps> = ({text}) => {
  return (
    <>
    <MotionText
      fontSize='4xl'
      fontWeight="bold"
      color="gray.100"
      css={{
        'WebkitTextStroke':'1px solid black'
      }
    }
      textShadow="2px 2px 0 #434343, -2px -2px 0 #434343, 2px -2px 0 #434343, -2px 2px 0 #434343"
      whileInView={{opacity: 1,y:0}}
      initial={{opacity: 0, y: 50 }}
      transition={{ duration: 1 }}
      textAlign={'center'}
      >
      {text}
    </MotionText>
        </>
  );
};

export default AnimatedText;
