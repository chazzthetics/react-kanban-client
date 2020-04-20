import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentBoardId,
  updateBoardBackground
} from "../../features/boards/boardsSlice";
import { backgroundColors } from "../../utils/backgroundColors";
import { Flex } from "@chakra-ui/core";
import BackgroundBox from "./BackgroundBox";

const ColorContent = () => {
  const boardId = useSelector(selectCurrentBoardId);
  const dispatch = useDispatch();

  const handleUpdateBackground = useCallback(
    background => {
      dispatch(updateBoardBackground({ boardId, background }));
    },
    [dispatch, boardId]
  );

  return (
    <Flex wrap="wrap">
      {backgroundColors.map(color => (
        <BackgroundBox
          key={color}
          background={`${color}.600`}
          onClick={() => handleUpdateBackground(color)}
        />
      ))}
    </Flex>
  );
};

export default ColorContent;
