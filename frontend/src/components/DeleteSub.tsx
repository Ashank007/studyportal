import { deleteSub } from '@/app/libs/edit'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { Dispatch, SetStateAction } from 'react'
type DeleteSubProps={
    refresh: Dispatch<SetStateAction<boolean>>,
    sem:string,
    name: string,
}
const DeleteSub:React.FC<DeleteSubProps> = ({refresh,sem,name}) => {
    const handleDelete = async () => {
        console.log(name, sem);
        const response = await deleteSub(sem,name);
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

export default DeleteSub