import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTask } from "../tasksSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Flex,
  Text
} from "@chakra-ui/core";
import SideModalTrigger from "../../../components/SideModalTrigger";
import RemoveButton from "../../../components/RemoveButton";

const RemoveTaskPopover = ({ taskId, columnId }) => {
  const dispatch = useDispatch();

  const handleRemoveTask = useCallback(() => {
    dispatch(removeTask({ taskId, columnId }));
  }, [dispatch, taskId, columnId]);

  return (
    <Popover>
      <PopoverTrigger>
        <SideModalTrigger icon="delete" label="Remove" />
      </PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
        px={2}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Remove Card?
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody>
          <Flex align="center" justify="space-between">
            <Text fontSize="0.875rem" color="gray.600" w="60%">
              Are you sure you want to remove this card?
            </Text>
            <RemoveButton onClick={handleRemoveTask} />
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

RemoveTaskPopover.propTypes = {
  taskId: PropTypes.string.isRequired,
  columnId: PropTypes.string.isRequired
};

export default RemoveTaskPopover;
