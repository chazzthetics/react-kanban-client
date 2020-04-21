import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { useEditable } from "../../../hooks/useEditable";
import { Flex, Text, useDisclosure } from "@chakra-ui/core";
import TaskContainer from "./TaskContainer";
import TaskLabelList from "./TaskLabelList";
import TaskFooter from "./TaskFooter";
import EditTaskModal from "./EditTaskModal";
import QuickEditButton from "./QuickEditButton";

const TaskItem = ({ taskId, columnId }) => {
  const {
    isOpen: isHover,
    onOpen: onHover,
    onClose: onLeave
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [showQuickEdit, setShowQuickEdit] = useState(false);
  // const handleShowQuickEdit = e => {
  //   e.stopPropagation();
  //   setShowQuickEdit(true);
  // };

  const dispatch = useDispatch();
  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const [title, handleChange] = useEditable(tasks[taskId], "title");

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(updateTaskTitle({ taskId, newTitle: title }));
    },
    [dispatch, taskId, title]
  );

  return (
    <>
      <TaskContainer onHover={onHover} onLeave={onLeave}>
        {/* <TaskLabelList /> */}
        <Flex align="center" justify="space-between" onClick={onOpen}>
          <Text fontSize="0.875rem" w="100%">
            {tasks[taskId].title}
          </Text>
          {isHover && <QuickEditButton />}
        </Flex>
        {/* <TaskFooter /> */}
      </TaskContainer>
      <EditTaskModal
        taskId={taskId}
        columnId={columnId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default TaskItem;
