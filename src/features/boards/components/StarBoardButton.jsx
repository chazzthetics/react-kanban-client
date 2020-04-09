import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBoardStar, selectCurrentBoard } from "../boardsSlice";
import { IconButton } from "@chakra-ui/core";
import { FiStar } from "react-icons/fi";

const StarBoardButton = () => {
  const currentBoard = useSelector(selectCurrentBoard);

  const dispatch = useDispatch();

  const handleStarBoard = useCallback(() => {
    dispatch(toggleBoardStar(currentBoard.uuid));
  }, [dispatch, currentBoard]);

  return (
    <IconButton
      aria-label="Toggle Star Board"
      icon={FiStar}
      size="sm"
      fontSize="1rem"
      color={currentBoard?.is_starred ? `yellow.400` : "black"}
      onClick={handleStarBoard}
    />
  );
};

export default StarBoardButton;
