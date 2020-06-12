import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { labelsSelectors } from "../../labels/labelsSlice";
import { Stack } from "@chakra-ui/core";
import TaskLabelItem from "./TaskLabelItem";

const TaskLabelList = ({ taskId, marginBottom = 1, ...rest }) => {
  const labels = useSelector(state => labelsSelectors.selectEntities(state));
  const { labels: taskLabels } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return taskLabels && taskLabels.length > 0 ? (
    <Stack isInline spacing={1} mb={marginBottom}>
      {taskLabels.map(label => (
        <TaskLabelItem
          key={label}
          taskId={taskId}
          label={labels[label]}
          {...rest}
        />
      ))}
    </Stack>
  ) : null;
};

TaskLabelList.propTypes = {
  taskId: PropTypes.string.isRequired,
  marginBottom: PropTypes.number
};

export default memo(TaskLabelList);
