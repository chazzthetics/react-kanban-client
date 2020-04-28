import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoard,
  selectBackgroundIsImage,
  removeBoard
} from "../boardsSlice";
import { board as boardPath } from "../../../utils/getPath";
import IconButton from "../../../components/IconButton";

const RemoveBoardButton = () => {
  const board = useSelector(selectCurrentBoard);
  const isImage = useSelector(selectBackgroundIsImage);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(board.uuid));
  }, [dispatch, board.uuid]);

  useEffect(() => {
    history.replace(boardPath(board));
  }, [history, board]);

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
