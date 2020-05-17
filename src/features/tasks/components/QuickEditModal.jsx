import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { Box, Textarea } from "@chakra-ui/core";
import SaveButton from "../../../components/SaveButton";
import QuickEditSideBar from "./QuickEditSideBar";

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
        onClick={e => {
          e.stopPropagation();
        }}
        zIndex={160}
        borderRadius={3}
        position="absolute"
        pb={4}
        mb={2}
        w="16rem"
        cursor="default"
        ref={container}
      >
        <form onSubmit={handleSubmit}>
          <Textarea
            size="sm"
            borderRadius={3}
            autoFocus={true}
            px={2}
            mb={4}
            w="100%"
            value={taskTitle}
            onChange={handleChange}
            _focus={{ border: "none", outline: "none" }}
          />
          <SaveButton px={6} />
        </form>
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
