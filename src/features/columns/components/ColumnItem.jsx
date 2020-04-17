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
      dir="column"
      w="17rem"
      bg="#ebecf0"
      mx={2}
      borderRadius={3}
      cursor="pointer"
      _first={{ marginLeft: 0 }}
    >
      <Box w="100%" px={2}>
        <ColumnHeader columnId={columnId} />
        <Droppable droppableId={columnId} type="task">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList columnId={columnId} />
              <div style={{ minHeight: "2px" }}>{provided.placeholder}</div>
            </div>
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
