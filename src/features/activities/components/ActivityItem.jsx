import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { removeActivity } from "../activitiesSlice";
import { getActivityMessage } from "../../../utils/getActivityMessage";
import { Flex, Text } from "@chakra-ui/core";
import UserAvatar from "../../auth/components/UserAvatar";

const ActivityItem = ({ activity }) => {
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleRemoveActivity = React.useCallback(() => {
    dispatch(removeActivity(activity.id));
  }, [dispatch, activity]);

  return (
    <Flex className="ActivityItem" as="li" py={2} ml={2} align="flex-start">
      <UserAvatar ml={-1} />
      <Flex direction="column" ml={2}>
        <Text fontSize="0.875rem" color="gray.800" width="95%">
          <span style={{ fontWeight: "600" }}>{user.name} </span>
          <span>{getActivityMessage(activity)}</span>
        </Text>

        <Text fontSize="xs" color="gray.400">
          {`${formatDistanceToNow(new Date(activity.created_at))} ago`}
        </Text>
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
  }).isRequired
};

export default memo(ActivityItem);
