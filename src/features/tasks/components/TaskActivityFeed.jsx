import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { activitiesSelectors } from "../../activities/activitiesSlice";
import { FiList } from "react-icons/fi";
import { Box } from "@chakra-ui/core";
import ActivityList from "../../activities/components/ActivityList";

const TaskActivityFeed = ({ taskId }) => {
  const activities = useSelector(state => activitiesSelectors.selectAll(state));

  const taskActivities = activities.filter(
    activity =>
      activity.recordable_type === "App\\Task" &&
      activity.changes.before.uuid === taskId
  );

  return (
    <>
      <Box gridColumn="1 / 2">
        <Box as={FiList} mr={2} fontSize="1.4rem" />
      </Box>
      <Box
        gridColumn="2 / 3"
        gridRow="3"
        fontSize="1rem"
        fontWeight={600}
        lineHeight="21px"
        textAlign="left"
      >
        <Box ml={"-2px"}>Activity</Box>
      </Box>
      <Box gridColumn="1 / 3" gridRow="4" ml={"-9px"}>
        <ActivityList
          activities={taskActivities}
          count={4}
          fromTasksFeed={true}
        />
      </Box>
    </>
  );
};

TaskActivityFeed.propTypes = {
  taskId: PropTypes.string.isRequired
};

export default TaskActivityFeed;
