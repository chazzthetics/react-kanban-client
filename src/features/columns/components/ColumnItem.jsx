import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoardId } from "../../boards/boardsSlice";
import { removeColumn, clearColumn } from "../columnsSlice";
import ColumnTitle from "./ColumnTitle";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import TaskList from "../../tasks/components/TaskList";

const ColumnItem = ({ columnId }) => {
  const dispatch = useDispatch();

  const currentBoardId = useSelector(selectCurrentBoardId);
  const handleRemoveColumn = React.useCallback(() => {
    dispatch(removeColumn({ columnId, boardId: currentBoardId }));
  }, [dispatch, columnId, currentBoardId]);

  const handleClearColumn = React.useCallback(() => {
    dispatch(clearColumn(columnId));
  }, [dispatch, columnId]);

  return (
    <div className="ColumnItem">
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
        <Droppable droppableId={columnId} type="task">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <TaskList columnId={columnId} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CreateTaskForm columnId={columnId} />
      </div>
    </div>
  );
};

ColumnItem.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default ColumnItem;
