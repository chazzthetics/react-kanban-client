import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  selectBackgroundIsImage,
  removeBoard
} from "../boardsSlice";
import IconButton from "../../../components/IconButton";

const RemoveBoardButton = () => {
  const board = useSelector(selectCurrentBoard);
  const isImage = useSelector(selectBackgroundIsImage);

  const dispatch = useDispatch();

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(board.uuid));
  }, [dispatch, board]);

  return (
    <IconButton
      icon="delete"
      label="Delete Board"
      onClick={handleRemoveBoard}
      isImage={isImage}
      mr={1}
    />
  );
};

export default RemoveBoardButton;
