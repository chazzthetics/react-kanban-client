import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  togglePriority,
  removePriority,
  tasksSelectors
} from "../../tasks/tasksSlice";
import { prioritiesSelectors } from "../prioritiesSlice";
import { FiAlertCircle } from "react-icons/fi";
import { Text } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import ColoredButton from "../../../components/ColoredButton";

const PriorityPopover = ({ taskId }) => {
  const priorities = useSelector(state => prioritiesSelectors.selectAll(state));
  const { priority: taskPriority } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const dispatch = useDispatch();

  const handleTogglePriority = useCallback(
    priorityId => {
      dispatch(togglePriority({ taskId, priorityId }));
    },
    [dispatch, taskId]
  );

  const handleRemovePriority = useCallback(() => {
    dispatch(removePriority({ taskId }));
  }, [dispatch, taskId]);

  return (
    <PopoverContainer
      trigger={<SideModalTrigger icon={FiAlertCircle} label="Priority" />}
      heading="Change Priority"
      footer={
        <ColoredButton color="gray.400" onClick={handleRemovePriority}>
          <Text
            textTransform="uppercase"
            fontWeight={600}
            fontSize="0.8rem"
            color="white"
          >
            Remove Priority
          </Text>
        </ColoredButton>
      }
    >
      {priorities.map(priority => (
        <ColoredButton
          key={priority.id}
          color={priority.color}
          onClick={() => handleTogglePriority(priority.id)}
          isChecked={taskPriority === priority.id}
        >
          <Text
            textTransform="uppercase"
            fontWeight={600}
            fontSize="0.8rem"
            color="white"
          >
            {priority.name}
          </Text>
        </ColoredButton>
      ))}
    </PopoverContainer>
  );
};

PriorityPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(PriorityPopover);
