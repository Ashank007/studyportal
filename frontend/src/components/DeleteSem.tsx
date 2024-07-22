import { deleteSem } from '@/app/libs/edit'
import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import React, { Dispatch, SetStateAction } from 'react'
type DeleteSemProps={
    refresh: Dispatch<SetStateAction<boolean>>,
    name: string,
}
const DeleteSem:React.FC<DeleteSemProps> = ({refresh,name}) => {
    const handleDelete = async () => {
        const response = await deleteSem(name);
        if(response){
            toast.success(name+' '+'deleted successfully');
        }
        else{
            toast.error('Failed to delete '+name);
        }
      refresh(prev =>!prev)
    }
  return (
    <IconButton colorScheme='red' aria-label='delete-sem' onClick={handleDelete} icon={<DeleteIcon/>}/>
  )
}

export default DeleteSem