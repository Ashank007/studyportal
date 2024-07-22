import { IconButton, useDisclosure, Button, Tooltip, Text } from '@chakra-ui/react'
import React from 'react'
import { Modal, ModalBody,ModalCloseButton, ModalFooter, ModalContent, ModalOverlay, ModalHeader } from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons';
import CopyableTextBox from './CopyText';
const ContactUs = () => {
    const {isOpen,onOpen,onClose}=useDisclosure();
  return (
    <>
    <Tooltip label='Contact Us'>
    <IconButton onClick={onOpen} aria-label='contactUs' icon={<PhoneIcon/>}/>
    </Tooltip>
    <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay/>
            <ModalContent >
                <ModalHeader>Contact Us</ModalHeader>
                <ModalCloseButton />
                <ModalBody display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                    <Text>Contact at us at:</Text>
                    <CopyableTextBox/>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} variant='ghost'>Close</Button>
                </ModalFooter>
            </ModalContent>
    </Modal>
    </>
  )
}

export default ContactUs
