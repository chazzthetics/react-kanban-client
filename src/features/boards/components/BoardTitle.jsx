import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { selectCurrentBoard, updateBoardTitle } from "../boardsSlice";
import { isImage } from "../../../utils/getBackground";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const BoardTitle = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);

  const [title, handleChange] = useEditable(currentBoard, "title");

  const handleSubmit = useCallback(() => {
    dispatch(
      updateBoardTitle({
        boardId: currentBoard.uuid,
        newTitle: title
      })
    );
  }, [dispatch, currentBoard, title]);

  return (
    <Editable onSubmit={handleSubmit} value={title} placeholder="">
      <EditablePreview
        h="2rem"
        d="inline-flex"
        alignItems="center"
        borderRadius={2}
        cursor="pointer"
        color="white"
        as="h2"
        px={2}
        mr={2}
        ml={0}
        fontSize="1.2rem"
        fontWeight={700}
        backgroundColor={
          isImage(currentBoard.background) ? "hsla(0,0%,0%,0.3)" : "transparent"
        }
        _hover={{ backgroundColor: "hsla(0,0%,100%,0.3)" }}
      />
      <EditableInput
        as="input"
        onChange={handleChange}
        backgroundColor="white"
        fontSize="1.2rem"
        fontWeight={700}
        px={2}
        ml={0}
        mr={2}
        borderRadius={2}
        maxW={130}
      />
    </Editable>
  );
};

export default BoardTitle;

//FIXME: make edit input only as long as text
