import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
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

  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  return (
    <>
      <TaskContainer onHover={onHover} onLeave={onLeave} onOpen={onOpen}>
        <TaskLabelList />
        <Flex align="center" justify="space-between">
          <Text fontSize="0.875rem" w="100%">
            {tasks[taskId].title}
          </Text>
          {isHover && <QuickEditButton />}
        </Flex>
        <TaskFooter />
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

export default memo(TaskItem);
