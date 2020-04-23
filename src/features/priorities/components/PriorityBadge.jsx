import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { prioritiesSelectors } from "../prioritiesSlice";
import { tasksSelectors } from "../../tasks/tasksSlice";
import { Badge } from "@chakra-ui/core";

const PriorityBadge = ({ taskId }) => {
  const priorities = useSelector(state =>
    prioritiesSelectors.selectEntities(state)
  );
  const { priority } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return (
    <Badge fontSize="0.675rem" bg={priorities[priority].color} color="white">
      {priorities[priority].name}
    </Badge>
  );
};

PriorityBadge.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default PriorityBadge;
