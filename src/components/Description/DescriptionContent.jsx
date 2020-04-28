import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  updateBoardDescription
} from "../../features/boards/boardsSlice";
import { FiUser, FiAlignLeft } from "react-icons/fi";
import { Box, Button, useDisclosure } from "@chakra-ui/core";
import ContentHeading from "./ContentHeading";
import UserDescription from "./UserDescription";
import DescriptionForm from "./DescriptionForm";

const DescriptionContent = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { description, uuid } = useSelector(selectCurrentBoard);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    data => {
      dispatch(
        updateBoardDescription({
          boardId: uuid,
          description: data.description.trim()
        })
      );
      onClose();
    },
    [dispatch, uuid, onClose]
  );

  return (
    <>
      <ContentHeading icon={FiUser} heading="Made by" />
      <UserDescription />
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
      />
      <Box px={3} pt={3} pb={6}>
        <DescriptionForm
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          description={description}
        />
      </Box>
    </>
  );
};

export default DescriptionContent;
