import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { columnsSelectors } from "../../columns/columnsSlice";
import { Box } from "@chakra-ui/core";
import TaskItem from "./TaskItem";

const TaskList = ({ columnId }) => {
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  return (
    columns &&
    columns[columnId].tasks.map((task, index) => (
      <Draggable key={`drag-${task}`} draggableId={task} index={index}>
        {provided => (
          <Box
            cursor="pointer"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <TaskItem taskId={task} columnId={columnId} />
          </Box>
        )}
      </Draggable>
    ))
  );
};

TaskList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default TaskList;
