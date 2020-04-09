import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoard, updateBoardTitle } from "../boardsSlice";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const BoardTitle = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);

  const [title, setTitle] = useState("");

  const handleChange = useCallback(e => {
    setTitle(e.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    dispatch(
      updateBoardTitle({
        boardId: currentBoard.uuid,
        newTitle: title
      })
    );
  }, [dispatch, currentBoard, title]);

  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title);
    }
  }, [currentBoard]);

  return (
    <Editable onSubmit={handleSubmit} value={title}>
      <EditablePreview
        d="flex"
        alignItems="center"
        h="2rem"
        borderRadius={4}
        cursor="pointer"
        _hover={{ backgroundColor: `green.400` }}
      />
      <EditableInput onChange={handleChange} />
    </Editable>
  );
};

export default BoardTitle;
