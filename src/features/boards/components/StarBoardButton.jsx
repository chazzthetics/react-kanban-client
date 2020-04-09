import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBoardStar, selectCurrentBoardId } from "../boardsSlice";
import { IconButton } from "@chakra-ui/core";
import { FiStar } from "react-icons/fi";

const StarBoardButton = () => {
  const currentBoardId = useSelector(selectCurrentBoardId);

  const dispatch = useDispatch();

  const handleStarBoard = useCallback(() => {
    dispatch(toggleBoardStar(currentBoardId));
  }, [dispatch, currentBoardId]);

  return (
    <IconButton
      aria-label="Toggle Star Board"
      icon={FiStar}
      size="sm"
      fontSize="1rem"
      onClick={handleStarBoard}
    />
  );
};

export default StarBoardButton;
