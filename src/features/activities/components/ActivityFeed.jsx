import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  activitiesSelectors,
  clearActivity,
  fetchActivities
} from "../activitiesSlice";
import { Box, List, PseudoBox } from "@chakra-ui/core";
import { FiList } from "react-icons/fi";
import ActivityItem from "./ActivityItem";
import SideBarButton from "../../../components/SideBar/SideBarButton";

const ActivityFeed = ({ onShow }) => {
  const activities = useSelector(state => activitiesSelectors.selectAll(state));

  const dispatch = useDispatch();

  const handleClearActivities = React.useCallback(() => {
    dispatch(clearActivity());
  }, [dispatch]);

  const { current, next, last } = useSelector(state => state.activities);
  const handleLoadMore = React.useCallback(() => {
    if (current < last) {
      dispatch(fetchActivities(next));
    }
  }, [dispatch, current, next, last]);

  return (
    <Box className="ActivityFeed" py={4}>
      <SideBarButton
        icon={<Box as={FiList} size="1.3rem" mr={3} />}
        text="Activity"
        mb={1}
        onClick={onShow}
      />

      <List className="ActivityList" mb={3}>
        {activities &&
          activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
      </List>
      {/* {current !== last && (
        <button onClick={handleLoadMore}>Load More Activity</button> TODO:MOVEOUT
      )} */}
      {/* <button onClick={handleClearActivities}>Clear All</button> */}
      <PseudoBox
        py={4}
        px={3}
        borderRadius={4}
        as="button"
        w="100%"
        _hover={{ backgroundColor: "gray.100" }}
        _active={{ backgroundColor: "gray.200" }}
        _focus={{ outline: "none" }}
        transition="background-color 100ms ease-in"
        aria-label="View all activity"
        role="button"
        textAlign="left"
        fontSize="0.875rem"
        textDecor="underline"
        color="gray.800"
        onClick={onShow}
      >
        <span style={{ marginLeft: "2rem" }}>View all activity...</span>
      </PseudoBox>
    </Box>
  );
};

export default ActivityFeed;
