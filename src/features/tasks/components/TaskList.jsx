import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { columnsSelectors } from "../../columns/columnsSlice";
import TaskItem from "./TaskItem";

const TaskList = ({ columnId }) => {
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  return (
    <div className="TaskList">
      {columns[columnId].tasks.map((task, index) => (
        <Draggable key={`drag-${task}`} draggableId={task} index={index}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
            >
              <TaskItem taskId={task} columnId={columnId} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default TaskList;
