import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { labelsSelectors } from "../../labels/labelsSlice";
import { Stack } from "@chakra-ui/core";
import TaskLabelItem from "./TaskLabelItem";

const TaskLabelList = ({ taskId, taskLabels }) => {
  const labels = useSelector(state => labelsSelectors.selectEntities(state));

  return taskLabels.length > 0 ? (
    <Stack isInline mb={1}>
      {taskLabels.map(taskLabel => (
        <TaskLabelItem
          key={taskLabel}
          taskId={taskId}
          label={labels[taskLabel]}
        />
      ))}
    </Stack>
  ) : null;
};

TaskLabelList.propTypes = {
  taskId: PropTypes.string.isRequired,
  taskLabels: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default memo(TaskLabelList);
