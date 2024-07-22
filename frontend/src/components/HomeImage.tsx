"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;
import { Box } from "@chakra-ui/react";
export function HomeImage({ url }: { url: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
const MotionBox = motion(Box);
  return (
      <motion.div
      style={{height:'300px'}}
        className="w-inherit"
        initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
      >
        <Image
          src={`/${url}`}
          alt="Image"
          layout="fill"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
  );
}