import React, { memo } from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { columnsSelectors } from "../../columns/columnsSlice";
import { Box } from "@chakra-ui/core";
import TaskItem from "./TaskItem";

//TODO:
function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation;
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  // add a bit of turn for fun
  const rotate = "rotate(5deg)";

  // patching the existing style
  return {
    ...style,
    transform: `${translate} ${rotate}`,
    // slowing down the drop because we can
    transition: `all ${curve} ${duration}s`
  };
}

const TaskList = ({ columnId }) => {
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  return (
    columns &&
    columns[columnId].tasks.map((task, index) => (
      <Draggable key={`drag-${task}`} draggableId={task} index={index}>
        {(provided, snapshot) => (
          <Box
            cursor="pointer"
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            isDragging={snapshot.isDragging && !snapshot.isDropAnimating}
            style={getStyle(provided.draggableProps.style, snapshot)}
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

export default memo(TaskList);
