import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { selectCurrentBoard, updateBoardTitle } from "../boardsSlice";
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

  return currentBoard ? (
    <div className="BoardTitle">
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
    </div>
  ) : null;
};

export default BoardTitle;
