import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { activitiesSelectors, clearActivity } from "../activitiesSlice";
import ActivityItem from "./ActivityItem";

const ActivityFeed = () => {
  const activities = useSelector(state => activitiesSelectors.selectAll(state));

  const dispatch = useDispatch();

  const handleClearActivities = React.useCallback(() => {
    dispatch(clearActivity());
  }, [dispatch]);

  return (
    <div className="ActivityFeed">
      <h1 style={{ fontWeight: "bold" }}>Activity</h1>
      <button onClick={handleClearActivities}>Clear All</button>
      <ul>
        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
