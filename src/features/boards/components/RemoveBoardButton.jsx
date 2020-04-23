import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardId,
  selectBackgroundIsImage,
  removeBoard
} from "../boardsSlice";
import IconButton from "../../../components/IconButton";

const RemoveBoardButton = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);
  const isImage = useSelector(selectBackgroundIsImage);

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

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
