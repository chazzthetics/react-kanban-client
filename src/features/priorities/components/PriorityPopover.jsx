import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { togglePriority } from "../../tasks/tasksSlice";
import { prioritiesSelectors } from "../prioritiesSlice";
import { FiAlertCircle } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  PseudoBox,
  Button,
  Text
} from "@chakra-ui/core";

const PriorityPopover = ({ taskId }) => {
  const priorities = useSelector(state => prioritiesSelectors.selectAll(state));

  const dispatch = useDispatch();

  const handleTogglePriority = useCallback(
    priorityId => {
      dispatch(togglePriority({ taskId, priorityId }));
    },
    [dispatch, taskId]
  );

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="sm"
          leftIcon={FiAlertCircle}
          fontWeight={400}
          w="12rem"
          justifyContent="flex-start"
          backgroundColor="#ebecf0"
          _focus={{ boxShadow: "none" }}
        >
          Priority
        </Button>
      </PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Priority
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody>
          {priorities.map(priority => (
            <PseudoBox
              key={priority.id}
              as="button"
              bg={`${priority.color}`}
              mb={1}
              borderRadius={3}
              fontSize="0.8rem"
              fontWeight={500}
              h="2rem"
              w="100%"
              textTransform="uppercase"
              color="white"
              _focus={{ outline: "none" }}
              _hover={{
                borderLeftWidth: "0.5rem",
                borderLeftStyle: "solid",
                borderLeftColor: `hsla(0,0%,0%,0.3)`,
                transform: "rotate(-1deg)"
              }}
              transition="border 120ms ease-in, transform 120ms ease-in"
              onClick={() => handleTogglePriority(priority.id)}
            >
              {priority.name}
            </PseudoBox>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

PriorityPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default PriorityPopover;
