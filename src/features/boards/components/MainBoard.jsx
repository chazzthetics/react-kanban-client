import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag } from "../../../hooks/useDrag";
import { Box } from "@chakra-ui/core";
import BoardHeader from "./BoardHeader";
import ColumnList from "../../columns/components/ColumnList";

const MainBoard = () => {
  const handleDragEnd = useDrag();

  return (
    <Box className="MainBoard" h="calc(100vh - 2.5rem)" overflowY="hidden">
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
