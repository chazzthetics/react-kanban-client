import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { activitiesSelectors, clearActivity } from "../activitiesSlice";
import { Box, Stack, Text } from "@chakra-ui/core";
import { FiList } from "react-icons/fi";
import Spinner from "../../../components/Spinner";
import ActivityList from "./ActivityList";
import SideBarButton from "../../../components/SideBar/SideBarButton";

const ActivityFeed = ({ onShow, count, showLoader = true }) => {
  const { status } = useSelector(state => state.activities);

  const activities = useSelector(state => activitiesSelectors.selectAll(state));

  const dispatch = useDispatch();

  const handleClearActivity = useCallback(() => {
    dispatch(clearActivity());
  }, [dispatch]);

  return (
    <Box className="ActivityFeed" pt={4}>
      {onShow && (
        <SideBarButton
          icon={<Box as={FiList} size="1.3rem" mr={3} />}
          text="Activity"
          fontWeight={700}
          onClick={onShow}
        />
      )}

      {status === "pending" && showLoader ? (
        <Spinner h="100%" />
      ) : (
        <ActivityList count={count} activities={activities} />
      )}

      {onShow && activities.length > 0 ? (
        <Stack isInline>
          <SideBarButton
            py={4}
            px="1.75rem"
            text="View all activity..."
            textAlign="center"
            textDecor="underline"
            fontWeight={400}
            fontSize="0.875rem"
            onClick={onShow}
          />
          <SideBarButton
            py={4}
            px="1.75rem"
            text="Clear all activity..."
            textDecor="underline"
            fontWeight={400}
            fontSize="0.875rem"
            onClick={handleClearActivity}
          />
        </Stack>
      ) : activities.length === 0 ? (
        <Text textAlign="center" fontSize="0.875rem" color="gray.700">
          No activities recorded...
        </Text>
      ) : null}
    </Box>
  );
};

ActivityFeed.propTypes = {
  onShow: PropTypes.func,
  count: PropTypes.number,
  showLoader: PropTypes.bool
};

export default ActivityFeed;
