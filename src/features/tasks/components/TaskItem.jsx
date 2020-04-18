import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskTitle, removeTask } from "../tasksSlice";
import { useEditable } from "../../../hooks/useEditable";
import { FiEdit2 } from "react-icons/fi";
import { PseudoBox, Text, useDisclosure, IconButton } from "@chakra-ui/core";

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

  const [showEdit, setShowEdit] = useState(false);
  const handleEditTask = () => {
    setShowEdit(true);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <PseudoBox
      className="TaskItem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      bg="white"
      px={2}
      py="6px"
      borderRadius={3}
      mb={2}
      shadow="sm"
      _hover={{ backgroundColor: "gray.100" }}
      transition="background-color 120ms ease-in"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      {showEdit ? (
        <form onBlur={handleSubmit}>
          <textarea value={title} onChange={handleChange} />
        </form>
      ) : (
        <>
          <Text fontSize="0.875rem">{tasks[taskId].title}</Text>
          {isOpen && (
            <IconButton
              icon={FiEdit2}
              size="xs"
              maxH="21px"
              aria-label="Edit task"
              bg="transparent"
              _hover={{
                backgroundColor: "rgba(9,30,66,.08)",
                color: "gray.700"
              }}
              _focus={{
                boxShadow: "none",
                backgroundColor: "hsla(0,0%,100%,0.2)",
                color: "gray.800"
              }}
              _active={{
                backgroundColor: "rgba(9,30,66,.13)",
                color: "gray.800"
              }}
              transition="background-color 100ms ease-in"
              onClick={handleEditTask}
            />
          )}
        </>
      )}
    </PseudoBox>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
