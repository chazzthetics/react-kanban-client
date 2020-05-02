import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { prioritiesSelectors } from "../prioritiesSlice";
import { tasksSelectors } from "../../tasks/tasksSlice";
import { Box, Badge } from "@chakra-ui/core";

const PriorityBadge = ({ taskId }) => {
  const priorities = useSelector(state =>
    prioritiesSelectors.selectEntities(state)
  );
  const { priority } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return priority ? (
    <Box pt={1} mr={2} display="flex" alignItems="flex-end">
      <Badge
        fontSize="0.675rem"
        bg={priorities[priority].color}
        color="white"
        fontWeight={600}
        borderRadius={3}
      >
        {priorities[priority].name}
      </Badge>
    </Box>
  ) : null;
};

PriorityBadge.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default PriorityBadge;
