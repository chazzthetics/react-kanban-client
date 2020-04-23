import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { Flex, Box, Stack, Icon, Text, Tag, TagLabel } from "@chakra-ui/core";
import { FiAlignLeft, FiCheckSquare } from "react-icons/fi";
import PriorityBadge from "../../priorities/components/PriorityBadge";

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

  return (
    hasExtra && (
      <Stack isInline pt={1} spacing={3} alignItems="center">
        {due_date && (
          <Tag
            bg="yellow.300"
            size="sm"
            display="flex"
            alignItems="center"
            onClick={e => e.stopPropagation()}
          >
            <Icon name="time" size="0.875rem" mr={1} />
            <TagLabel fontWeight={400} fontSize="0.8rem">
              Apr 20
            </TagLabel>
          </Tag>
        )}
        {description && (
          <Box className="Description" as={FiAlignLeft} fontSize="1rem" />
        )}
        {priority && <PriorityBadge taskId={taskId} />}
        {attachment && (
          <Flex className="Attachment" align="center">
            <Icon name="attachment" size="0.875rem" mr={1} />
            <Text fontSize="0.8rem" color="gray.800">
              1
            </Text>
          </Flex>
        )}
        {checklist && (
          <Flex className="CheckList" align="center">
            <Box as={FiCheckSquare} size="0.9rem" mr={1} />
            <Text fontSize="0.8rem" color="gray.800">
              0/2
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
