import {deleteMaterial } from '@/app/libs/edit'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { Dispatch, SetStateAction } from 'react'
type DeleteMatProps={
    refresh: Dispatch<SetStateAction<boolean>>,
    sem:string,
    subject:string,
    unit:string,
    material:string,
}
const DeleteMat:React.FC<DeleteMatProps> = ({refresh,sem,subject,unit,material}) => {
    const handleDelete = async () => {
        console.log(name, sem);
        const response = await deleteMaterial(sem,subject,unit,material);
        if(response){
            toast.success(material+' '+'deleted successfully');
        }
        else{
            toast.error('Failed to delete '+material);
        }
      refresh(prev =>!prev)
    }
  return (
    <Box px={4}>
    <IconButton colorScheme='red' aria-label='delete-sem' onClick={handleDelete} icon={<DeleteIcon/>}/>
    </Box>
  )
}

export default DeleteMat