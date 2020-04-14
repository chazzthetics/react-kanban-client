import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  activitiesSelectors,
  clearActivity,
  fetchActivities
} from "../activitiesSlice";
import ActivityItem from "./ActivityItem";

const ActivityFeed = () => {
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
    <div className="ActivityFeed">
      <h1 style={{ fontWeight: "bold" }}>Activity</h1>
      <button onClick={handleClearActivities}>Clear All</button>
      <ul className="ActivityList" style={{ listStyleType: "none" }}>
        {activities &&
          activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
      </ul>
      {current !== last && (
        <button onClick={handleLoadMore}>Load More Activity</button>
      )}
    </div>
  );
};

export default ActivityFeed;
