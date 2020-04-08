import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoard, updateBoardTitle } from "../boardsSlice";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";

const BoardTitle = () => {
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);

  const [title, setTitle] = useState("");

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(
      updateBoardTitle({
        boardId: currentBoard.uuid,
        newTitle: title
      })
    );
  };

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
