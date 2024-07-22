"use client"
import React, {useState, useEffect} from 'react'

import { List, ListItem } from '@chakra-ui/react';
import MatCard from './MatCard';
import { material } from '@/app/libs/type';
const MatList: React.FC<{ material: material[] }> = ({ material }) => {
    return (
      <List spacing={3}>
        {material && material.map((material, index) => (
          <ListItem key={index}>
         <MatCard material={material} index={index}/>
          </ListItem>
        ))}
      </List>
    );
  };

export default MatList