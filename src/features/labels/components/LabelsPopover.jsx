import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { toggleLabel, tasksSelectors } from "../../tasks/tasksSlice";
import { labelsSelectors } from "../labelsSlice";
import { FiTag } from "react-icons/fi";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Flex,
  PseudoBox,
  Icon
} from "@chakra-ui/core";
import SideModalTrigger from "../../../components/SideModalTrigger";

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
    <Popover>
      <PopoverTrigger>
        <SideModalTrigger icon={FiTag} label="Labels" />
      </PopoverTrigger>
      <PopoverContent
        w="18rem"
        zIndex={4}
        _focus={{ boxShadow: "none", outline: "none" }}
      >
        <PopoverHeader textAlign="center" fontSize="0.9rem" opacity={0.8}>
          Labels
        </PopoverHeader>
        <PopoverCloseButton
          opacity={0.6}
          _hover={{ opacity: 1 }}
          _active={{ boxShadow: "none" }}
        />
        <PopoverBody>
          {labels.map(label => (
            <Flex key={label.id} position="relative">
              <PseudoBox
                bg={`${label.color}.400`}
                borderRadius={3}
                h="2rem"
                w="100%"
                mb={1}
                as="button"
                _focus={{ outline: "none" }}
                _hover={{
                  borderLeftWidth: "0.5rem",
                  borderLeftStyle: "solid",
                  borderLeftColor: `${label.color}.600`,
                  transform: "rotate(-1deg)"
                }}
                transition="border 120ms ease-in, transform 120ms ease-in"
                onClick={() => handleToggleLabel(label.id)}
              />
              {hasLabel(label) && (
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
        <PopoverFooter>Create new label</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

LabelsPopover.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default React.memo(LabelsPopover);
