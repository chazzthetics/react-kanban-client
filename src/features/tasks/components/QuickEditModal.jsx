import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { Box, Textarea } from "@chakra-ui/core";
import SaveButton from "../../../components/SaveButton";
import QuickEditSideBar from "./QuickEditSideBar";
import TaskLabelList from "./TaskLabelList";

const QuickEditModal = ({ taskId, columnId, onClose }) => {
  const task = useSelector(state => tasksSelectors.selectById(state, taskId));

  const [taskTitle, handleChange] = useEditable(task, "title");

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      dispatch(updateTaskTitle({ taskId, newTitle: taskTitle }));
      onClose();
    },
    [dispatch, taskId, taskTitle, onClose]
  );

  const container = useClickOutside(onClose, {
    submit: {
      click: false,
      esc: false,
      enter: false
    },
    close: {
      click: true,
      esc: true,
      enter: false
    }
  });

  return (
    <>
      <Box
        bg="black"
        w="100vw"
        h="100vh"
        opacity={0.6}
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        cursor="default"
      />
      <Box
        ref={container}
        zIndex={160}
        borderRadius={3}
        position="absolute"
        pb={4}
        mb={2}
        w="16rem"
        cursor="default"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Box>
          <Box
            bg="white"
            w="100%"
            px={2}
            pb={1}
            pt="6px"
            borderTopLeftRadius={3}
            borderTopRightRadius={3}
          >
            <TaskLabelList taskId={taskId} marginBottom={0} />
          </Box>
          <form onSubmit={handleSubmit}>
            <Textarea
              size="sm"
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomLeftRadius={3}
              borderBottomRightRadius={3}
              mb={4}
              pt={0}
              px={2}
              w="100%"
              minH="5rem"
              h="100%"
              bg="white"
              fontSize="0.875rem"
              value={taskTitle}
              onChange={handleChange}
              autoFocus={true}
              border="none"
              _focus={{ border: "none", outline: "none" }}
            />

            <SaveButton px={6} />
          </form>
        </Box>
        <QuickEditSideBar taskId={taskId} columnId={columnId} />
      </Box>
    </>
  );
};

QuickEditModal.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default QuickEditModal;
