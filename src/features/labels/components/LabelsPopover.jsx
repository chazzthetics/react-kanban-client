import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleLabel,
  clearLabels,
  tasksSelectors
} from "../../tasks/tasksSlice";
import { labelsSelectors } from "../labelsSlice";
import { FiTag } from "react-icons/fi";
import { Text } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import ColoredButton from "../../../components/ColoredButton";

const LabelsPopover = ({ taskId, trigger, ...rest }) => {
  const labels = useSelector(state => labelsSelectors.selectAll(state));
  const { labels: taskLabels } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const hasLabel = useCallback(
    label => taskLabels.some(taskLabel => taskLabel === label.id),
    [taskLabels]
  );

  const dispatch = useDispatch();

  const handleToggleLabel = useCallback(
    labelId => {
      dispatch(toggleLabel({ taskId, labelId }));
    },
    [dispatch, taskId]
  );

  const handleClearLabels = useCallback(() => {
    dispatch(clearLabels({ taskId }));
  }, [dispatch, taskId]);

  return (
    <PopoverContainer
      trigger={
        trigger ? trigger : <SideModalTrigger icon={FiTag} label="Labels" />
      }
      heading="Labels"
      footer={
        <ColoredButton color={`gray.400`} onClick={handleClearLabels}>
          <Text
            textTransform="uppercase"
            fontWeight={600}
            fontSize="0.8rem"
            color="white"
          >
            Clear All Labels
          </Text>
        </ColoredButton>
      }
      {...rest}
    >
      {labels.map(label => (
        <ColoredButton
          key={label.id}
          color={`${label.color}.400`}
          isChecked={hasLabel(label)}
          onClick={() => handleToggleLabel(label.id)}
        />
      ))}
    </PopoverContainer>
  );
};

LabelsPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  trigger: PropTypes.element
};

export default LabelsPopover;
