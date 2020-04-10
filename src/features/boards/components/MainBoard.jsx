import React from "react";
import BoardHeader from "./BoardHeader";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  removeBoard,
  selectCurrentBoardId,
  boardsSelectors,
  selectCurrentBoard
} from "../boardsSlice";
import CreateBoardForm from "./CreateBoardForm";
import ColumnList from "../../columns/components/ColumnList";
import { columnsSelectors, reorderColumn } from "../../columns/columnsSlice";

const MainBoard = () => {
  //TODO: move out later
  const dispatch = useDispatch();
  const currentBoardId = useSelector(selectCurrentBoardId);

  const handleRemoveBoard = React.useCallback(() => {
    dispatch(removeBoard(currentBoardId));
  }, [dispatch, currentBoardId]);

  const handleClearBoard = React.useCallback(() => {}, []);

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

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    console.log(type);
    if (type === "column-board") {
      const newOrder = [...currentBoard.columns];
      const [removed] = newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, removed);
      console.log(newOrder);
      dispatch(reorderColumn({ boardId: currentBoardId, newOrder }));
    }
  };

  return (
    <div className="MainBoard">
      <BoardHeader />
      <CreateBoardForm />
      <button
        type="button"
        style={{
          padding: ".6rem 1rem",
          background: "red",
          color: "white"
        }}
        onClick={handleRemoveBoard}
      >
        Delete Board
      </button>
      <button
        type="button"
        style={{
          padding: ".6rem 1rem",
          background: "lightblue"
        }}
        onClick={handleClearBoard}
      >
        Clear Board
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnList />
      </DragDropContext>
    </div>
  );
};

export default MainBoard;
