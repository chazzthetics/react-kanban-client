import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../features/boards/boardsSlice";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import { Button, useDisclosure } from "@chakra-ui/core";
import ContentHeading from "./ContentHeading";
import UserDescription from "./UserDescription";
import DescriptionForm from "./DescriptionForm";

//FIXME: and form
const DescriptionContent = () => {
  const { description } = useSelector(selectCurrentBoard);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <ContentHeading icon={FiUser} heading="Made by">
        <UserDescription />
      </ContentHeading>
      <ContentHeading
        icon={FiAlignLeft}
        heading="Description"
        action={
          description ? (
            <Button
              ml={2}
              size="sm"
              bg="gray.100"
              fontWeight="normal"
              _hover={{ backgroundColor: "gray.200" }}
              _active={{ backgroundColor: "gray.300", boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
              onClick={onOpen}
            >
              Edit
            </Button>
          ) : null
        }
      >
        <DescriptionForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </ContentHeading>
    </>
  );
};

export default DescriptionContent;
