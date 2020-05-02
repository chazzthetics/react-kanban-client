import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTask } from "../tasksSlice";
import { Flex, Text } from "@chakra-ui/core";
import PopoverContainer from "../../../components/PopoverContainer";
import SideModalTrigger from "../../../components/SideModalTrigger";
import RemoveButton from "../../../components/RemoveButton";

const RemoveTaskPopover = ({ taskId, columnId }) => {
  const dispatch = useDispatch();

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask({ taskId, columnId }));
  }, [dispatch, taskId, columnId]);

  return (
    <PopoverContainer
      trigger={<SideModalTrigger icon="delete" label="Remove" />}
      heading="Remove Card?"
    >
      <Flex flexDir="column" align="stretch" justify="space-between">
        <Text fontSize="0.875rem" color="gray.600" mb={2}>
          Are you sure you want to remove this card? This action is permanent.
        </Text>
        <RemoveButton onClick={handleRemoveTask} />
      </Flex>
    </PopoverContainer>
  );
};

RemoveTaskPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default RemoveTaskPopover;
