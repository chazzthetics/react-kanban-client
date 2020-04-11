import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { removeColumn, clearColumn } from "../columnsSlice";
import ColumnTitle from "./ColumnTitle";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId, index }) => {
  const dispatch = useDispatch();

  const currentBoardId = useSelector(selectCurrentBoardId);
  const handleRemoveColumn = React.useCallback(() => {
    dispatch(removeColumn({ columnId, boardId: currentBoardId }));
  }, [dispatch, columnId, currentBoardId]);

  const handleClearColumn = React.useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <Draggable
      index={index}
      draggableId={columnId}
      // isDragDisabled={columnId === "q3GVY7quJ"}
    >
      {provided => (
        <div
          className="ColumnItem"
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <button onClick={handleRemoveColumn} style={{ marginRight: "2rem" }}>
            delete
          </button>
          <button onClick={handleClearColumn}>clear</button>
          <div
            key={columnId}
            style={{
              margin: "0 20px",
              border: "1px solid black",
              height: "14rem"
            }}
          >
            <ColumnTitle columnId={columnId} />
            <TaskList columnId={columnId} />
            <CreateTaskForm columnId={columnId} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};

export default ColumnItem;
