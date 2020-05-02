import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { Box, Progress } from "@chakra-ui/core";

const ChecklistProgress = ({ taskId }) => {
  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const calculateProgressValue = useMemo(() => {
    const totalItems = checklist.items ? checklist.items.length : 0;
    const completedItems = checklist.items
      ? checklist.items.filter(item => item.completed).length
      : 0;

    return completedItems ? Math.floor((completedItems / totalItems) * 100) : 0;
  }, [checklist.items]);

  return (
    <Box py={1}>
      <Box
        fontSize="0.785rem"
        display="inline-block"
        w="5%"
        mx="auto"
        mr={4}
        textAlign="center"
      >
        {calculateProgressValue}%
      </Box>
      <Box w="91%" display="inline-block" mx="auto">
        <Progress
          size="sm"
          borderRadius={3}
          value={calculateProgressValue}
          bg="gray.200"
          color={calculateProgressValue === 100 ? "green" : "blue"}
        />
      </Box>
    </Box>
  );
};

ChecklistProgress.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default ChecklistProgress;
