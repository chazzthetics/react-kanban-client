import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDrag } from "../../../hooks/useDrag";
import { selectCurrentBoard } from "../boardsSlice";
import { Box } from "@chakra-ui/core";
import BoardHeader from "./BoardHeader";
import ColumnList from "../../columns/components/ColumnList";

const MainBoard = () => {
  const currentBoard = useSelector(selectCurrentBoard);

  const handleDragEnd = useDrag(currentBoard);

  return (
    <Box
      className="MainBoard"
      h="calc(100vh - 2.5rem)"
      bg={currentBoard ? `${currentBoard.background}.600` : "blue.600"}
      overflowY="hidden"
    >
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
