import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@chakra-ui/core";
import ActivityButton from "./ActivityButton";
import ActivityFeed from "../../features/activities/components/ActivityFeed";
import {
  clearActivity,
  fetchActivities
} from "../../features/activities/activitiesSlice";

const ActivityContent = () => {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = React.useState(true);

  const handleSelect = () => {
    setIsSelected(isSelected => !isSelected);
  };

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
    <>
      <Box borderBottom="1px solid" borderColor="gray.300" pb={4}>
        <ActivityButton
          label="All"
          isSelected={isSelected}
          onSelect={handleSelect}
        />
        <ActivityButton
          label="Comments"
          isSelected={!isSelected}
          onSelect={handleSelect}
        />
      </Box>
      <ActivityFeed />
      {/* {current !== last && (
        <button onClick={handleLoadMore}>Load More Activity</button>
      )} */}
      <button onClick={handleLoadMore}>Load More Activity</button>
      <button onClick={handleClearActivities}>Clear All</button>
    </>
  );
};

export default ActivityContent;
