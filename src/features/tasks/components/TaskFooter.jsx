import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { Flex, Box, Stack, Icon, Text } from "@chakra-ui/core";
import { FiAlignLeft, FiCheckSquare } from "react-icons/fi";
import PriorityBadge from "../../priorities/components/PriorityBadge";
import DueDateTag from "./DueDateTag";

//FIXME:
const TaskFooter = ({ taskId }) => {
  const {
    due_date,
    description,
    attachment,
    checklist,
    priority
  } = useSelector(state => tasksSelectors.selectById(state, taskId));

  const hasExtra = useMemo(
    () => due_date || description || attachment || checklist || priority,
    [due_date, description, attachment, checklist, priority]
  );

  const checklistItemsCount = checklist && checklist.items.length;
  const isDoneCount =
    checklist && checklist.items.filter(item => item.completed).length;

  return (
    hasExtra && (
      <Stack isInline pt={1} alignItems="flex-end">
        <DueDateTag taskId={taskId} />
        {description && (
          <Box className="Description" as={FiAlignLeft} fontSize="1rem" />
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
        {checklist && checklistItemsCount > 0 && (
          <Flex className="CheckList" align="center">
            <Box as={FiCheckSquare} size="0.9rem" mr={1} />
            <Text fontSize="0.8rem" color="gray.800">
              {isDoneCount}/{checklistItemsCount}
            </Text>
          </Flex>
        )}
      </Stack>
    )
  );
};

TaskFooter.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(TaskFooter);
