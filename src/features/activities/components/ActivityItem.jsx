import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { removeActivity } from "../activitiesSlice";
import { getActivityMessage } from "../../../utils/getActivityMessage";
import { formatDistance } from "date-fns";

const ActivityItem = ({ activity }) => {
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const handleRemoveActivity = React.useCallback(() => {
    dispatch(removeActivity(activity.id));
  }, [dispatch, activity]);

  return (
    <div key={activity.id} className="ActivityItem">
      <li>
        <span style={{ marginRight: "3rem" }}>{`${
          user.initials
        } ${getActivityMessage(activity)}`}</span>
        <button onClick={handleRemoveActivity}>&times;</button>
      </li>
      <li style={{ fontSize: ".8rem" }}>
        {`${formatDistance(new Date(activity.created_at), new Date())} ago`}
      </li>
    </div>
  );
};

ActivityItem.propTypes = {
  activity: PropTypes.object.isRequired
};

export default memo(ActivityItem);
