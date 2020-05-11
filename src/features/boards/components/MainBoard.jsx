import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDrag } from "../../../hooks/useDrag";
import { Box } from "@chakra-ui/core";
import BoardHeader from "./BoardHeader";
import ColumnList from "../../columns/components/ColumnList";

const MainBoard = () => {
  const handleDragEnd = useDrag();

  return (
    <Box className="MainBoard" h="calc(100vh - 2.5rem)">
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box overflowX="auto" minH="80vh">
          <ColumnList />
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default MainBoard;
