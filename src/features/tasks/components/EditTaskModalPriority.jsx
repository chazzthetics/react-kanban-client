import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { tasksSelectors } from "../tasksSlice";
import { prioritiesSelectors } from "../../priorities/prioritiesSlice";
import PriorityPopver from "../../priorities/components/PriorityPopover";
import { Box, Text, Flex, Button } from "@chakra-ui/core";

const EditTaskModalPriority = ({ taskId }) => {
  const { priority } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const priorities = useSelector(state =>
    prioritiesSelectors.selectEntities(state)
  );

  return (
    <Box>
      <Text
        fontSize="0.8rem"
        textTransform="uppercase"
        fontWeight={500}
        color="gray.600"
        mb={1}
      >
        Priority
      </Text>
      <Flex align="center">
        <PriorityPopver
          taskId={taskId}
          trigger={
            <Button
              fontSize="0.8rem"
              px={2}
              h="1.75rem"
              textTransform="uppercase"
              borderRadius={4}
              bg={priorities[priority].color}
              color="white"
              _focus={{ boxShadow: "none" }}
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 1 }}
              transition="opacity 100ms ease-in"
            >
              {priorities[priority].name}
            </Button>
          }
        />
      </Flex>
    </Box>
  );
};

EditTaskModalPriority.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskModalPriority;
