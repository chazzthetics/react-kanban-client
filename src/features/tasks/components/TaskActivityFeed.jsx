import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FiList } from "react-icons/fi";
import { Flex, Box, Heading, Button } from "@chakra-ui/core";
import ActivityList from "../../activities/components/ActivityList";
import Spinner from "../../../components/Spinner";

import { fetchTaskActivities, tasksSelectors } from "../tasksSlice";

const TaskActivityFeed = ({ taskId }) => {
  const [showFeed, setShowFeed] = useState(true);

  const handleShowFeed = () => {
    setShowFeed(showFeed => !showFeed);
  };

  const { activities } = useSelector(state =>
    tasksSelectors.selectById(state, taskId)
  );

  const { status } = useSelector(state => state.tasks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTaskActivities(taskId));
  }, [dispatch, taskId]);

  return (
    <Flex py={2}>
      <Box as={FiList} mr={4} fontSize="1.4rem" />
      <Box w="100%">
        <Flex justify="space-between" align="baseline">
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
          <Button
            size="sm"
            fontWeight={400}
            h="2rem"
            fontSize="0.875rem"
            backgroundColor="#ebecf0"
            mr={1}
            _focus={{ boxShadow: "none" }}
            onClick={handleShowFeed}
          >
            {showFeed ? "Hide Details" : "Show Details"}
          </Button>
        </Flex>
        <Box ml={"-46px"}>
          {status === "pending" ? (
            <Spinner h="12rem" />
          ) : showFeed ? (
            <ActivityList
              activities={activities}
              count={5}
              fromTasksFeed={true}
            />
          ) : null}
        </Box>
      </Box>
    </Flex>
  );
};

TaskActivityFeed.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskActivityFeed;
