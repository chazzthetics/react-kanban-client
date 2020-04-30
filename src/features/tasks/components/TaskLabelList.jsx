import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { labelsSelectors } from "../../labels/labelsSlice";
import { Stack } from "@chakra-ui/core";
import TaskLabelItem from "./TaskLabelItem";

const TaskLabelList = ({ taskId, ...rest }) => {
  const labels = useSelector(state => labelsSelectors.selectEntities(state));
  const { labels: taskLabels } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return taskLabels && taskLabels.length > 0 ? (
    <Stack isInline spacing={1} mb={1}>
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
  taskId: PropTypes.string.isRequired
};

export default memo(TaskLabelList);
