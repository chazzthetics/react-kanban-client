import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../hooks/useEditable";
import { Box, Textarea, useDisclosure } from "@chakra-ui/core";
import {
  selectCurrentBoard,
  updateBoardDescription
} from "../../features/boards/boardsSlice";
import SaveButtonGroup from "../SaveButtonGroup";

// FIXME: on blur...
const DescriptionForm = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const [description, handleChange] = useEditable(currentBoard, "description");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        updateBoardDescription({ boardId: currentBoard.uuid, description })
      );
      onClose();
    },
    [dispatch, currentBoard, description, onClose]
  );

  return (
    <Box px={3} pt={3} pb={6}>
      <form onSubmit={handleSubmit} onFocus={onOpen}>
        <Textarea
          size="sm"
          resize="none"
          px={2}
          mb={2}
          borderRadius={2}
          fontSize="0.875rem"
          color="gray.800"
          bg={description ? "#f4f5f7" : "gray.100"}
          borderColor={description ? "#f4f5f7" : "gray.100"}
          minH="6rem"
          cursor="pointer"
          autoCorrect="no"
          placeholder="“Darkness cannot drive out darkness: only light can do that.
                      Hate cannot drive out hate: only love can do that.”
                      ― Martin Luther King Jr."
          _hover={{ backgroundColor: "gray.200" }}
          _focus={{
            backgroundColor: "white",
            boxShadow: "0 0 0 1px #3182ce",
            borderColor: "#3182ce",
            minHeight: "7rem"
          }}
          _placeholder={{ color: "gray.400" }}
          _active={{
            backgroundColor: "blue.50",
            borderColor: "blue.50",
            boxShadow: "none"
          }}
          value={description || ""}
          onChange={handleChange}
        />
        {isOpen && <SaveButtonGroup onClose={onClose} />}
      </form>
    </Box>
  );
};

export default DescriptionForm;
