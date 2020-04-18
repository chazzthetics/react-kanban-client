import React, { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  useDisclosure
} from "@chakra-ui/core";
import CreateBoardForm from "./CreateBoardForm";
import IconButton from "../../../components/IconButton";

const CreateBoardPopover = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <Popover
      placement="bottom"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      initialFocusRef={firstFieldRef}
    >
      <PopoverTrigger>
        <IconButton icon="add" label="Create New Board" />
      </PopoverTrigger>
      <PopoverContent
        borderRadius={4}
        left={0}
        px={3}
        boxShadow="md"
        _focus={{ boxShadow: "none", outline: "none" }}
        zIndex={4}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Create
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody px={0} pb={0}>
          <CreateBoardForm
            closeOnSubmit={onClose}
            firstFieldRef={firstFieldRef}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CreateBoardPopover;
