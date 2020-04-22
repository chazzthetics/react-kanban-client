import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardsSlice";
import {
  columnsSelectors,
  reorderColumn
} from "../features/columns/columnsSlice";
import { reorderTask, reorderBetween } from "../features/tasks/tasksSlice";
import { reorder } from "../utils/reorder";

export const useDrag = () => {
  const dispatch = useDispatch();

  const currentBoard = useSelector(selectCurrentBoard);
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  return result => {
    const { source, destination, type } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Reorder column
    if (type === "column") {
      const newOrder = reorder(
        currentBoard.columns,
        source.index,
        destination.index
      );

      dispatch(reorderColumn({ boardId: currentBoard.uuid, newOrder }));
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    // Reorder task inside column
    if (type === "task" && startColumn.uuid === endColumn.uuid) {
      const newOrder = reorder(
        startColumn.tasks,
        source.index,
        destination.index
      );

      dispatch(reorderTask({ columnId: startColumn.uuid, newOrder }));
      return;
    }

    // Reorder task between columns
    const startOrder = [...startColumn.tasks];
    const [removed] = startOrder.splice(source.index, 1);
    const endOrder = [...endColumn.tasks];
    endOrder.splice(destination.index, 0, removed);

    dispatch(
      reorderBetween({
        startColumnId: startColumn.uuid,
        endColumnId: endColumn.uuid,
        startOrder,
        endOrder
      })
    );
    return;
  };
};
