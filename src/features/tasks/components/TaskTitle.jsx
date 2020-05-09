import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { Text } from "@chakra-ui/core";

const TaskTitle = ({ taskId }) => {
  const { title } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return (
    <Text fontSize="0.875rem" w="100%" wordBreak="break-word">
      {title}
    </Text>
  );
};

TaskTitle.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default memo(TaskTitle);
