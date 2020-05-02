import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toggleChecklistItem } from "../tasksSlice";
import { ListItem, Flex, Checkbox, Text, IconButton } from "@chakra-ui/core";

const ChecklistItem = ({ taskId, item }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = useCallback(() => {
    dispatch(toggleChecklistItem({ taskId, itemId: item.uuid }));
  }, [dispatch, taskId, item]);

  return (
    <ListItem key={item.uuid}>
      <Flex align="center">
        <Checkbox
          size="lg"
          mr={4}
          isChecked={item.completed}
          name="completed"
          onChange={handleToggleComplete}
        />
        <Flex py={1} w="100%" align="center" justify="space-between">
          <Text
            fontSize="0.8rem"
            textDecor={item.completed ? "line-through" : "none"}
          >
            {item.title}
          </Text>
          <IconButton
            size="sm"
            icon="delete"
            bg="inherit"
            opacity={0.2}
            fontSize="0.7rem"
            aria-label="Remove checklist item"
            _focus={{ boxShadow: "none" }}
            _hover={{ opacity: 0.6 }}
            transition="opacity 100ms ease-in-out"
          />
        </Flex>
      </Flex>
    </ListItem>
  );
};

ChecklistItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  item: PropTypes.shape({
    uuid: PropTypes.string,
    completed: PropTypes.bool
  }).isRequired
};

export default ChecklistItem;
