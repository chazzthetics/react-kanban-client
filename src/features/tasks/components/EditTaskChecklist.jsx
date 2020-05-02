import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { FiCheckSquare } from "react-icons/fi";
import { Flex, Box, Heading } from "@chakra-ui/core";
import TaskChecklist from "./TaskChecklist";
import ChecklistProgress from "./ChecklistProgress";
import RemoveChecklistButton from "./RemoveChecklistButton";
import CreateChecklistItemForm from "./CreateChecklistItemForm";

const EditTaskChecklist = ({ taskId }) => {
  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return (
    <Box pb={6}>
      <Flex align="center">
        <Box as={FiCheckSquare} mr={4} fontSize="1.4rem" />
        <Box w="100%">
          <Flex justify="space-between" align="center">
            <Heading
              as="h3"
              fontSize="1rem"
              fontWeight={600}
              lineHeight="21px"
              ml={"-2px"}
            >
              {checklist.title}
            </Heading>
            <RemoveChecklistButton taskId={taskId} />
          </Flex>
        </Box>
      </Flex>
      <ChecklistProgress taskId={taskId} />
      <TaskChecklist taskId={taskId} />
      <CreateChecklistItemForm taskId={taskId} />
    </Box>
  );
};

EditTaskChecklist.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskChecklist;
