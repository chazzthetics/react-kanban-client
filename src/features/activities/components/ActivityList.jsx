import React from "react";
import PropTypes from "prop-types";
import { List } from "@chakra-ui/core";
import ActivityItem from "./ActivityItem";

const ActivityList = ({ activities, count, fromTasksFeed }) => {
  return (
    <List className="ActivityList" mb={3}>
      {activities &&
        activities
          .slice(0, count)
          .map(activity => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              fromTasksFeed={fromTasksFeed}
            />
          ))}
    </List>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.array.isRequired,
  fromTasksFeed: PropTypes.bool,
  count: PropTypes.number
};

export default ActivityList;
