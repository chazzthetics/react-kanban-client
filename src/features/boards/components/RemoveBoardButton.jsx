import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId, removeBoard } from "../boardsSlice";
import IconButton from "../../../components/IconButton";

const RemoveBoardButton = () => {
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const handleRemoveBoard = useCallback(() => {
    dispatch(removeBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  return (
    <IconButton
      icon="delete"
      label="Delete Board"
      onClick={handleRemoveBoard}
      mr={1}
    />
  );
};

export default RemoveBoardButton;
