import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchActivities } from "../../features/activities/activitiesSlice";
import { Box } from "@chakra-ui/core";
import ActivityButton from "./ActivityButton";
import ActivityFeed from "../../features/activities/components/ActivityFeed";
import SideBarButton from "../SideBar/SideBarButton";

const ActivityContent = () => {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(true);

  const handleSelect = () => {
    setIsSelected(isSelected => !isSelected);
  };

  const { current, next, last } = useSelector(state => state.activities);

  const handleLoadMore = useCallback(() => {
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
      {current !== last && (
        <SideBarButton
          py={4}
          pl="2.7rem"
          text="Load more activity"
          textDecor="underline"
          fontWeight={400}
          fontSize="0.875rem"
          onClick={handleLoadMore}
        />
      )}
    </>
  );
};

export default ActivityContent;
