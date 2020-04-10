import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, removeTask } from "../tasksSlice";

const TaskItem = ({ taskId, columnId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask({ taskId, columnId }));
  }, [dispatch, taskId, columnId]);

  return (
    <div
      className="TaskItem"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <p>{tasks[taskId]["content"]}</p>
      <button onClick={handleRemoveTask}>&times;</button>
    </div>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
