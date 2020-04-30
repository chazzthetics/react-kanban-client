import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, toggleCompleted } from "../tasksSlice";
import { formatDate } from "../../../utils/formatDate";
import {
  getDueDateMessage,
  getDueDateColor
} from "../../../utils/getDueDateColor";
import { Box, Flex, Button, Text, Badge, Checkbox } from "@chakra-ui/core";
import DueDatePopover from "../components/DueDatePopover";

const EditTaskModalDueDate = ({ taskId }) => {
  const { due_date, completed } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const formattedDate = formatDate(due_date, "MMM do");

  const dispatch = useDispatch();

  const handleComplete = useCallback(() => {
    dispatch(toggleCompleted({ taskId, completed }));
  }, [dispatch, taskId, completed]);

  return (
    <Box>
      <Text
        fontSize="0.8rem"
        textTransform="uppercase"
        fontWeight={500}
        color="gray.600"
        mb={1}
      >
        Due Date
      </Text>
      <Flex align="center">
        <Checkbox
          mr={"1px"}
          name="completed"
          alignSelf="center"
          onChange={handleComplete}
          isChecked={completed}
          aria-label="Mark card complete"
        />
        <DueDatePopover
          taskId={taskId}
          trigger={
            <Button
              size="sm"
              ml={1}
              alignItems="center"
              fontWeight={400}
              w="11rem"
              h="2rem"
              fontSize="0.875rem"
              color="gray.700"
              justifyContent="space-between"
              backgroundColor="#ebecf0"
              rightIcon="chevron-down"
              _focus={{ boxShadow: "none" }}
            >
              {formattedDate}
              <Badge
                variantColor={completed ? "green" : getDueDateColor(due_date)}
                fontWeight={500}
                ml={2}
              >
                {completed ? "Complete" : getDueDateMessage(due_date)}
              </Badge>
            </Button>
          }
        />
      </Flex>
    </Box>
  );
};

EditTaskModalDueDate.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default EditTaskModalDueDate;
