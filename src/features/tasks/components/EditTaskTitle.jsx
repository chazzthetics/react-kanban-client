import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { Box, Textarea } from "@chakra-ui/core";
import { FiCreditCard } from "react-icons/fi";

const EditTaskTitle = ({ taskId, columnId }) => {
  const task = useSelector(state => tasksSelectors.selectById(state, taskId));
  const { title: columnTitle } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const [taskTitle, handleChange] = useEditable(task, "title");

  const [showEditTitle, setShowEditTitle] = useState(false);

  const handleShowEditTitle = () => {
    setShowEditTitle(true);
  };

  const handleCloseEditTitle = () => {
    setShowEditTitle(false);
  };

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    setShowEditTitle(false);
    dispatch(updateTaskTitle({ taskId, newTitle: taskTitle }));
  }, [dispatch, taskId, taskTitle]);

  const container = useClickOutside(
    handleCloseEditTitle,
    {
      submit: {
        click: true,
        esc: true,
        enter: true
      },
      close: {
        click: true,
        esc: true,
        enter: true
      }
    },
    handleSubmit
  );

  return (
    <>
      <Box gridColumn="1 / 2">
        <Box as={FiCreditCard} mr={2} fontSize="1.4rem" />
      </Box>
      <Box
        gridColumn="2 / 4"
        gridRow="1"
        fontSize="1.1rem"
        fontWeight={600}
        lineHeight="21px"
        textAlign="left"
      >
        {!showEditTitle ? (
          <>
            <Box
              ml={"-2px"}
              cursor="pointer"
              onClick={handleShowEditTitle}
              w="90%"
              wordBreak="break-word"
            >
              {taskTitle}
            </Box>
            <Box fontSize="0.875rem" fontWeight={400} color="gray.600" py={1}>
              in list{" "}
              <span style={{ textDecoration: "underline" }}>{columnTitle}</span>
            </Box>
          </>
        ) : (
          <Textarea
            w="93%"
            px={1}
            py={0}
            overflowWrap="break-word"
            resize="none"
            fontSize="1.1rem"
            ml={"-7px"}
            mt={"-1px"}
            fontWeight={600}
            borderRadius={2}
            lineHeight={1.3}
            autoFocus
            value={taskTitle}
            onChange={handleChange}
            ref={container}
          />
        )}
      </Box>
    </>
  );
};

EditTaskTitle.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default EditTaskTitle;
