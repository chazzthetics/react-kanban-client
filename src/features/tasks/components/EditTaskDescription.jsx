import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, updateTaskDescription } from "../tasksSlice";
import { FiAlignLeft } from "react-icons/fi";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/core";
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
    <Flex align="flex-start" pb={2}>
      <Box as={FiAlignLeft} mr={4} fontSize="1.4rem" />
      <Box w="100%">
        <Heading
          as="h3"
          fontSize="1rem"
          fontWeight={600}
          lineHeight="21px"
          ml={"-2px"}
          mb={3}
        >
          Description
        </Heading>
        <Box w="100%">
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
    </Flex>
  );
};

EditTaskDescription.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskDescription;
