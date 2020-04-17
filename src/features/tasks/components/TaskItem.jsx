import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskTitle, removeTask } from "../tasksSlice";
import { useEditable } from "../../../hooks/useEditable";
import { Flex, Text } from "@chakra-ui/core";

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
    <Flex
      className="TaskItem"
      align="center"
      justify="space-between"
      cursor="pointer"
      bg="white"
      px={2}
      py="6px"
      borderRadius={3}
      mb={2}
      shadow="sm"
    >
      {showEdit ? (
        <form onBlur={handleSubmit}>
          <textarea value={title} onChange={handleChange} />
        </form>
      ) : (
        <Text fontSize="0.875rem">{tasks[taskId].title}</Text>
      )}
      {/* <button onClick={handleRemoveTask}>&times;</button> */}
      {/* <button onClick={handleEditTask}>Edit</button> */}
    </Flex>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
