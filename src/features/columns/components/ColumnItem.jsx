import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { removeColumn, clearColumn } from "../columnsSlice";
import { PseudoBox, Flex, Box } from "@chakra-ui/core";
import ColumnHeader from "./ColumnHeader";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId }) => {
  const dispatch = useDispatch();

  const currentBoardId = useSelector(selectCurrentBoardId);
  // const handleRemoveColumn = React.useCallback(() => {
  //   dispatch(removeColumn({ columnId, boardId: currentBoardId }));
  // }, [dispatch, columnId, currentBoardId]);

  // const handleClearColumn = React.useCallback(() => {
  //   dispatch(clearColumn(columnId));
  // }, [dispatch, columnId]);

  //   <button onClick={handleRemoveColumn} style={{ marginRight: "2rem" }}>
  //   delete
  // </button>
  // <button onClick={handleClearColumn}>clear</button>
  return (
    <PseudoBox
      className="ColumnItem"
      w="17rem"
      bg="#ebecf0"
      mx={2}
      borderRadius={3}
      cursor="pointer"
      _first={{ marginLeft: 0 }}
    >
      <Box w="100%" px={2} height="100%">
        <ColumnHeader columnId={columnId} />
        <Droppable droppableId={columnId} type="task">
          {provided => (
            <Flex
              direction="column"
              minH="1px"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskList columnId={columnId} />
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
        <CreateTaskForm columnId={columnId} />
      </Box>
    </PseudoBox>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
