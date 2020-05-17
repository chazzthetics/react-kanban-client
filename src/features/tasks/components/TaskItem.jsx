import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, quickEditClosed } from "../tasksSlice";
import { Box, useDisclosure } from "@chakra-ui/core";
import TaskContainer from "./TaskContainer";
import TaskLabelList from "./TaskLabelList";
import TaskTitle from "./TaskTitle";
import TaskFooter from "./TaskFooter";
import EditTaskModal from "./EditTaskModal";
import QuickEditTrigger from "./QuickEditTrigger";
import QuickEditModal from "./QuickEditModal";

const TaskItem = ({ taskId, columnId }) => {
  // Full Edit Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Quick Edit Button
  const {
    isOpen: isHover,
    onOpen: onHover,
    onClose: onLeave
  } = useDisclosure();

  // Quick Edit Modal
  const { isQuickOpen } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(quickEditClosed({ taskId }));
  }, [dispatch, taskId]);

  return (
    <>
      {isQuickOpen && (
        <QuickEditModal
          columnId={columnId}
          taskId={taskId}
          onClose={handleClose}
        />
      )}

      <TaskContainer onHover={onHover} onLeave={onLeave} onOpen={onOpen}>
        <TaskLabelList taskId={taskId} />
        <Box>
          <TaskTitle taskId={taskId} />

          {isHover && <QuickEditTrigger taskId={taskId} />}
        </Box>
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
