import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { columnsSelectors } from "../../columns/columnsSlice";
import TaskItem from "./TaskItem";

const TaskList = ({ columnId }) => {
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  return (
    <div className="TaskList">
      {columns[columnId].tasks.map(task => (
        <TaskItem key={task} taskId={task} columnId={columnId} />
      ))}
    </div>
  );
};

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default TaskList;
