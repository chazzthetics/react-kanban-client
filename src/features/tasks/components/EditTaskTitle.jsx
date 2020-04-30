import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { Box, Flex, Input } from "@chakra-ui/core";
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
    <Flex align="flex-start" pb={4}>
      <Box as={FiCreditCard} mr={4} fontSize="1.4rem" />
      <Box
        fontSize="1.1rem"
        fontWeight={600}
        lineHeight="21px"
        textAlign="left"
        w="90%"
      >
        <Box>
          {!showEditTitle ? (
            <Box
              ml={"-2px"}
              cursor="pointer"
              onClick={handleShowEditTitle}
              w="90%"
              wordBreak="break-word"
              mb={1}
            >
              {taskTitle}
            </Box>
          ) : (
            <Input
              w="100%"
              h="29px"
              px={1}
              overflowWrap="break-word"
              fontSize="1.1rem"
              ml={"-7px"}
              mt={"-4px"}
              fontWeight={600}
              borderRadius={2}
              lineHeight="19px"
              autoFocus
              value={taskTitle}
              onChange={handleChange}
              ref={container}
            />
          )}
          <Box fontSize="0.875rem" fontWeight={400} color="gray.600">
            in list{" "}
            <span style={{ textDecoration: "underline" }}>{columnTitle}</span>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

EditTaskTitle.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default EditTaskTitle;
