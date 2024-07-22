import { deleteSub, deleteUnit } from '@/app/libs/edit'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { Dispatch, SetStateAction } from 'react'
type DeleteUnitProps={
    refresh: Dispatch<SetStateAction<boolean>>,
    sem:string,
    subject: string,
    name: string,
}
const DeleteUnit:React.FC<DeleteUnitProps> = ({refresh,sem,subject,name}) => {
    const handleDelete = async () => {
        console.log(name, sem);
        const response = await deleteUnit(sem,subject,name);
        if(response){
            toast.success(name+' '+'deleted successfully');
        }
        else{
            toast.error('Failed to delete '+name);
        }
      refresh(prev =>!prev)
    }
  return (
    <Box px={4}>
    <IconButton colorScheme='red' aria-label='delete-sem' onClick={handleDelete} icon={<DeleteIcon/>}/>
    </Box>
  )
}

export default DeleteUnit