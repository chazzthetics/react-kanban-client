import React, { useCallback } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../../boards/boardsSlice";
import { columnsSelectors } from "../columnsSlice";
import { Flex, Box } from "@chakra-ui/core";
import ColumnItem from "./ColumnItem";
import CreateColumnForm from "./CreateColumnForm";

const ColumnList = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  const isDragDisabled = useCallback(
    id => {
      return columns[id].is_locked || columns[id].is_open;
    },
    [columns]
  );

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <Flex
          className="ColumnList"
          px={4}
          ref={provided.innerRef}
          {...provided.droppableProps}
          overflowX="auto"
          minH="300px"
        >
          {currentBoard &&
            currentBoard.columns.map((column, index) => (
              <Draggable
                key={`drag-${column}`}
                index={index}
                draggableId={`drag-${column}`}
                isDragDisabled={isDragDisabled(column)}
              >
                {provided => (
                  <Box
                    h="100%"
                    cursor="pointer"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ColumnItem columnId={column} />
                  </Box>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
          <CreateColumnForm />
        </Flex>
      )}
    </Droppable>
  );
};

export default ColumnList;
