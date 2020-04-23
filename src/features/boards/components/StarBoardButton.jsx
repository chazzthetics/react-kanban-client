import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleBoardStar,
  selectCurrentBoard,
  selectBackgroundIsImage
} from "../boardsSlice";
import { FiStar } from "react-icons/fi";
import IconButton from "../../../components/IconButton";

const StarBoardButton = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const isImage = useSelector(selectBackgroundIsImage);
  const dispatch = useDispatch();

  const handleStarBoard = useCallback(() => {
    dispatch(toggleBoardStar(currentBoard.uuid));
  }, [dispatch, currentBoard]);

  return (
    <IconButton
      icon={FiStar}
      label="Toggle Star Board"
      color={currentBoard.is_starred ? `yellow.400` : "white"}
      isImage={isImage}
      onClick={handleStarBoard}
    />
  );
};

export default StarBoardButton;
