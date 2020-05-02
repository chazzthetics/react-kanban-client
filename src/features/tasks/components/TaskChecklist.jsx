import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { List } from "@chakra-ui/core";
import ChecklistItem from "./ChecklistItem";

const TaskChecklist = ({ taskId }) => {
  const { checklist } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  return (
    <List className="ChecklistListGroup">
      {checklist.items &&
        checklist.items.map(item => (
          <ChecklistItem key={item.uuid} item={item} taskId={taskId} />
        ))}
    </List>
  );
};

TaskChecklist.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskChecklist;
