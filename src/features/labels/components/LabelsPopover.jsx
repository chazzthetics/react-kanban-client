import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLabel, tasksSelectors } from "../../tasks/tasksSlice";
import { labelsSelectors } from "../labelsSlice";
import { FiTag } from "react-icons/fi";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import ColoredButton from "../../../components/ColoredButton";

const LabelsPopover = ({ taskId }) => {
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

  return (
    <PopoverContainer
      trigger={<SideModalTrigger icon={FiTag} label="Labels" />}
      heading="Labels"
      footer={<div>Create new label</div>}
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
  taskId: PropTypes.string.isRequired
};

export default LabelsPopover;
