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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  PseudoBox,
  Icon,
  Flex
} from "@chakra-ui/core";
import SideModalTrigger from "../../../components/SideModalTrigger";

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
    <Popover>
      <PopoverTrigger>
        <SideModalTrigger icon={FiAlertCircle} label="Priority" />
      </PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Change Priority
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody>
          {priorities.map(priority => (
            <Flex key={priority.id} position="relative">
              <PseudoBox
                as="button"
                bg={`${priority.color}`}
                mb={1}
                borderRadius={3}
                fontSize="0.8rem"
                fontWeight={600}
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
              {taskPriority === priority.id && (
                <Icon
                  name="check"
                  color="white"
                  position="absolute"
                  fontSize="0.8rem"
                  top="8.5px"
                  right={2}
                />
              )}
            </Flex>
          ))}
        </PopoverBody>
        <PopoverFooter>
          <PseudoBox
            as="button"
            bg="gray.400"
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
            onClick={handleRemovePriority}
          >
            Remove Priority
          </PseudoBox>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

PriorityPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default PriorityPopover;
