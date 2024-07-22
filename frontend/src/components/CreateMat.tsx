import React, { Dispatch, SetStateAction } from 'react'
import { Button, useDisclosure, Input, FormControl, FormLabel, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { createMaterial } from '@/app/libs/edit';
import { docType } from '@/app/libs/type';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type CreateMatProps={
  refresh: Dispatch<SetStateAction<boolean>>
  sem: string,
  subject: string,
  unit: string,
}
const CreateMat:React.FC<CreateMatProps> = ({refresh,sem,subject,unit}) => {
  const {isOpen, onClose, onOpen}=useDisclosure();
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const matname = formdata.get('matname') as string;
    const matlink = formdata.get('matlink') as string;
    const mattype = formdata.get('type') as docType;
    console.log(matname, matlink, mattype);
    try {
      
      const response = await createMaterial(sem,subject,unit,matname,matlink,mattype);
      console.log(response)
      if(response){
        toast.success(matname +' '+ 'created successfully');
      }else{
        toast.error('Failed to create'+matname);
      }
    } catch (error) {
      console.log(error);
    }
    refresh(prev=>!prev)
    onClose();
  }
  return (
    <>
    <Button onClick={onOpen}>Add Material</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
          <form onSubmit={handleSubmit}>
        <ModalHeader>Create Material</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
            <FormControl>
              <FormLabel>Enter Topic Name</FormLabel>
              <Input name='matname' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Material Link</FormLabel>
              <Input name='matlink' type='text' />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Material type</FormLabel>
              <RadioGroup name='type'>
                <Stack direction='row'>
                    <Radio value='Pdf'>Pdf</Radio>
                    <Radio value='Ppt'>Ppt</Radio>
                    <Radio value='Docs'>Docs</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
       </ModalBody>
        <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
        </Button>
        <Button type='submit' colorScheme='green'>Submit</Button>
         </ModalFooter>
          </form>
        </ModalContent>
         </Modal>
         </>
  )
}

export default CreateMat