import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FiList } from "react-icons/fi";
import { Box, Heading, Flex } from "@chakra-ui/core";
import ActivityList from "../../activities/components/ActivityList";

import { fetchTaskActivities, tasksSelectors } from "../tasksSlice";

const TaskActivityFeed = ({ taskId }) => {
  const { activities } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaskActivities(taskId));
  }, [dispatch, taskId]);

  return (
    <Flex py={2}>
      <Box as={FiList} mr={4} fontSize="1.4rem" />
      <Box w="100%">
        <Heading
          as="h3"
          ml={"-2px"}
          fontSize="1rem"
          fontWeight={600}
          lineHeight="21px"
          textAlign="left"
          mb={2}
        >
          Activity
        </Heading>
        <Box ml={"-46px"}>
          <ActivityList
            activities={activities}
            count={6}
            fromTasksFeed={true}
          />
        </Box>
      </Box>
    </Flex>
  );
};

TaskActivityFeed.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskActivityFeed;
