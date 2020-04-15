import React from "react";
import BoardHeader from "./BoardHeader";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import { selectCurrentBoardId, selectCurrentBoard } from "../boardsSlice";
import { columnsSelectors, reorderColumn } from "../../columns/columnsSlice";
import { reorderTask, reorderBetween } from "../../tasks/tasksSlice";
import ColumnList from "../../columns/components/ColumnList";

const MainBoard = () => {
  //TODO: move out later
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const currentBoard = useSelector(selectCurrentBoard);
  const columns = useSelector(state => columnsSelectors.selectEntities(state));

  const handleDragEnd = result => {
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
      const newOrder = [...currentBoard.columns];
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);

      dispatch(reorderColumn({ boardId: currentBoardId, newOrder }));
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    // Reorder task inside column
    if (type === "task" && startColumn.uuid === endColumn.uuid) {
      const newOrder = [...startColumn.tasks];
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);

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

  return (
    <div className="MainBoard" style={{ height: "100%" }}>
      <BoardHeader />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;
