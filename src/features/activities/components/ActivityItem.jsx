import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeActivity } from "../activitiesSlice";
import { getActivityMessage } from "../../../utils/getActivityMessage";
import { formatDistanceToNow } from "date-fns";
import UserAvatar from "../../auth/components/UserAvatar";

const ActivityItem = ({ activity }) => {
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleRemoveActivity = React.useCallback(() => {
    dispatch(removeActivity(activity.id));
  }, [dispatch, activity]);

  return (
    <div className="ActivityItem">
      <li style={{ display: "flex" }}>
        <UserAvatar />
        <span>{`${user.name} ${getActivityMessage(activity)}`}</span>
        <button onClick={handleRemoveActivity}>&times;</button>
      </li>
      <li style={{ fontSize: ".8rem" }}>
        {`${formatDistanceToNow(new Date(activity.created_at))} ago`}
      </li>
    </div>
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
