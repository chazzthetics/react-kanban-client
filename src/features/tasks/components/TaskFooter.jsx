import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { Flex, Box, Stack, Icon, Text } from "@chakra-ui/core";
import { FiAlignLeft } from "react-icons/fi";
import PriorityBadge from "../../priorities/components/PriorityBadge";
import DueDateTag from "./DueDateTag";
import ChecklistTag from "./ChecklistTag";

//FIXME:
const TaskFooter = ({ taskId }) => {
  const { description, attachment } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return (
    <Stack isInline alignItems="flex-end">
      <DueDateTag taskId={taskId} />
      {description && (
        <Box pt={1} className="Description">
          <Box as={FiAlignLeft} fontSize="1rem" />
        </Box>
      )}
      <PriorityBadge taskId={taskId} />
      {attachment && (
        <Flex className="Attachment" align="center">
          <Icon name="attachment" size="0.875rem" mr={1} />
          <Text fontSize="0.8rem" color="gray.800">
            1
          </Text>
        </Flex>
      )}
      <ChecklistTag taskId={taskId} />
    </Stack>
  );
};

TaskFooter.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(TaskFooter);
