import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId, clearBoard } from "../boardsSlice";
import IconButton from "../../../components/IconButton";

const ClearBoardButton = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const handleClearBoard = useCallback(() => {
    dispatch(clearBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  return (
    <IconButton
      icon="minus"
      label="Clear Board"
      onClick={handleClearBoard}
      mr={1}
    />
  );
};

export default ClearBoardButton;
