import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLabel } from "../../tasks/tasksSlice";
import { labelsSelectors } from "../labelsSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Button,
  PseudoBox
} from "@chakra-ui/core";

const LabelsPopover = ({ taskId }) => {
  const labels = useSelector(state => labelsSelectors.selectAll(state));
  const dispatch = useDispatch();

  const handleToggleLabel = useCallback(
    labelId => {
      dispatch(toggleLabel({ taskId, labelId }));
    },
    [dispatch, taskId]
  );

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Labels</Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverCloseButton />
        <PopoverHeader>Labels</PopoverHeader>
        <PopoverBody>
          {labels.map(label => (
            <PseudoBox
              key={label.id}
              bg={`${label.color}.400`}
              h="2rem"
              w="100%"
              mb={1}
              as="button"
              onClick={() => handleToggleLabel(label.id)}
            />
          ))}
        </PopoverBody>
        <PopoverFooter>Create new label</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

LabelsPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default LabelsPopover;
