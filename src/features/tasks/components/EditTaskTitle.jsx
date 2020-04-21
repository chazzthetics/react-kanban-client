import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useEditable } from "../../../hooks/useEditable";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { tasksSelectors, updateTaskTitle } from "../tasksSlice";
import { columnsSelectors } from "../../columns/columnsSlice";
import { Flex, Text, Box, Textarea } from "@chakra-ui/core";
import { FiCreditCard } from "react-icons/fi";

//FIXME: fix textarea/title styling
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
      <Flex align="center" h="100%">
        <Box
          as={FiCreditCard}
          mr={2}
          fontSize="1.6rem"
          alignSelf="flex-start"
        />
        {!showEditTitle ? (
          <Text
            cursor="pointer"
            w="90%"
            fontSize="1.2rem"
            onClick={handleShowEditTitle}
          >
            {taskTitle}
          </Text>
        ) : (
          <Textarea
            w="90%"
            px={1}
            py={0}
            minH="0"
            resize="none"
            fontSize="1.2rem"
            fontWeight={500}
            borderRadius={2}
            autoFocus
            value={taskTitle}
            onChange={handleChange}
            ref={container}
          />
        )}
      </Flex>
      <Flex align="center">
        <Box mr={2} h="20px" w="1.75rem" />
        <Text
          display="inline"
          fontSize="0.875rem"
          fontWeight={400}
          color="gray.600"
        >
          in list {columnTitle}
        </Text>
      </Flex>
    </>
  );
};

EditTaskTitle.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default EditTaskTitle;
