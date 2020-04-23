import React, { memo } from "react";
import PropTypes from "prop-types";
import { Flex, useDisclosure } from "@chakra-ui/core";
import TaskContainer from "./TaskContainer";
import TaskLabelList from "./TaskLabelList";
import TaskTitle from "./TaskTitle";
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

  return (
    <>
      <TaskContainer onHover={onHover} onLeave={onLeave} onOpen={onOpen}>
        <TaskLabelList taskId={taskId} />
        <Flex align="center" justify="space-between">
          <TaskTitle taskId={taskId} />
          {isHover && <QuickEditButton />}
        </Flex>
        <TaskFooter taskId={taskId} />
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
