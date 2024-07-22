import { createSem } from '@/app/libs/edit'
import { AddIcon } from '@chakra-ui/icons'
import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type createSemprops={
    refresh: Dispatch<SetStateAction<boolean>>,
    number:number
}
const CreateSem:React.FC<createSemprops> = ({refresh,number}) => {
    const handleOnClick= async ()=>{
        console.log('sem'+(number+1).toString()+'created');
        const response = await createSem('Sem '+(number+1).toString());
        if(response) {
            toast.success('Sem '+(number+1).toString()+' '+'created');
        }
        else{
            toast.error('Failed to create Sem '+(number+1).toString());
        }
        refresh(prev=>!prev);
    }
  return (
    <Flex justifyContent={'start'}>
        <Tooltip label='Create Sem' aria-label='sem-create' rounded={'5px'}>
    <IconButton aria-label='sem-create' icon={<AddIcon/>} onClick={handleOnClick}/>
        </Tooltip>
    </Flex>
  )
}

export default CreateSem