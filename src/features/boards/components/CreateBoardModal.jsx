import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  PseudoBox,
  useDisclosure
} from "@chakra-ui/core";
import CreateBoardForm from "./CreateBoardForm";

const CreateBoardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <>
      <PseudoBox
        h={100}
        as="button"
        w="auto"
        borderRadius={3}
        bg="gray.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="0.875rem"
        color="gray.800"
        onClick={onOpen}
        shadow="md"
        _focus={{ outline: "none" }}
        _hover={{ backgroundColor: "gray.200" }}
        transition="background-color 100ms ease-in"
      >
        Create new board
      </PseudoBox>
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={firstFieldRef}>
        <ModalOverlay bg="rgba(0,0,0,0.8)" />
        <ModalContent borderRadius={3}>
          <ModalHeader fontSize="1rem" color="gray.700">
            Create new board
          </ModalHeader>
          <ModalCloseButton
            zIndex={6}
            color="gray.500"
            _hover={{ backgroundColor: "rgba(0,0,0,0.07)" }}
            _active={{ backgroundColor: "rgba(0,0,0,0.1)", color: "gray.800" }}
            _focus={{ outline: "none" }}
            borderRadius={50}
          />
          <ModalBody>
            <CreateBoardForm
              closeOnSubmit={onClose}
              firstFieldRef={firstFieldRef}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBoardModal;
