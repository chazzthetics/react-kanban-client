import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskTitle, removeTask } from "../tasksSlice";
import { useEditable } from "../../../hooks/useEditable";

const TaskItem = ({ taskId, columnId }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask({ taskId, columnId }));
  }, [dispatch, taskId, columnId]);

  const [title, handleChange] = useEditable(tasks[taskId], "title");

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(updateTaskTitle({ taskId, newTitle: title }));
      setShowEdit(false);
    },
    [dispatch, taskId, title]
  );

  const [showEdit, setShowEdit] = React.useState(false);
  const handleEditTask = () => {
    setShowEdit(true);
  };

  return (
    <div
      className="TaskItem"
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 2px",
        marginBottom: "5px",
        border: "1px solid green",
        background: "#ddd",
        cursor: "pointer"
      }}
    >
      {showEdit ? (
        <form onBlur={handleSubmit}>
          <textarea value={title} onChange={handleChange} />
        </form>
      ) : (
        <p>{tasks[taskId].title}</p>
      )}
      <button onClick={handleRemoveTask}>&times;</button>
      <button onClick={handleEditTask}>Edit</button>
    </div>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
