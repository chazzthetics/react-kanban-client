import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskDescription } from "../tasksSlice";
import { FiAlignLeft } from "react-icons/fi";
import { Box, useDisclosure } from "@chakra-ui/core";
import DescriptionForm from "../../../components/Description/DescriptionForm";

const EditTaskDescription = ({ taskId }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { uuid, description } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    data => {
      dispatch(
        updateTaskDescription({
          taskId: uuid,
          description: data.description.trim()
        })
      );
      onClose();
    },
    [dispatch, uuid, onClose]
  );

  return (
    <>
      <Box gridColumn="1 / 2">
        <Box as={FiAlignLeft} mr={2} fontSize="1.4rem" />
      </Box>
      <Box
        gridColumn="2 / 3"
        gridRow="2"
        fontSize="1rem"
        fontWeight={600}
        lineHeight="21px"
        textAlign="left"
      >
        <Box ml={"-2px"} mb={4}>
          Description
        </Box>
        <Box gridColumn="2 / 3">
          <DescriptionForm
            ml={-1}
            placeholder="Add a more detailed description..."
            description={description}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </>
  );
};

EditTaskDescription.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskDescription;
