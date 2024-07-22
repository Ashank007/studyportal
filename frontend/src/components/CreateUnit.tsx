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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { createUnit } from '@/app/libs/edit'
type CreateUnitProps={
  refresh: Dispatch<SetStateAction<boolean>>,
  sem:string,
  subject:string
}
const CreateUnit:React.FC<CreateUnitProps> = ({refresh,sem,subject}) => {
  const {isOpen, onClose, onOpen}=useDisclosure();
  const handleSubmit= async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const unit = formdata.get('unit') as string;
    const response = await createUnit(sem,subject,unit);
    if (response) {
      toast.success(unit +' '+'created successfully');
    }else{
      toast.error('Failed to create '+unit);
    }
    refresh(prev=>!prev);
    onClose();
  }
  return (
    <>
    <Button onClick={onOpen}>Add Unit</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
       <ModalOverlay />
       <ModalContent>
          <form onSubmit={handleSubmit}>
        <ModalHeader>Create Unit</ModalHeader>
         <ModalCloseButton />
         <ModalBody>
            <FormControl>
              <FormLabel>Enter Unit Name</FormLabel>
              <Input name='unit' type='text' />
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

export default CreateUnit