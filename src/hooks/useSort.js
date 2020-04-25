import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { tasksSelectors, reorderTask } from "../features/tasks/tasksSlice";
import { columnsSelectors } from "../features/columns/columnsSlice";
import {
  getSortedListOrder,
  name,
  newest,
  oldest,
  lowestPriority,
  highestPriority,
  dueDate
} from "../utils/sort";

export const useSort = id => {
  const { tasks: taskOrder } = useSelector(state =>
    columnsSelectors.selectById(state, id)
  );

  const tasks = useSelector(state => tasksSelectors.selectEntities(state));

  const columnTasks = taskOrder.map(task => tasks[task]);

  const dispatch = useDispatch();

  const sortByNewest = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, newest);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  const sortByOldest = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, oldest);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  const sortByName = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, name);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  const sortByLowestPriority = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, lowestPriority);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  const sortByHighestPriority = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, highestPriority);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  const sortByDueDate = useCallback(() => {
    const sorted = getSortedListOrder(columnTasks, dueDate);

    dispatch(reorderTask({ columnId: id, newOrder: sorted }));
  }, [dispatch, columnTasks, id]);

  return {
    sortByNewest,
    sortByOldest,
    sortByName,
    sortByLowestPriority,
    sortByHighestPriority,
    sortByDueDate
  };
};
