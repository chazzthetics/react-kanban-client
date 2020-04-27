import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleLabel } from "../tasksSlice";
import { PseudoBox } from "@chakra-ui/core";

const TaskLabelItem = ({ taskId, label, ...rest }) => {
  const dispatch = useDispatch();

  const handleToggleLabel = useCallback(
    e => {
      e.stopPropagation();
      dispatch(toggleLabel({ taskId, labelId: label.id }));
    },
    [dispatch, taskId, label]
  );

  return (
    <PseudoBox
      bg={`${label.color}.400`}
      h="8px"
      w="2.5rem"
      borderRadius={4}
      _hover={{ backgroundColor: `${label.color}.500` }}
      transition="background-color 100ms ease-in"
      onClick={handleToggleLabel}
      {...rest}
    />
  );
};

TaskLabelItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired
};

export default React.memo(TaskLabelItem);
