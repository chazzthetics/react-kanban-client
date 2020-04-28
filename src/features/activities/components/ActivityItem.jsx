import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { removeActivity } from "../activitiesSlice";
import {
  getActivityMessage,
  getTaskActivityMessage
} from "../../../utils/getActivityMessage";
import { Flex, Text, IconButton } from "@chakra-ui/core";
import UserAvatar from "../../auth/components/UserAvatar";

//TODO: only show trash icon on hover

const ActivityItem = ({ activity, fromTasksFeed = false }) => {
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleRemoveActivity = useCallback(() => {
    dispatch(removeActivity(activity.id));
  }, [dispatch, activity]);

  return (
    <Flex className="ActivityItem" as="li" py={2} ml={2} align="flex-start">
      <UserAvatar ml={-1} />
      <Flex direction="column" ml={2} w="100%">
        <Text
          fontSize="0.875rem"
          color="gray.800"
          w="90%"
          wordBreak="break-word"
        >
          <span style={{ fontWeight: "600" }}>{user.name} </span>
          <span>
            {fromTasksFeed
              ? getTaskActivityMessage(activity)
              : getActivityMessage(activity)}
          </span>
        </Text>

        <Flex align="baseline" justify="space-between" w="90%">
          <Text fontSize="xs" color="gray.400">
            {`${formatDistanceToNow(new Date(activity.created_at))} ago`}
          </Text>
          <IconButton
            icon="delete"
            aria-label="Delete activity"
            size="xs"
            color="gray.600"
            onClick={handleRemoveActivity}
            opacity={0.3}
            _hover={{ opacity: 1 }}
            _focus={{ boxShadow: "none" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    changes: PropTypes.object,
    recordable_type: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string
  }).isRequired,
  fromTasksFeed: PropTypes.bool
};

export default memo(ActivityItem);
