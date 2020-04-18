import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../hooks/useEditable";
import { Box, PseudoBox, Textarea } from "@chakra-ui/core";
import {
  selectCurrentBoard,
  updateBoardDescription
} from "../../features/boards/boardsSlice";
import SaveButtonGroup from "../SaveButtonGroup";
import { useFocus } from "../../hooks/useFocus";

const quote =
  "Yesterday is not ours to recover, but tomorrow is ours to win or lose.";
// FIXME: on blur...  mn b
const DescriptionForm = ({ isOpen, onOpen, onClose }) => {
  const currentBoard = useSelector(selectCurrentBoard);

  const [description, handleChange] = useEditable(currentBoard, "description");

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(
        updateBoardDescription({
          boardId: currentBoard.uuid,
          description: description.trim()
        })
      );
      onClose();
    },
    [dispatch, currentBoard, description, onClose]
  );

  const focusRef = useFocus();

  return (
    <Box px={3} pt={3} pb={6}>
      {!isOpen ? (
        <PseudoBox
          px={2}
          py={2}
          mb={2}
          borderRadius={2}
          fontSize="0.875rem"
          color="gray.800"
          bg={"rgba(9,30,66,.04)"}
          minH="5.5rem"
          cursor="pointer"
          _hover={{
            backgroundColor: "hsla(0,0%,0%,0.075)"
          }}
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
          onClick={onOpen}
        >
          {description}
        </PseudoBox>
      ) : (
        <form onSubmit={handleSubmit}>
          <Textarea
            size="sm"
            resize="none"
            px={2}
            mb={2}
            borderRadius={2}
            fontSize="0.875rem"
            color="gray.800"
            bg={!currentBoard.description ? "rgba(9,30,66,.04)" : "#f4f5f7"}
            borderColor={
              !currentBoard.description ? "rgba(9,30,66,.04)" : "#f4f5f7"
            }
            minH={currentBoard.description ? "6rem" : "5.5rem"}
            cursor="pointer"
            autoCorrect="no"
            placeholder={currentBoard.description ? "" : quote}
            _hover={{
              backgroundColor: "hsla(0,0%,0%,0.075)"
            }}
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
            ref={focusRef}
          />
          <SaveButtonGroup onClose={onClose} />
        </form>
      )}
    </Box>
  );
};

export default DescriptionForm;
