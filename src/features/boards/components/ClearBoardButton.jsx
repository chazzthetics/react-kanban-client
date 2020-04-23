import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardId,
  selectBackgroundIsImage,
  clearBoard
} from "../boardsSlice";
import IconButton from "../../../components/IconButton";

const ClearBoardButton = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);
  const isImage = useSelector(selectBackgroundIsImage);

  const handleClearBoard = useCallback(() => {
    dispatch(clearBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  return (
    <IconButton
      icon="minus"
      label="Clear Board"
      onClick={handleClearBoard}
      isImage={isImage}
      mr={1}
    />
  );
};

export default ClearBoardButton;
