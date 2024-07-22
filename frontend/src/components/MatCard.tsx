"use client";
import { Flex, Box, Text, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { material } from "@/app/libs/type";
import { motion } from "framer-motion";
type MatCardProps = {
    material: material;
    index: number;
};
type custom = {
    icon: string;
};
const CustomIcon: React.FC<custom> = ({ icon }) => (
    <Box
        as="span"
        display="inline-block"
        width="27px"
        height="27px"
        backgroundImage={icon}
        backgroundSize="cover"
    />
);
const MotionBox = motion(Box);
const MatCard: React.FC<MatCardProps> = ({ material, index }) => {
    return (
        <MotionBox
            key={material.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
        >
            <Flex  gap={"20px"} wrap={"wrap"} p={2} border={"2px"} borderColor={"#191919"} boxShadow={"lg"}rounded={"20px"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} pl={3}>
                    <Text fontSize={['xs','xl']}>{material.title}</Text>
                </Flex>
                <Link href={material.url} isExternal>
                    <IconButton
                        aria-label="icon"
                        icon={<CustomIcon icon={"/" + material.materialtype + ".png"} />}
                    />
                </Link>
            </Flex>
        </MotionBox>
    );
};

export default MatCard;
