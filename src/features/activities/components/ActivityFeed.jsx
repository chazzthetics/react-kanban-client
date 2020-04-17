import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { activitiesSelectors } from "../activitiesSlice";
import { Box, List } from "@chakra-ui/core";
import { FiList } from "react-icons/fi";
import ActivityItem from "./ActivityItem";
import SideBarButton from "../../../components/SideBar/SideBarButton";

const ActivityFeed = ({ onShow }) => {
  const activities = useSelector(state => activitiesSelectors.selectAll(state));

  return (
    <Box className="ActivityFeed" pt={4} pb={2}>
      {onShow && (
        <SideBarButton
          icon={<Box as={FiList} size="1.3rem" mr={3} />}
          text="Activity"
          fontWeight={700}
          onClick={onShow}
        />
      )}

      <List className="ActivityList" mb={3}>
        {activities &&
          activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
      </List>

      {onShow && (
        <SideBarButton
          py={4}
          pl="2.7rem"
          onClick={onShow}
          text="View all activity..."
          textDecor="underline"
          fontWeight={400}
          fontSize="0.875rem"
        />
      )}
    </Box>
  );
};

ActivityFeed.propTypes = {
  onShow: PropTypes.func
};

export default ActivityFeed;
