import React, { Dispatch, SetStateAction } from 'react'
import { Button, useDisclosure, Input, FormControl, FormLabel } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { createSub } from '@/app/libs/edit'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type CreateSubProps={
  refresh: Dispatch<SetStateAction<boolean>>
  sem:string
}
const CreateSub:React.FC<CreateSubProps> = ({refresh,sem}) => {
  const {isOpen, onClose, onOpen}=useDisclosure();
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const subject = formdata.get('subject') as string;
    const response = await createSub(sem,subject);
    if(response){
      toast.success(subject +' '+ 'created successfully');
    }
    else{
      toast.error('Failed to create '+subject);
    }
    refresh(prev=>!prev);
    onClose();
  }
  return (
    <>
    <Button onClick={onOpen}>Add Subject</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
          <form onSubmit={handleSubmit}>
        <ModalHeader>Create Subject</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
            <FormControl>
              <FormLabel>Enter Subject Name</FormLabel>
              <Input name='subject' type='text' />
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

export default CreateSub