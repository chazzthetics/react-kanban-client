import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, reorderTask } from "../../tasks/tasksSlice";
import { columnsSelectors } from "../columnsSlice";
import {
  getSortedListOrder,
  name,
  newest,
  oldest,
  lowestPriority,
  highestPriority,
  dueDate
} from "../../../utils/sort";
import ColumnActionsButton from "./ColumnActionButton";

const SortByList = ({ columnId }) => {
  const { tasks: taskOrder } = useSelector(state =>
    columnsSelectors.selectById(state, columnId)
  );

  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const columnTasks = taskOrder.map(task => tasks[task]);

  const dispatch = useDispatch();

  const sortByNewest = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, newest);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  const sortByOldest = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, oldest);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  const sortByName = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, name);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  const sortByLowestPriority = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, lowestPriority);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  const sortByHighestPriority = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, highestPriority);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  const sortByDueDate = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, dueDate);

    dispatch(reorderTask({ columnId, newOrder: sorted }));
  }, [dispatch, columnTasks, columnId]);

  return (
    <>
      <ColumnActionsButton
        label="Date Created (Newest First)"
        onClick={sortByNewest}
      />
      <ColumnActionsButton
        label="Date Created (Oldest First)"
        onClick={sortByOldest}
      />
      <ColumnActionsButton
        label="Card Name (Alphabetically)"
        onClick={sortByName}
      />
      <ColumnActionsButton
        label="Priority (Highest First)"
        onClick={sortByHighestPriority}
      />
      <ColumnActionsButton
        label="Priority (Lowest First)"
        onClick={sortByLowestPriority}
      />
      <ColumnActionsButton label="Due Date" onClick={sortByDueDate} mb={2} />
    </>
  );
};

SortByList.propTypes = {
  columnId: PropTypes.string.isRequired
};

export default SortByList;
